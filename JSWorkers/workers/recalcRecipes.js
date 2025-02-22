import { orkesTaskWorker } from "@io-orkes/conductor-javascript";
import db from "../firestore.js";

// This worker reads the user's KitchenInventory from Firestore,
// recalculates recipes (here simulated with a dummy response),
// and writes the results to the Recipes collection.
export default orkesTaskWorker({
    taskDefName: "recalcRecipes",
    async execute(task) {
        const { userId } = task.input;
        const invDoc = await db.collection("KitchenInventory").doc(userId).get();
        if (!invDoc.exists) throw new Error("Kitchen inventory not found for user");
        const inventory = invDoc.data();

        // Prepare an AI prompt using inventory (omitted for brevity) and simulate a dummy response:
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

        // Update Firestore Recipes collection for the user:
        await db.collection("Recipes").doc(userId).set(dummyRecipes);
        return { recipes: dummyRecipes };
    },
});
