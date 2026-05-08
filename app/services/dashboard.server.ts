export async function getDasboardData() {
    //według AI tak moge zasymulować prawdziwe API więc sie nie kłóciłem ¯\_(ツ)_/¯
    await new Promise((res) => setTimeout(res, 600));

    return {
        stats: {
            revenue: "48,240",
            users: "8,421",
            orders: "1,203",
            conversion: "4,8%",
        },
        activity: [
            "New user registered",
            "Order #1042 completed",
            "Payment recived",
            "System backup finished",
            "New subscription started",
        ],
    };
}