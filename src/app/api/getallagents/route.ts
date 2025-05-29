import axios from "axios";

export async function GET(){
    try {
        console.log("Fetching all agents from backend...");
        const allagents = await axios.get(`${process.env.EXPRESS_BACKEND_URL}/api/agents/all`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer `
            }
        });
        console.log("Received response from backend for fetching all agents:", allagents.data);
        if (!allagents.data.success) {
            return new Response(JSON.stringify({ success: false, error: allagents.data.error }), {
                status: 400,
                headers: { 
                    "Content-Type": "application/json" ,
                }
            });
        }

        console.log("Successfully fetched all agents and sending data to frontend",);
        return new Response(JSON.stringify({ success: true, data: allagents.data.agents }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })
    } catch (error:any) {
        console.error("Error fetching agents:", error);
        return new Response(JSON.stringify({ success: false, error:error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
        
    }
}