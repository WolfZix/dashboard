import {
    type RouteConfig,
    route,
    layout,
    index,
} from "@react-router/dev/routes";

export default [
    route("login", "routes/login.tsx"),

    layout("routes/dashboard.tsx", [
        route("", "routes/home.tsx"),
        route("/users", "routes/users.tsx"),
        route("/analytics", "routes/analytics.tsx"),
    ]),
] satisfies RouteConfig;