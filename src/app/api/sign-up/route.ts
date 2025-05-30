import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    console.log("Received data:", { email, password });

    if (!email) {
        return new Response(JSON.stringify({ success: false, error: "Email is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
            
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
        },{ withCredentials: true });

        if (response.status !== 201) {
            console.error("Unexpected response status:", response.status);
            return new Response(JSON.stringify({ success: false, message: response.data.message || "Registration failed" }), {
                status: response.status,
                headers: { "Content-Type": "application/json" }
            });
        }

        console.log("Received response from backend:", response.data);
        return new Response(JSON.stringify({ success: true, message: response.data.message }), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error: any) {
        console.error("Error during registration:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message ||"Failed to register user" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
