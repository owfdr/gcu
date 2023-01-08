import chalk from "chalk";
import { Config } from "./git";

type Message = "welcome" | "globalStatus" | "localStatus" | "notFound" | "added"

export default {
    message(type: Message, ...data: (string | undefined)[]) {
        if (type === "welcome") {
            console.log("")
            console.log(chalk.grey("╔═╗╔═╗╦ ╦"), " ==========================")
            console.log(chalk.grey("║ ╦║  ║ ║"), " Welcome to Git Change User")
            console.log(chalk.grey("╚═╝╚═╝╚═╝"), " ==========================")
            console.log("");
        }

        if (type === "globalStatus") {
            if (data[0] && data[1]) {
                console.log(" 🌎 Global user name  :", chalk.blue(`'${data[0]}'`))
                console.log(" 🌎 Global user email :", chalk.blue(`'${data[1]}'`))
            }
            console.log()
        }

        if (type === "localStatus") {
            if (data[0] && data[1]) {
                console.log(" 📁 Local user name   :", chalk.gray(`'${data[0]}'`))
                console.log(" 📁 Local user email  :", chalk.gray(`'${data[1]}'`))
            } else {
                console.log(chalk.yellow(` 💡 No local configs have been found`))
            }
            console.log()
        }

        if (type === "notFound") {
            console.log(chalk.yellow(chalk.bold(` 😿 git user profile not found...`)))
            console.log()
        }

        if (type === "added") {
            console.log()
            console.log(chalk.green(chalk.bold(`'${data[0]} <${data[1]}>'`, "is registered!")))
        }

    },
    dashboard({ global, local }: Config) {
        if (global) {
            console.log(" 🌎 Global user name  :", chalk.blue(`'${global.name}'`))
            console.log(" 🌎 Global user email :", chalk.blue(`'${global.email}'`))
            console.log()
        }

        if (local) {
            console.log(" 📁 Local user name   :", chalk.gray(`'${local.name}'`))
            console.log(" 📁 Local user email  :", chalk.gray(`'${local.email}'`))
            console.log()
        } else {
            console.log(chalk.yellow(` 💡 No local configs have been found`))
            console.log()
        }
    },
}