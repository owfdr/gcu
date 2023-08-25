import prompt from "./prompt.js";
import git, { Config } from "./git.js";
import { removeFromStore, saveToStore } from "./store.js";
import log from "./log.js";

export default async function switchProfile(config: Config) {
  log.dashboard(config);

  const { scope } = await prompt("whichScope");

  if (scope === "cancel") {
    log.message("exit");
    process.exit(0);
  }

  const user = await chooseUser(scope);

  git.change(user, scope).then(() => {
    console.log("change success!");
  });
}

async function chooseUser(
  scope: "global" | "local",
): Promise<{ name: string; email: string }> {
  let { user } = await prompt("whichUser");

  if (user.option === "add") {
    await prompt("newProfile").then(saveToStore);

    log.message(scope);
    return await chooseUser(scope);
  }

  if (user.option === "delete") {
    let { user } = await prompt("deleteUser");

    if (user.option !== "cancel") {
      removeFromStore(user);
    }

    log.message(scope);
    return await chooseUser(scope);
  }

  if (user.option === "cancel") {
    log.message("exit");
    process.exit(0);
  }

  delete user.option;
  return user;
}
