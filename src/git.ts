import { execaCommand } from "execa"
import { User } from "./store.js"

export type UserConfig = {
    name: string,
    email: string,
} | undefined

export type Config = { 
    global: UserConfig, 
    local: UserConfig 
}

export default {
    async user(): Promise<Config> {
        let global: UserConfig = { name: "", email: "" }
        let local: UserConfig = { name: "", email: ""}
    
        try {
            global.name = (await execaCommand("git config --global user.name")).stdout
            global.email = (await execaCommand("git config --global user.email")).stdout
        } catch {
            global = undefined
         }
    
        try {
            local.name = (await execaCommand("git config --local user.name")).stdout
            local.email = (await execaCommand("git config --local user.email")).stdout
        } catch {
            local = undefined
        }
    
        return { global, local }
    },
    async change(user: User, scope: "global" | "local") {
        const name = escape(user.name)
        const email = escape(user.email)
        const option = scope === "global" ? "--global" : ""

        try {
            await execaCommand(`git config ${option} user.name ${name}`)
            await execaCommand(`git config ${option} user.email ${email}`)
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    }
}

function escape(string: string) {
    return string.replace(/ /g, "\\ ")
}
