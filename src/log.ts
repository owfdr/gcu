import chalk from "chalk";
import { Config } from "./git";

type Message =
  | "welcome"
  | "notFound"
  | "added"
  | "deleted"
  | "global"
  | "local"
  | "exit"
  | "yetInitialized"
  | "changeSuccess";

export default {
  message(type: Message, ...data: (string | undefined)[]) {
    if (type === "welcome") {
      console.log(chalk.dim("         ,»-╓"));
      console.log(chalk.dim("       #╠≥▒╠░░≥≤╩ë╗ç"));
      console.log(chalk.dim("       ▒▓╣╩╩╚║╩╬▒╠╠╠▓"));
      console.log(chalk.dim("      #▒╙░╙╬╬å█▄╫╩╚╠╣▌"));
      console.log(chalk.dim('     ▐╩█#^░ ]╙▓╣▄""≈╫╬▒'));
      console.log(chalk.dim("    sΓ▐!▒░║µ.░╠╝╠▒▒Ç²╫║▌"));
      console.log(chalk.dim("  %▄⌐ `  ╠▓█░▒╠▒░╠░░▒╬▓▌"));
      console.log(chalk.dim("   ╙φ▄▄▄█▀╢▒░▒▒░⌐╙│║▒╢█▌"));
      console.log(chalk.grey("╔═╗╔═╗╦ ╦"), " ==========================");
      console.log(chalk.grey("║ ╦║  ║ ║"), " Welcome to Git Change User");
      console.log(chalk.grey("╚═╝╚═╝╚═╝"), " ==========================");
      console.log("");
    }

    if (type === "global") {
      console.log("Your are at: Global 🌎");
    }

    if (type === "local") {
      console.log("Your are at: Local 📁");
    }

    if (type === "notFound") {
      console.log(
        chalk.yellow(chalk.bold(` 😿 git user profile not found...`)),
      );
      console.log();
    }

    if (type === "added") {
      const user = `${data[0]} <${data[1]}>`;
      const boxed = box(user, "added ✅");

      console.log(chalk.green(boxed));
      console.log();
    }

    if (type === "deleted") {
      const user = `${data[0]} <${data[1]}>`;
      const boxed = box(user, "deleted 🗑️");

      console.log(chalk.red(boxed));
      console.log();
    }

    if (type === "exit") {
      console.log("program exited. (👋)");
      console.log();
    }

    if (type === "yetInitialized") {
      console.log();
      console.log(
        chalk.yellow(
          chalk.bold(` 😿 Sorry, you must initialize a Git repository first.`),
        ),
      );
      console.log(chalk.green(` 🌱 Try "git init"`));
      console.log();
    }

    if (type === "changeSuccess") {
      const user = `${data[0]} <${data[1]}>`;
      const boxed = box(user, "became the current user ✅");

      console.log();
      console.log(
        chalk.green(chalk.bold(` 🎉 Git user changed successfully!`)),
      );
      console.log(chalk.green(boxed));
      console.log();
    }
  },
  dashboard({ global, local }: Config) {
    if (global) {
      console.log(" 🌎 Global user name  :", chalk.blue(`'${global.name}'`));
      console.log(" 🌎 Global user email :", chalk.blue(`'${global.email}'`));
      console.log();
    }

    if (local) {
      console.log(" 📁 Local user name   :", chalk.gray(`'${local.name}'`));
      console.log(" 📁 Local user email  :", chalk.gray(`'${local.email}'`));
      console.log();
    } else {
      console.log(chalk.yellow(` 💡 No local configs have been found`));
      console.log();
    }
  },
};

function box(text: string, suffix: string = "") {
  const upperBox = "┌─" + "─".repeat(text.length) + "─┐";
  const middleBox = "│ " + text + " │ " + suffix;
  const lowerBox = "└─" + "─".repeat(text.length) + "─┘";

  return upperBox + "\n" + middleBox + "\n" + lowerBox;
}
