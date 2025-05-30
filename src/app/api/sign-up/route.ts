
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    if (!email) {
        return Response.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    if (!password) {
        return Response.json({ success: false, error: "Password is required" }, { status: 400 });
    }

    try {
        const response = await axios.post(
            `${process.env.EXPRESS_BACKEND_URL}/api/auth/register`,
            { email, password },
            { withCredentials: true }
        );

        if (!response.data.success) {
            return Response.json({ success: false, error: response.data.message || "Registration failed" }, { status: 400 });
        }

        return Response.json({ success: true, message: response.data.message }, { status: 201 });
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Failed to register user";
        return Response.json({ success: false, error: message }, { status: 500 });
    }
}
