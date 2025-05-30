// Ths api route fetches all agents from the backend and returns them to the frontend.
// This route requires the user to be authenticated, and it checks for an auth token in the cookies.
import axios from "axios";
import { NextRequest } from "next/server";
import { parse } from "cookie";

export async function GET(req: NextRequest) {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.authToken;

    // this tokens is set by the backend when the user logs in, and it is used to authenticate the user for subsequent requests.
    if (!token) {
        return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    try {
        console.log("Fetching all agents from backend...");
        const allagents = await axios.get(`${process.env.EXPRESS_BACKEND_URL}/api/agents/all`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        if (!allagents.data.success) {
            return new Response(JSON.stringify({ success: false, error: allagents.data.error }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }

        console.log("Successfully fetched all agents and sending data to frontend",);
        return new Response(JSON.stringify({ success: true, data: allagents.data.agents || [] }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })
    } catch (error: any) {
        console.error("Error fetching agents:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });

    }
}