import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const body = await req.json();
    const {name,email,phone,password}:{name?:string,email?:string,phone?:string,password?:string} = body;
    if(!(name||email||phone||password)){
        return new Response(JSON.stringify({success:false,message:"All fields ae required"}),{
            headers:{
               "Content-Type":"application/json"
            },
        })
    }
    console.log("Received data for creating new agent on api route");

    try {
        console.log("Sending data to backend for creating new agent with data");
        const response = await axios.post(`${process.env.EXPRESS_BACKEND_URL}/api/agents/create`,{
            name,
            email,
            password,
            phoneNumber:phone
        },{
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer `
          }
        })

        if(!response.data.success){
            return new Response(JSON.stringify({sucess:false,message:response.data.message}),{
                headers:{
                    "Content-Type":"application/json",
                }
            })
        }

        return new Response(JSON.stringify({success:true,message:"New agent created successfully"}),{
            headers:{
                "Content-Type":"application/json"
            }
        })
    } catch (error:any) {
        console.log("Some error occured : ",error)
        return new Response(JSON.stringify({success:false,message:error?.message}),{
            headers:{
            "Content-Type":"application/json"
            }
        })
    }

}