#! /usr/bin/env node
import inquirer from 'inquirer';
import Conf from 'conf';
import chalk from 'chalk';
import { execaCommand } from 'execa';
import path from 'path';
import fs from 'fs';
import { program } from 'commander';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var log = {
    message(type, ...data) {
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
            console.log(chalk.yellow(chalk.bold(` 😿 git user profile not found...`)));
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
            console.log(chalk.yellow(chalk.bold(` 😿 Sorry, you must initialize a Git repository first.`)));
            console.log(chalk.green(` 🌱 Try "git init"`));
            console.log();
        }
        if (type === "changeSuccess") {
            const user = `${data[0]} <${data[1]}>`;
            const boxed = box(user, "became the current user ✅");
            console.log();
            console.log(chalk.green(chalk.bold(` 🎉 Git user changed successfully!`)));
            console.log(chalk.green(boxed));
            console.log();
        }
    },
    dashboard({ global, local }) {
        if (global) {
            console.log(" 🌎 Global user name  :", chalk.blue(`'${global.name}'`));
            console.log(" 🌎 Global user email :", chalk.blue(`'${global.email}'`));
            console.log();
        }
        if (local) {
            console.log(" 📁 Local user name   :", chalk.gray(`'${local.name}'`));
            console.log(" 📁 Local user email  :", chalk.gray(`'${local.email}'`));
            console.log();
        }
        else {
            console.log(chalk.yellow(` 💡 No local configs have been found`));
            console.log();
        }
    },
};
function box(text, suffix = "") {
    const upperBox = "┌─" + "─".repeat(text.length) + "─┐";
    const middleBox = "│ " + text + " │ " + suffix;
    const lowerBox = "└─" + "─".repeat(text.length) + "─┘";
    return upperBox + "\n" + middleBox + "\n" + lowerBox;
}

const store = new Conf({ projectName: "gcu" });
if (store.get("users") === undefined) {
    store.set("users", []);
}
function saveToStore({ name, email }) {
    const users = store.get("users");
    const exist = exists(name, email, users);
    if (users && !exist) {
        store.set("users", [...users, { name, email }]);
    }
    log.message("added", name, email);
}
function removeFromStore({ name, email }) {
    const users = store.get("users");
    const remain = users === null || users === void 0 ? void 0 : users.filter((user) => {
        return user.name !== name && user.email !== email;
    });
    store.set("users", remain);
    log.message("deleted", name, email);
}
function exists(name, email, users) {
    if (users) {
        return users.find((user) => user.name === name && user.email === email);
    }
    return false;
}

function prompt(type) {
    if (type === "createGlobal") {
        return inquirer.prompt([
            {
                type: "confirm",
                name: "createGlobal",
                message: "Would you like to create one?",
                default: true,
            },
        ]);
    }
    if (type === "newProfile") {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "username:",
                filter: whitespace,
                validate: text,
            },
            {
                type: "input",
                name: "email",
                message: "email:",
                filter: whitespace,
                validate: text,
            },
        ]);
    }
    if (type === "whichScope") {
        return inquirer.prompt([
            {
                type: "list",
                name: "scope",
                message: "which scope of the profile to change?",
                choices: [
                    { name: "global 🌎", value: "global" },
                    { name: "local  📁", value: "local" },
                    new inquirer.Separator(),
                    { name: "cancel", value: "cancel" },
                ],
            },
        ]);
    }
    if (type === "whichUser") {
        return inquirer.prompt([
            {
                type: "list",
                name: "user",
                loop: false,
                message: "Which profile to use?",
                choices: generateUserList("select"),
            },
        ]);
    }
    if (type === "deleteUser") {
        return inquirer.prompt([
            {
                type: "list",
                name: "user",
                loop: false,
                message: "Which profile to delete?",
                choices: generateUserList("delete"),
            },
        ]);
    }
    throw "not exhaustive";
}
function generateUserList(type) {
    const users = store.get("users");
    const list = users.map((user) => {
        const { name, email } = user;
        return {
            name: `${type === "delete" ? "❌" : ""} ${name} <${email}>`,
            value: { name, email, option: "" },
        };
    });
    if (type === "select") {
        list.push(new inquirer.Separator(), {
            name: "add new    +",
            value: { name: "", email: "", option: "add" },
        }, {
            name: "delete one -",
            value: { name: "", email: "", option: "delete" },
        }, new inquirer.Separator(), {
            name: "cancel",
            value: { name: "", email: "", option: "cancel" },
        });
    }
    if (type === "delete") {
        list.push(new inquirer.Separator(), {
            name: "cancel",
            value: { name: "", email: "", option: "cancel" },
        });
    }
    return list;
}
function whitespace(input) {
    if (typeof input === "string") {
        return input.trim();
    }
}
function text(input) {
    if (typeof input !== "string") {
        return "input must be a string";
    }
    return true;
}

