"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema, FormSchema } from "@/schema/formSchema"
import React from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import Link from "next/link"

export function SignInForm() {

    const [emailError, setEmailError] = React.useState("")
    const [passwordError, setPasswordError] = React.useState("")
    const [isSubmitting, setisSubmitting] = React.useState(false)
    const router = useRouter();

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // submit handler for signin form
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form submitted with values:", values)
        setisSubmitting(true)
        try {
            console.log("Calling SignIp API with values:", values)
            const response = await axios.post("/api/sign-in", {
                email: values.email,
                password: values.password
            },{withCredentials: true})

            console.log("Response from SignIp API:", response.data)
            const data = response.data
            if (!data.success) {
                console.log("API returned error: ", data.error)
                if (data.error.includes("email")) {
                    setEmailError(data.error)
                } else if (data.error.includes("password")) {
                    setPasswordError(data.error)
                }
            } else {
                toast.success("SignIn successful")
                form.reset()
                setEmailError("")
                setPasswordError("")
                router.push("/homepage");
            }

        } catch (error: any) {
            console.log("Error calling SignIn API:", error.message)
            const apiError = error.response?.data?.error;
            if (typeof apiError === "string") {
                if (apiError.includes("email")) {
                    setEmailError(apiError);
                } else if (apiError.includes("password")) {
                    setPasswordError(apiError);
                } else {
                    console.error("Unhandled API error:", apiError);
                }
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setisSubmitting(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-black/90 p-24 rounded-lg max-w-xl hover:shadow-[20px_-10px_10px_rgba(0,0,0,0.8)] transition-shadow duration-300 ease-in-out shadow-lg mx-auto mt-10 hover:scale-[1.02]">
                <div className="flex items-center justify-center mb-6">
                    <p className="text-white mr-2 pt-4 font-bold">SignIn to </p>
                    <div className="flex-shrink-0 group">
                        <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-2xl tracking-tight group-hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                            Agents
                            <span className="inline-block w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ml-1 animate-pulse"></span>
                        </h1>
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                                <Input className="text-white" placeholder="typesomething@gmail.com" {...field} />
                            </FormControl>
                            <FormDescription className={emailError ? "text-red-500" : "text-gray-400"}>
                                {emailError || "Nice to have you back admin, please login with your email."}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Password</FormLabel>
                            <FormControl>
                                <Input className="text-white hover:border-gradient-to-r from-purple-600 to-blue-600" placeholder="********" {...field} />
                            </FormControl>
                            <FormDescription className={passwordError ? "text-red-500" : "text-gray-400"}>
                                {passwordError || "Enter your password."}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl cursor-pointer">
                    {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
                <p className="text-white mt-4">Don't have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Sign Up</Link></p>
            </form>
        </Form>
        </motion.div>
    )
}
