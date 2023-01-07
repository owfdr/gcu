import { execaCommand } from "execa"

export type UserConfig = {
    name: string,
    email: string,
} | undefined

export type Config = { 
    global: UserConfig, 
    local: UserConfig 
}

const git = {
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
    }
}

export default git