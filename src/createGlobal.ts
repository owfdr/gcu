import log from "./log.js";
import prompt from "./prompt.js";
import { saveToStore } from "./store.js";

export default function createGlobal() {
    log.message("notFound")

    return new Promise(async resolve => {
        const { createGlobal } = await prompt("createGlobal")

        if (createGlobal) {
            await prompt("newProfile").then(saveToStore)

            return resolve(true)
        }

        return resolve(false)
    })
}