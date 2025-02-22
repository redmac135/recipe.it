import { orkesTaskWorker } from "@io-orkes/conductor-javascript";
import db from "../firestore.js";
import { convertUnits } from "../unitConversion.js";

export default orkesTaskWorker({
    taskDefName: "updateInventory",
    async execute(task) {
        const { userId, recipe } = task.input;
        const invDocRef = db.collection("KitchenInventory").doc(userId);
        const invDoc = await invDocRef.get();
        if (!invDoc.exists) throw new Error("Kitchen inventory not found for user");
        const inventory = invDoc.data();
        const updatedItems = inventory.items.map(item => {
            const used = recipe.ingredients_have.find(
                ing => ing.name.toLowerCase() === item.name.toLowerCase()
            );
            if (used) {
                const currentQty = parseFloat(item.quantity);
                const usedQty = parseFloat(used.quantity);
                // Convert if needed; here we assume units are compatible or conversion is provided.
                const convertedAmount = convertUnits(usedQty, used.unit, item.unit);
                if (convertedAmount === null) {
                    console.warn(`Skipping conversion for ${item.name}`);
                    return item;
                }
                const newQty = Math.max(currentQty - convertedAmount, 0);
                return { ...item, quantity: newQty.toString() };
            }
            return item;
        });
        await invDocRef.update({ items: updatedItems });
        return { updatedInventory: updatedItems };
    },
});
