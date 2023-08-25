import switchProfile from "./switchProfile.js";
import createGlobal from "./createGlobal.js";
import { program } from "commander";
import git from "./git.js";
import log from "./log.js";

program
  .name("gcu")
  .version("0.1.0")
  .description("gcu - change git user with good attitude")
  .parse();

log.message("welcome");

(async function main() {
  while (true) {
    const config = await git.user();

    if (config.global) {
      await switchProfile(config);
      break;
    } else {
      await createGlobal();
    }
  }
})();
