// This api route  efficiently does the logout process by sending a request to the backend to log out the user.
// It clears the jwt token on the backend as well as frontend, ensuring that the user is logged out securely.
import axios from "axios";

// This func plays an essential role as a logged out user's tokens should be
//  cleared from both the frontend and backend.
export async function GET() {
    try {
        console.log("Sending loggout request to backend...");
        const response = await axios.get(`${process.env.EXPRESS_BACKEND_URL}/api/auth/logout`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        // If the response indicates success, we clear the cookies and return a success message.
        if (response.data.success) {
            const setCookieHeader = response.headers['set-cookie'];
            return new Response(JSON.stringify({ success: true, message: "Logged out successfully" }), {
                headers: {
                    "Content-Type": "application/json",
                    ...(setCookieHeader ? { "Set-Cookie": setCookieHeader.join(", ") } : {}),
                },
            });
        }

        // If the response indicates failure, we return the message from the backend and dont let user logout
        // or message try again
        return new Response(JSON.stringify({ success: false, message: response.data.message }), {
            headers: {
                "Content-Type": "application/json",
            },
        });

    }catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error during logout:", error);
        return new Response(JSON.stringify({ success: false, message: error.message || "Logout failed" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
