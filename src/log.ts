import chalk from "chalk";

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
            console.log(chalk.yellow(chalk.bold(`Global git user profile not found.`)))
        }

        if (type === "added") {
            console.log(chalk.green(data[0], `<${data[1]}>`, "has been successfully added"))
        }

    }
}