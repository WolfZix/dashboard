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
