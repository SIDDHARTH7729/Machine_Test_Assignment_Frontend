import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  // chcking if file received or not
  if (!file) {
    return new Response(JSON.stringify({ success: false, error: "No file uploaded" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!file.name.endsWith(".csv")) {
    return new Response(JSON.stringify({ success: false, error: "Only CSV files are allowed" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("File received of correct format")

  const buffer = Buffer.from(await file.arrayBuffer());

  const outgoingForm = new FormData();
  outgoingForm.append("file", new Blob([buffer], { type: file.type }), file.name);

  try {
    console.log("Sending file to backend for upload");
    const response = await axios.post(
      `${process.env.EXPRESS_BACKEND_URL}/api/files/upload`,
      outgoingForm,
      {
        headers: {
          Authorization: `Bearer `,
        },
      }
    );
    console.log("Received response from backend for file upload:", response.data);
   
    if (!response.data.success) {
      return new Response(JSON.stringify({ success: false, error: response.data.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: response.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.response?.data || error.message || "Upload failed",
      }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
