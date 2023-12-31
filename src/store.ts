import Conf from "conf";
import log from "./log.js";

const store = new Conf({ projectName: "gcu" });

if (store.get("users") === undefined) {
  store.set("users", []);
}

export default store;

export type User = { name: string; email: string };

export function saveToStore({ name, email }: User) {
  const users = store.get("users") as User[] | undefined;
  const exist = exists(name, email, users);

  if (users && !exist) {
    store.set("users", [...users, { name, email }]);
  }

  log.message("added", name, email);
}

export function removeFromStore({ name, email }: User) {
  const users = store.get("users") as User[] | undefined;

  const remain = users?.filter((user) => {
    return user.name !== name && user.email !== email;
  });

  store.set("users", remain);
  log.message("deleted", name, email);
}

function exists(name: string, email: string, users: User[] | undefined) {
  if (users) {
    return users.find((user) => user.name === name && user.email === email);
  }

  return false;
}
