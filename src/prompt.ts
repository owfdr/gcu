import inquirer from "inquirer";
import store, { User } from "./store.js";

type PromptOption =
  | "createGlobal"
  | "newProfile"
  | "whichScope"
  | "whichUser"
  | "deleteUser";

export default function prompt(type: PromptOption) {
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
          new inquirer.Separator() as any,
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

function generateUserList(type: "select" | "delete") {
  const users = store.get("users") as User[];
  const list = users.map((user) => {
    const { name, email } = user;

    return {
      name: `${type === "delete" ? "❌" : ""} ${name} <${email}>`,
      value: { name, email, option: "" },
    };
  });

  if (type === "select") {
    list.push(
      new inquirer.Separator() as any,
      {
        name: "add new    +",
        value: { name: "", email: "", option: "add" },
      },
      {
        name: "delete one -",
        value: { name: "", email: "", option: "delete" },
      },
      new inquirer.Separator() as any,
      {
        name: "cancel",
        value: { name: "", email: "", option: "cancel" },
      },
    );
  }

  if (type === "delete") {
    list.push(new inquirer.Separator() as any, {
      name: "cancel",
      value: { name: "", email: "", option: "cancel" },
    });
  }

  return list;
}

function whitespace(input: any) {
  if (typeof input === "string") {
    return input.trim();
  }
}

function text(input: any) {
  if (typeof input !== "string") {
    return "input must be a string";
  }
  return true;
}
