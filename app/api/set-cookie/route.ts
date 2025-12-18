import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const user = searchParams.get("user") || "anonymous";

    // Create response with cookie
    const response = NextResponse.json({
        success: true,
        message: `Cookie set successfully`,
        user: user,
        timestamp: new Date().toISOString(),
    });

    // Set the cookie
    response.cookies.set("demoUser", user, {
        httpOnly: false, // Allow client-side access for demo purposes
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });

    return response;
}
