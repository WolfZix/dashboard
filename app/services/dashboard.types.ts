import type { User } from "../components/UsersPage/users.types";

export type DashboardData = {
    stats: {
        revenue: string;
        users: string;
        orders: string;
        conversion: string;
    };
    activity: string[];
    news: string[];
    chart: {
        name: string;
        revenue: number;
    }[];
    notifications: {
        from: string;
        title: string;
        date: string;
        description: string;
    }[];
    profileOptions: {
        name: string;
        icon: string;
        path: string;
    }[];
    usersData: User[];
}