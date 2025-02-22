import {
  orkesConductorClient,
  TaskManager,
} from "@io-orkes/conductor-javascript";

import dotenv from "dotenv";
dotenv.config();

// import workers
import workers from "./workers";

const config = {
  serverUrl: process.env.CONDUCTOR_SERVER_URL,
  keyId: process.env.CONDUCTOR_AUTH_KEY,
  keySecret: process.env.CONDUCTOR_AUTH_SECRET,
};

async function main() {
  const client = await orkesConductorClient(config);
  const manager = new TaskManager(client, workers);
  manager.startPolling();
  console.log("Orkes conductor polling started...");
}

main().catch((err) => console.error("Error starting conductor:", err));
