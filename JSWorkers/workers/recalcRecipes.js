// workers/recalcRecipes.js
import { orkesTaskWorker } from "@io-orkes/conductor-javascript";
import db from "../firestore.js";
import fetch from "node-fetch";

export default orkesTaskWorker({
    taskDefName: "recalcRecipes",
    async execute(task) {
        const { userId } = task.input;
        const invDoc = await db.collection("KitchenInventory").doc(userId).get();
        if (!invDoc.exists) throw new Error("Kitchen inventory not found for user");
        const inventory = invDoc.data();
        const items = inventory.items || [];
        const ingredientNames = items.map(item => item.name);
        const ingredientsStr = ingredientNames.join(',');

        const spoonApiKey = process.env.SPOONACULAR_API_KEY;
        if (!spoonApiKey) throw new Error("SPOONACULAR_API_KEY is not set");

        const url = "https://api.spoonacular.com/recipes/findByIngredients";
        const params = new URLSearchParams({
            ingredients: ingredientsStr,
            number: '5',
            ranking: '1',
            ignorePantry: 'true',
            apiKey: spoonApiKey
        });

        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error fetching recipes:", errorText);
            throw new Error("Spoonacular API error");
        }
        const recipesData = await response.json();
        const completeRecipes = recipesData.filter(r => r.missedIngredientCount === 0);
        const incompleteRecipes = recipesData.filter(r => r.missedIngredientCount > 0);
        const recipes = {
            complete: completeRecipes,
            incomplete: incompleteRecipes
        };

        await db.collection("Recipes").doc(userId).set(recipes);
        return { recipes };
    },
});
