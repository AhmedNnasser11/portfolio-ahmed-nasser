"use cache: private";

import { cacheLife } from "next/cache";

export async function getPrivatePersonalizedData(
    searchParams: { v?: string },
    demoUser: string,
    userAgent: string
) {
    "use cache: private";
    cacheLife({
        stale: 60, // 60 seconds - data is fresh
        revalidate: 120, // 120 seconds - revalidate in background
        expire: 180, // 180 seconds - hard expiration
    });

    const timestamp = new Date().toISOString();
    const executionId = Math.random().toString(36).substring(7);

    const versionParam = searchParams.v || "default";

    // Server-side logging to observe cache behavior
    console.log("🔥 CACHE FUNCTION EXECUTED 🔥");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`⏰ Timestamp: ${timestamp}`);
    console.log(`🆔 Execution ID: ${executionId}`);
    console.log(`👤 Cookie (demoUser): ${demoUser}`);
    console.log(`🌐 User-Agent: ${userAgent.substring(0, 50)}...`);
    console.log(`🔢 SearchParam (v): ${versionParam}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    // Simulate some processing
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
        message: "This is private cached data",
        user: demoUser,
        userAgent: userAgent.substring(0, 80),
        version: versionParam,
        executedAt: timestamp,
        executionId,
        cacheInfo: {
            stale: "60s",
            revalidate: "120s",
            expire: "180s",
        },
    };
}

