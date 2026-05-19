export type User = {
    id: number;
    name: string;
    role: string;
    status: string;
    joined: string;
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