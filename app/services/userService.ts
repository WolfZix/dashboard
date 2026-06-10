import type { User } from "../components/UsersPage/users.types";

export function getUsers(): User[] {
  const savedUsers = localStorage.getItem("users");
  if (!savedUsers) return [];
  return JSON.parse(savedUsers);
}

export function saveUsers(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}

export function getUserByName(username: string) {
  const users = getUsers();
  return users.find(
    (user) => user.name.toLowerCase() === username.toLowerCase(),
  );
}

export function getUserById(id: number | "Guest") {
  const users = getUsers();
  return users.find((user) => user.id === id);
}

export function updateUser(updatedUser: User) {
  const users = getUsers();
  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user,
  );
  saveUsers(updatedUsers);
  window.dispatchEvent(new Event("usersUpdated"));
}

export function deleteUser(userId: number | "Guest") {
  const users = getUsers();
  const updatedUsers = users.filter((user) => user.id !== userId);
  saveUsers(updatedUsers);
  window.dispatchEvent(new Event("usersUpdated"));
}

export function createUser(newUser: User) {
  const users = getUsers();
  saveUsers([...users, newUser]);
  window.dispatchEvent(new Event("usersUpdated"));
}