var git = {
    user() {
        return __awaiter(this, void 0, void 0, function* () {
            let global = { name: "", email: "" };
            let local = { name: "", email: "" };
            try {
                global.name = (yield execaCommand("git config --global user.name")).stdout;
                global.email = (yield execaCommand("git config --global user.email")).stdout;
            }
            catch (_a) {
                global = undefined;
            }
            try {
                local.name = (yield execaCommand("git config --local user.name")).stdout;
                local.email = (yield execaCommand("git config --local user.email")).stdout;
            }
            catch (_b) {
                local = undefined;
            }
            return { global, local };
        });
    },
    change(user, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = escape(user.name);
            const email = escape(user.email);
            const option = scope === "global" ? "--global" : "";
            if (scope === "local") {
                const dotGitDir = path.join(process.cwd(), ".git");
                const dotGitDirExists = fs.existsSync(dotGitDir);
                if (!dotGitDirExists) {
                    log.message("yetInitialized");
                    process.exit(1);
                }
            }
            try {
                yield execaCommand(`git config ${option} user.name ${name}`);
                yield execaCommand(`git config ${option} user.email ${email}`);
            }
            catch (error) {
                console.error(error);
                process.exit(1);
            }
        });
    },
};
function escape(string) {
    return string.replace(/ /g, "\\ ");
}

function switchProfile(config) {
    return __awaiter(this, void 0, void 0, function* () {
        log.dashboard(config);
        const { scope } = yield prompt("whichScope");
        if (scope === "cancel") {
            log.message("exit");
            process.exit(0);
        }
        const user = yield chooseUser(scope);
        git.change(user, scope).then(() => {
            log.message("changeSuccess", user.name, user.email);
            process.exit(0);
        });
    });
}
function chooseUser(scope) {
    return __awaiter(this, void 0, void 0, function* () {
        let { user } = yield prompt("whichUser");
        if (user.option === "add") {
            yield prompt("newProfile").then(saveToStore);
            log.message(scope);
            return yield chooseUser(scope);
        }
        if (user.option === "delete") {
            let { user } = yield prompt("deleteUser");
            if (user.option !== "cancel") {
                removeFromStore(user);
            }
            log.message(scope);
            return yield chooseUser(scope);
        }
        if (user.option === "cancel") {
            log.message("exit");
            process.exit(0);
        }
        delete user.option;
        return user;
    });
}

function createGlobal() {
    return __awaiter(this, void 0, void 0, function* () {
        log.message("notFound");
        const { createGlobal } = yield prompt("createGlobal");
        if (createGlobal) {
            yield prompt("newProfile").then(saveToStore);
        }
    });
}

program
    .name("gcu")
    .version("0.1.0")
    .description("gcu - change git user elegantly")
    .parse();
log.message("welcome");
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const config = yield git.user();
            if (config.global) {
                yield switchProfile(config);
                break;
            }
            else {
                yield createGlobal();
            }
        }
    });
})();
