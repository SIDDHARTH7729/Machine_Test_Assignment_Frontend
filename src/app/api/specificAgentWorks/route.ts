import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { agentId } = body;

    if (!agentId) {
        return new Response(JSON.stringify({ success: false, error: "ID is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        console.log("Sending data to backend for Fetching works for agent with ID:", agentId);
        const response = await axios.post(
            `${process.env.EXPRESS_BACKEND_URL}/api/agents/${agentId}/works`, // ✅ Correct path
            {}, // no body needed unless your Express route needs it
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzViZDc0MGExNmFkYjU3ZjFkYjFiYSIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoic3Nzc3Nzc0BnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDA1MjcsImV4cCI6MTc0ODU4NjkyN30.UgnGuP3FdfPFMi6dt1ySnCPs9suwYIec7IcxFwoc2RI`,
                },
            }
        );

        console.log("Received response from backend for fetching works:", response.data);
        if (!response.data.success) {
            return new Response(JSON.stringify({ success: false, error: response.data.error }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        console.log("Successfully fetched works for agent and sending data to frontend");
        return new Response(JSON.stringify({ success: true, data: response.data }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error calling backend:", error?.response?.data || error.message);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzViZGI2MGExNmFkYjU3ZjFkYjFiZiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoic3Nzc3Nzc3NAZ21haWwuY29tIiwiaWF0IjoxNzQ4NDU1OTQyLCJleHAiOjE3NDg0NjMxNDJ9._l-9IgV5Tdi0JlC8aSuP07ukzmrrxrCz6WA9w_wZhbU
 */