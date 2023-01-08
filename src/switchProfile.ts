import prompt from "./prompt.js";
import { Config } from "./git.js";
import { saveToStore } from "./store.js";
import log from "./log.js";

export default async function switchProfile(config: Config) {
    log.dashboard(config)

    const { scope } = await prompt('whichScope')

    if (scope === "global") {
        const index = await chooseUser()
        writeToGitProfile(index)
    }

    if (scope === "local") {
        const index = await chooseUser()
        writeToGitProfile(index)
    }

    process.exit(0)
}

function writeToGitProfile(index: number) {
    // TODO: write logic
    console.log("writing to git profile...")
}

async function chooseUser() {

    const { user } = await prompt("whichUser")

    if (user === -1) {
        await prompt("newProfile").then(saveToStore)
        await chooseUser()
    }

    return user
}
