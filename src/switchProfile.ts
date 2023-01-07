import prompt from "./prompt.js";
import { Config } from "./git.js";
import { saveToStore } from "./store.js";
import log from "./log.js";

export default function switchProfile(config: Config) {
    const { global, local } = config
    
    log.message("globalStatus", global?.name, global?.email)
    log.message("localStatus", local?.name, local?.email)

    return new Promise<void>(async resolve => {
        const { scope } = await prompt('whichScope')

        if (scope === "global") {
            const index = await chooseUser()

            writeToGitProfile(index)
            resolve()
        }

        if (scope === "local") {
            const index = await chooseUser()

            writeToGitProfile(index)
            resolve()
        }

        process.exit(0)
    })
}

function writeToGitProfile(index: number) {
    // TODO: write logic
    console.log("writing to git profile...")
}

function chooseUser() {
    return new Promise<number>(async resolve => {
        const { user } = await prompt("whichUser")

        if (user === -1) {
            await prompt("newProfile").then(saveToStore)
            await chooseUser()
        } else {
            resolve(user)
        }
    })
}

