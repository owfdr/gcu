import inquirer from "inquirer"
import store, { User } from "./store.js"

type PromptOption = "createGlobal" | "newProfile" | "whichScope" | "whichUser"

export default function prompt(type: PromptOption) {
    if (type === "createGlobal") {
        return inquirer.prompt([
            {
                type: "confirm",
                name: "createGlobal",
                message: "Would you like to create one?",
                default: true
            }
        ])
    }

    if (type === "newProfile") {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                filter: whitespace,
                validate: text
            },
            {
                type: "input",
                name: "email",
                filter: whitespace,
                validate: text
            }
        ])
    }

    if (type === "whichScope") {
        return inquirer.prompt([
            {
                type: "list",
                name: "scope",
                message: "which scope of the profile do you wish to change (add)?",
                choices: [
                    { name: "global 🌎", value: "global" },
                    { name: "local  📁", value: "local" },
                    new inquirer.Separator() as any,
                    { name: "cancel", value: "cancel"}
                ]
            }
        ])
    }

    if (type === "whichUser") {
        return inquirer.prompt([
            {
                type: "list",
                name: "user",
                message: "Which profile do you wish to use?",
                choices: generateUserList()
            }
        ])
    }

    throw "not exhaustive"
}

function generateUserList() {
    const users = store.get('users') as User[]
    const list = users.map((user, index) => {
        return {
            name: `${user.name} <${user.email}>`, 
            value: index
        }
    })

    list.push(new inquirer.Separator() as any)

    list.push({
        name: "add new one 🙋+",
        value: -1
    })

    return list
}

function whitespace(input: any) {
    if (typeof input === "string") {
        return input.trim()
    }
}

function text(input: any) {
    if (typeof input !== "string") {
        return "input must be a string"
    }
    return true
}
