import type { User } from "../components/UsersPage/users.types"
type DashboardData = {
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

    UsersData: User[];
};

export async function getDashboardData(): Promise<DashboardData> {
    return {
        stats: {
            revenue: "78,500",
            users: "8,421",
            orders: "3,925",
            conversion: "27,4%",
        },
        activity: [
            "New user registered",
            "Order #1042 completed",
            "Payment received",
            "System backup finished",
            "New subscription started",
            "User upgraded plan",
            "Order #1043 completed",
            "System cache cleared",
            "Payment failed",
            "New user registered",
            "Database optimized",
            "Refund processed",
            "Order #1044 completed",
            "System cache cleared",
            "New subscription started",
            "New subscription started",
            "Payment received",
            "User downgraded plan",
            "Order #1045 completed",
            "New user registered",
            "New user registered",
            "Security scan completed",
            "Payment received",
            "Database optimized",
            "Payment received",
            "Order #1046 completed",
            "New subscription started",
            "User logged in",
            "System backup finished",
            "Order #1047 completed",
        ],
        news: [
            "AI insights module was deployed successfully earlier this morning. Internal testing shows a noticeable improvement in dashboard prediction accuracy and response speed across all regions.",

            "The weekly sales report is now available for all managers. Revenue increased by 14% compared to the previous week, with the highest activity coming from mobile users.",

            "Three new support tickets have been assigned to the customer success team. Most of the reported issues are related to account synchronization and delayed notifications.",

            "The latest marketing campaign has already reached more than 12,000 users within the first 24 hours. Engagement rates are currently performing above expectations.",

            "Inventory synchronization completed successfully across all connected warehouses. No missing product entries or stock conflicts were detected during validation.",

            "Server response times improved by approximately 18% after the latest infrastructure optimization update. API requests are now completing significantly faster during peak traffic.",

            "A new partner integration is now available inside the integrations dashboard. Users can connect external analytics platforms without additional configuration steps.",

            "The finance dashboard has been updated with expanded reporting features and improved transaction filtering. Export performance was also optimized for large datasets.",

            "Two-factor authentication has now been enabled for all administrator accounts by default. Security logs indicate no suspicious login attempts in the past 48 hours.",

            "Customer satisfaction scores increased again this week following recent onboarding improvements. Positive feedback mainly highlighted the redesigned user interface.",

            "Cloud storage usage has reached 72% of the allocated capacity. Automated cleanup recommendations have been generated for inactive resources and unused backups.",

            "The monthly revenue target has officially been achieved ahead of schedule. Subscription renewals and enterprise upgrades contributed to the strongest growth segment.",

            "Several new analytics widgets were added to the overview dashboard today. Users can now track engagement metrics and conversion rates in real time.",

            "Background jobs processed successfully overnight without any critical failures. Queue execution time remained stable even during heavy system load.",

            "SEO performance improved significantly this week after metadata optimization and page speed enhancements. Organic traffic from search engines continues to rise steadily.",

            "A new team member joined the workspace and completed onboarding successfully. Access permissions and development environments were configured automatically.",

            "Application uptime remained stable at 99.98% over the last 30 days. Monitoring systems reported no major outages or infrastructure interruptions.",

            "The latest security audit has been completed successfully with no critical vulnerabilities detected. Minor recommendations were added to the internal compliance checklist.",

            "New comments are currently awaiting moderation in the community section. Automated filters already flagged several messages for manual review.",

            "Subscription renewals were processed successfully overnight for all active premium accounts. Payment retry systems also recovered several previously failed transactions.",

            "Mobile app version 2.4 has officially been released to production environments. The update introduces faster navigation and improved offline synchronization.",

            "API latency has been reduced across multiple regions after network routing optimizations. International users should now experience noticeably faster loading times.",

            "New invoices were generated automatically for all enterprise clients this morning. Accounting exports are already available in the billing section.",

            "A traffic spike was detected after several social media posts began trending earlier today. Real-time monitoring systems scaled resources automatically to prevent downtime.",

            "User activity increased by 24% compared to the previous reporting period. Most of the growth came from returning users interacting with newly released features.",

            "Scheduled maintenance completed successfully during the night maintenance window. No data inconsistencies or service interruptions were reported afterward.",

            "The customer onboarding flow was updated with additional tooltips and simplified navigation steps. Early analytics suggest improved completion rates among new users.",

            "Data exports finished successfully for all requested reports and archived datasets. Processing times remained within expected performance thresholds.",

            "Real-time monitoring has now been enabled for all critical backend services. Alerts will automatically notify administrators about unusual traffic or server activity.",

            "Workspace settings were synchronized successfully across all connected devices and user sessions. Preference updates should now appear instantly without requiring a refresh.",
        ],
        chart: [
            { name: "D1", revenue: 0 },
            { name: "D2", revenue: 1000 },
            { name: "D3", revenue: 500 },
            { name: "D4", revenue: 1500 },
            { name: "D5", revenue: 500 },
            { name: "D6", revenue: 2000 },
            { name: "D7", revenue: 1500 },
            { name: "D8", revenue: 3000 },
            { name: "D9", revenue: 1000 },
            { name: "D10", revenue: 2000 },
            { name: "D11", revenue: 500 },
            { name: "D12", revenue: 1500 },
            { name: "D13", revenue: 500 },
            { name: "D14", revenue: 1500 },
            { name: "D15", revenue: 1000 },
            { name: "D16", revenue: 1500 },
            { name: "D17", revenue: 1000 },
            { name: "D18", revenue: 1500 },
            { name: "D19", revenue: 1000 },
            { name: "D20", revenue: 2000 },
            { name: "D21", revenue: 500 },
            { name: "D22", revenue: 2500 },
            { name: "D23", revenue: 1500 },
            { name: "D24", revenue: 2000 },
            { name: "D25", revenue: 1500 },
            { name: "D26", revenue: 2500 },
            { name: "D27", revenue: 1000 },
            { name: "D28", revenue: 2000 },
            { name: "D29", revenue: 500 },
            { name: "D30", revenue: 1500 },
            { name: "D31", revenue: 500 },
            { name: "D32", revenue: 1000 },
            { name: "D33", revenue: 500 },
            { name: "D34", revenue: 1000 },
            { name: "D35", revenue: 500 },
            { name: "D36", revenue: 2000 },
            { name: "D37", revenue: 1000 },
            { name: "D38", revenue: 2500 },
            { name: "D39", revenue: 1500 },
            { name: "D40", revenue: 2500 },
            { name: "D41", revenue: 1500 },
            { name: "D42", revenue: 3500 },
            { name: "D43", revenue: 2000 },
            { name: "D44", revenue: 3500 },
            { name: "D45", revenue: 2000 },
            { name: "D46", revenue: 3000 },
            { name: "D47", revenue: 2500 },
            { name: "D48", revenue: 3000 },
            { name: "D49", revenue: 1500 },
            { name: "D50", revenue: 4000 },
        ],
        notifications: [
            {
                from: "System",
                title: "Scheduled maintenance completed",
                date: "2 min ago",
                description: "The scheduled infrastructure maintenance has been completed successfully without any downtime.",
            },
            {
                from: "Finance Team",
                title: "Monthly revenue target achieved",
                date: "12 min ago",
                description: "Revenue for this month exceeded projections by 8.4% compared to the previous period.",
            },
            {
                from: "Security Center",
                title: "New login detected",
                date: "18 min ago",
                description: "A new login was detected from a previously unknown device located in Berlin, Germany.",
            },
            {
                from: "Analytics",
                title: "Traffic spike detected",
                date: "24 min ago",
                description: "Website traffic increased significantly after the latest marketing campaign launch.",
            },
            {
                from: "Support",
                title: "New support ticket assigned",
                date: "31 min ago",
                description: "A high-priority customer issue has been assigned to your support queue.",
            },
            {
                from: "Database",
                title: "Optimization completed",
                date: "45 min ago",
                description: "Database indexing and cleanup tasks finished successfully with improved query performance.",
            },
            {
                from: "Marketing",
                title: "Campaign performance updated",
                date: "1 hour ago",
                description: "The latest social campaign reached over 14,000 users across multiple platforms.",
            },
            {
                from: "Workspace",
                title: "New member joined",
                date: "1 hour ago",
                description: "Emily Johnson joined the workspace and received administrator permissions.",
            },
            {
                from: "Billing",
                title: "Subscription renewed",
                date: "2 hours ago",
                description: "Your Professional plan subscription has been renewed successfully for another month.",
            },
            {
                from: "Cloud Storage",
                title: "Storage usage warning",
                date: "2 hours ago",
                description: "Cloud storage usage has reached 82% of the available workspace capacity.",
            },
            {
                from: "AI Assistant",
                title: "Weekly insights generated",
                date: "3 hours ago",
                description: "AI-generated business insights are now available in the analytics dashboard.",
            },
            {
                from: "API Gateway",
                title: "Latency improved",
                date: "4 hours ago",
                description: "Average API response time decreased by 16% after the latest deployment.",
            },
            {
                from: "Moderation",
                title: "New comments awaiting review",
                date: "5 hours ago",
                description: "There are currently 12 comments pending moderation approval in the community section.",
            },
            {
                from: "Mobile App",
                title: "Version 2.4 released",
                date: "6 hours ago",
                description: "The newest mobile application update is now available for iOS and Android devices.",
            },
            {
                from: "Monitoring",
                title: "All systems operational",
                date: "8 hours ago",
                description: "Infrastructure monitoring confirms that all services are running normally with no incidents detected.",
            },
        ],
        profileOptions: [
            { name: "Profile", icon: "user", path: "/profile" },
            { name: "Settings", icon: "settings", path: "/settings" },
            { name: "Log Out", icon: "logout", path: "login" },
        ],
        UsersData: [
            {
                id: 1, name: "WolfeZix", role: "Admin", status: "Online", joined: "2026-05-05", bio: "🚀 Building cool dashboard stuff",
                projects: 12, reports: 31, tasks: 84, commits: 621, color: "#00FF00", textColor: "#000000"
            },

            {
                id: 2, name: "NovaByte", role: "Moderator", status: "Away", joined: "2026-04-12", bio: "☕ Probably debugging something",
                projects: 9, reports: 24, tasks: 53, commits: 418, color: "#FF6B6B", textColor: "#FFFFFF"
            },

            {
                id: 3, name: "ShadowSync", role: "User", status: "Offline", joined: "2026-03-28", bio: "",
                projects: 2, reports: 3, tasks: 12, commits: 41, color: "#4ECDC4", textColor: "#1A1A1A"
            },

            {
                id: 4, name: "PixelCrafter", role: "Premium", status: "Online", joined: "2026-02-17", bio: "🎨 UI perfectionist",
                projects: 18, reports: 42, tasks: 91, commits: 802, color: "#FFE66D", textColor: "#2B2B2B"
            },

            {
                id: 5, name: "EchoPulse", role: "User", status: "Busy", joined: "2026-01-09", bio: "🎧 Coding with synthwave",
                projects: 7, reports: 11, tasks: 37, commits: 259, color: "#6A4C93", textColor: "#F5F5F5"
            },

            {
                id: 6, name: "CyberNest", role: "Moderator", status: "Online", joined: "2025-11-23", bio: "",
                projects: 14, reports: 39, tasks: 78, commits: 711, color: "#F72585", textColor: "#FFFFFF"
            },

            {
                id: 7, name: "ZenithFlow", role: "User", status: "Away", joined: "2025-12-30", bio: "🌙 Night owl developer",
                projects: 5, reports: 7, tasks: 26, commits: 194, color: "#3A86FF", textColor: "#F8FAFC"
            },

            {
                id: 8, name: "CodeRift", role: "Premium", status: "Offline", joined: "2025-08-14", bio: "",
                projects: 16, reports: 47, tasks: 109, commits: 920, color: "#8338EC", textColor: "#FFFFFF"
            },

            {
                id: 9, name: "FrostNova", role: "User", status: "Online", joined: "2025-06-02", bio: "❄️ Keeping things cool",
                projects: 4, reports: 9, tasks: 21, commits: 136, color: "#FB5607", textColor: "#FFF7ED"
            },

            {
                id: 10, name: "OrbitByte", role: "User", status: "Busy", joined: "2025-05-19", bio: "",
                projects: 3, reports: 5, tasks: 18, commits: 82, color: "#06D6A0", textColor: "#062925"
            },

            {
                id: 11, name: "HyperLeaf", role: "Premium", status: "Online", joined: "2025-03-11", bio: "🌿 Touching grass occasionally",
                projects: 20, reports: 55, tasks: 132, commits: 1104, color: "#EF476F", textColor: "#FFFFFF"
            },

            {
                id: 12, name: "NeonHive", role: "Moderator", status: "Offline", joined: "2025-07-26", bio: "💡 Bright ideas only",
                projects: 11, reports: 28, tasks: 66, commits: 487, color: "#118AB2", textColor: "#E0F2FE"
            },

            {
                id: 13, name: "SkyForge", role: "User", status: "Away", joined: "2025-10-04", bio: "",
                projects: 6, reports: 10, tasks: 29, commits: 213, color: "#FFD166", textColor: "#3B2F00"
            },

            {
                id: 14, name: "DriftCode", role: "User", status: "Online", joined: "2025-09-15", bio: "🏎️ Fast code, fast life",
                projects: 8, reports: 15, tasks: 44, commits: 321, color: "#8ECAE6", textColor: "#102A43"
            },

            {
                id: 15, name: "PulseFrame", role: "Premium", status: "Busy", joined: "2026-01-21", bio: "🎵 Vibing while coding",
                projects: 15, reports: 36, tasks: 88, commits: 653, color: "#FF006E", textColor: "#FFFFFF"
            },

            {
                id: 16, name: "QuantumEdge", role: "Admin", status: "Online", joined: "2026-02-08", bio: "⚡ Scaling the impossible",
                projects: 24, reports: 63, tasks: 154, commits: 1422, color: "#2EC4B6", textColor: "#062925"
            },

            {
                id: 17, name: "LunarStack", role: "User", status: "Offline", joined: "2025-11-13", bio: "",
                projects: 1, reports: 2, tasks: 9, commits: 28, color: "#E76F51", textColor: "#FFF7ED"
            },

            {
                id: 18, name: "VertexGlow", role: "Premium", status: "Away", joined: "2026-04-25", bio: "✨ Minimalism enjoyer",
                projects: 13, reports: 33, tasks: 71, commits: 578, color: "#90BE6D", textColor: "#1F2937"
            },

            {
                id: 19, name: "AeroShift", role: "User", status: "Online", joined: "2025-06-07", bio: "🛫 Shipping features daily",
                projects: 10, reports: 19, tasks: 58, commits: 447, color: "#7209B7", textColor: "#FAFAFA"
            },

            {
                id: 20, name: "CrypticFox", role: "Moderator", status: "Busy", joined: "2025-12-29", bio: "🦊 Sneaky but productive",
                projects: 17, reports: 45, tasks: 117, commits: 889, color: "#F4A261", textColor: "#2D1606"
            },

            {
                id: 21, name: "ByteHunter", role: "User", status: "Online", joined: "2026-02-18", bio: "",
                projects: 5, reports: 8, tasks: 24, commits: 173, color: "#4361EE", textColor: "#FFFFFF"
            },

            {
                id: 22, name: "SolarFlare", role: "Premium", status: "Away", joined: "2026-01-07", bio: "☀️ Bright mode defender",
                projects: 19, reports: 51, tasks: 128, commits: 997, color: "#B5179E", textColor: "#FDF4FF"
            },

            {
                id: 23, name: "NightPixel", role: "Moderator", status: "Busy", joined: "2025-11-11", bio: "🌃 Working after midnight",
                projects: 12, reports: 30, tasks: 74, commits: 562, color: "#00BBF9", textColor: "#06283D"
            },

            {
                id: 24, name: "CoreMatrix", role: "User", status: "Offline", joined: "2025-08-22", bio: "",
                projects: 2, reports: 4, tasks: 11, commits: 67, color: "#F94144", textColor: "#FFF5F5"
            },
        ],
    } satisfies DashboardData;
}