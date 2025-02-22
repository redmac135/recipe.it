import { orkesTaskWorker } from "@io-orkes/conductor-javascript";
import db from "../firestore.js";

import { orkesTaskWorker } from "@io-orkes/conductor-javascript";
import db from "../firestore.js";

export default orkesTaskWorker({
    taskDefName: "recalcRecipes",
    async execute(task) {
        const { userId } = task.input;
        const invDoc = await db.collection("KitchenInventory").doc(userId).get();
        if (!invDoc.exists) throw new Error("Kitchen inventory not found for user");
        const inventory = invDoc.data();

        // In a real implementation, prepare an AI prompt with the inventory to generate recipes.
        // For demonstration, we use a dummy response:
        const dummyRecipes = {
            complete: [
                {
                    name: "Beef Bulgogi",
                    ingredients_have: [{ name: "BEEF", quantity: 200, unit: "g" }],
                },
            ],
            incomplete: [
                {
                    name: "Hamburger",
                    ingredients_have: [{ name: "GROUND BEEF", quantity: 150, unit: "g" }],
                    ingredients_purchasable: [{ name: "BUNS", minQuantity: 1, unit: "loaf" }],
                    estimated_cost: 11.92,
                    is_approved: false,
                },
            ],
        };

        await db.collection("Recipes").doc(userId).set(dummyRecipes);
        return { recipes: dummyRecipes };
    },
});