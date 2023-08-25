import log from "./log.js";
import prompt from "./prompt.js";
import { saveToStore } from "./store.js";

export default async function createGlobal() {
  log.message("notFound");

  const { createGlobal } = await prompt("createGlobal");

  if (createGlobal) {
    await prompt("newProfile").then(saveToStore);
  }
}
