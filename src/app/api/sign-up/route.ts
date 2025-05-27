import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    console.log("Received data:", { email, password });

    if (!email) {
        return new Response(JSON.stringify({ success: false, error: "Email is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    if (!password) {
        return new Response(JSON.stringify({ success: false, error: "Password is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }

    console.log("Making request to backend for registration...");

    try {
        console.log("Sending registration request to backend with data:", { email, password });

        const response = await axios.post(`${process.env.EXPRESS_BACKEND_URL}/api/auth/register`, {
            email,
            password
        });
        
        console.log("Received response from backend:", response.data);
        return new Response(JSON.stringify({ success: true, message: response.data.message }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error: any) {
        console.error("Error during registration:", error);

        if (error.response) {
            // Extract status and message from backend error response
            const statusCode = error.response.status;
            const backendMessage = error.response.data?.error || error.response.data?.message || "Registration failed";

            return new Response(
                JSON.stringify({ success: false, error: backendMessage }),
                {
                    status: statusCode,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        return new Response(
            JSON.stringify({ success: false, error: "Failed to register user" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
