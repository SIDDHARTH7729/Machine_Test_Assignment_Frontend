import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
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

    // make a request to the backend to sign in the user
    console.log("Making request to backend for signing in...");
    try {
        const response = await axios.post(`${process.env.EXPRESS_BACKEND_URL}/api/auth/login`, {
            email,
            password
        }, { withCredentials: true })

        console.log("Received response from backend for signing in:", response.data);
        // check if the response indicates success
        if (!response.data.success) {
            return new Response(JSON.stringify({ success: false, message: response.data.message || "Login failed"}), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const setCookie = response.headers['set-cookie']
        console.log("Received response from backend for signing in:", response.data);

        // if successful, return the response with cookies
        return new Response(JSON.stringify({ success: true, message: response.data.message, }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    ...(response.headers['set-cookie']
                        ? { "Set-Cookie": response.headers['set-cookie'].join(",") } // converting , since it expects HeadersInit type
                        : {}),
                },
            }
        );
    } catch (error: any) {
        // handle errors from the backend
        console.log("Error during signing in : ", error);
        return new Response(
            JSON.stringify({ success: false, message: error.response.data.message || "Failed to sign in user" }),
            {
                status: error.response?.statusCode || 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

}