import { orkesConductorClient, TaskManager } from "@io-orkes/conductor-javascript";
import parseReceiptTextWorker from "./workers/parseReceiptText.js";
import parseReceiptTextWorker from "./workers/parseReceiptText.js";
import recalcRecipesWorker from "./workers/recalcRecipes.js";
import updateInventoryWorker from "./workers/updateInventory.js";

const config = {
  serverUrl: "https://developer.orkescloud.com/api",
  keyId: "_CHANGE_ME_",
  keySecret: "_CHANGE_ME_",
};

async function main() {
  const client = await orkesConductorClient(config);
  const manager = new TaskManager(client, [
    parseReceiptTextWorker,
    recalcRecipesWorker,
    updateInventoryWorker,
  ]);
  manager.startPolling();
  console.log("Orkes conductor polling started...");
}

main().catch((err) => console.error("Error starting conductor:", err));
