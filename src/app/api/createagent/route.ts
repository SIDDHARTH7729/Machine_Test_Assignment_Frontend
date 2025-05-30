// This api route creates a new agent in the backend.
// It requires the user to be authenticated, and it checks for an auth token in the cookies.
import axios from "axios";
import { NextRequest } from "next/server";
import { parse } from "cookie";

// This route handles the creation of a new agent by receiving the agent's details from the request body.
// It validates the input, checks for an authentication token, and then sends the data to the backend to create the agent.
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, phone, password }: { name?: string, email?: string, phone?: string, password?: string } = body;
    if (!(name || email || phone || password)) {
        return new Response(JSON.stringify({ success: false, message: "All fields ae required" }), {
            headers: {
                "Content-Type": "application/json"
            },
        })
    }

    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.authToken;

    if (!token) {
        return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    try {
        console.log("Sending data to backend for creating new agent with data");
        const response = await axios.post(`${process.env.EXPRESS_BACKEND_URL}/api/agents/create`, {
            name,
            email,
            password,
            phoneNumber: phone
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })

        if (!response.data.success) {
            return new Response(JSON.stringify({ sucess: false, message: response.data.message }), {
                headers: {
                    "Content-Type": "application/json",
                }
            })
        }

        // If the agent is created successfully, we return a success response.
        console.log("Successfully created new agent and sending response to frontend");
        return new Response(JSON.stringify({ success: true, message: "New agent created successfully" }), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error: any) {
        // If there is an error while creating the agent, we return an error response.
        const message = error?.response?.data?.message || "Failed to create agent";
        const status = error?.response?.status || 500;

        return new Response(JSON.stringify({ success: false, message }), {
            status,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

}