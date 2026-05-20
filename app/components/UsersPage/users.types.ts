export type User = {
    id: number;
    name: string;
    role: | "Admin" | "Moderator" | "Premium" | "User";
    status: | "Online" | "Busy" | "Away" | "Offline";
    joined: string;
    bio: string;
    projects: number;
    reports: number;
    tasks: number;
    commits: number;
    color: string;
    textColor: string;
};

export type SortBy =
    | "id"
    | "name"
    | "role"
    | "status"
    | "joined";

export type SortOrder =
    | "asc"
    | "desc"
    | null;