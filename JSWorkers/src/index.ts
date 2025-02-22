import { orkesConductorClient, TaskManager } from "@io-orkes/conductor-javascript";
import parseReceiptTextWorker from "./workers/parseReceiptText.js";
import parseReceiptTextWorker from "./workers/parseReceiptText.js";
import recalcRecipesWorker from "./workers/recalcRecipes.js";
import updateInventoryWorker from "./workers/updateInventory.js";
import {
  orkesConductorClient,
  TaskManager,
} from "@io-orkes/conductor-javascript";

import dotenv from "dotenv";
dotenv.config();

import parseReceiptTextWorker from "./workers/parseReceiptText";

const config = {
  serverUrl: process.env.CONDUCTOR_SERVER_URL,
  keyId: process.env.CONDUCTOR_AUTH_KEY,
  keySecret: process.env.CONDUCTOR_AUTH_SECRET,
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
