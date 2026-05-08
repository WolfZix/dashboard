import {
    type RouteConfig,
    route,
    layout,
    index,
} from "@react-router/dev/routes";

export default [
    route("login", "routes/login.tsx"),

    layout("routes/dashboard.tsx", [
        route("dashboard", "routes/home.tsx"),
        route("dashboard/users", "routes/users.tsx"),
        route("dashboard/analytics", "routes/analytics.tsx"),
    ]),
] satisfies RouteConfig;