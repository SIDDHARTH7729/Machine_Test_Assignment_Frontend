import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    const body = await req.json();
    const { email, password } = body;
    console.log("Received data for signing in on nextjs api")

    // check if email and password are provided
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

    console.log("Making request to backend for signing in...");
    try {
        const response = await axios.post(`${process.env.EXPRESS_BACKEND_URL}/api/auth/login`,{
            email,
            password
        })

        console.log("Received response from backend for signing in:", response.data);
        if (!response.data.success) {
            return new Response(JSON.stringify({ success: false, error: response.data.error }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        console.log("Received response from backend for signing in:", response.data);
        return new Response(JSON.stringify({
            success: true, 
            message: response.data.message,
           }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error:any) {
        console.log("Error during signing in : ", error);

        if (error.response) {
            const statusCode = error.response.status;
            const backendMessage = error.response.data?.error || error.response.data?.message || "Signing in failed";

            return new Response(
                JSON.stringify({ success: false, error: backendMessage }),
                {
                    status: statusCode,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        return new Response(
            JSON.stringify({ success: false, error: "Failed to sign in user" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

}