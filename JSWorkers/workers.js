import {
  orkesConductorClient,
  TaskManager,
} from "@io-orkes/conductor-javascript";
import parseReceiptTextWorker from "./workers/parseReceiptText.js";

const config = {
  serverUrl: "https://developer.orkescloud.com/api",
  keyId: "_CHANGE_ME_",
  keySecret: "_CHANGE_ME_",
};

const client = await orkesConductorClient(config);

const manager = new TaskManager(client, [parseReceiptTextWorker]);
manager.startPolling();
