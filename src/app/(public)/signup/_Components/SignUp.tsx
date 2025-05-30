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
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

export function ProfileForm() {

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

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form submitted with values:", values);
        setisSubmitting(true);
        try {
            console.log("Calling SignUp API with values:", values);
            const response = await axios.post("/api/sign-up", {
                email: values.email,
                password: values.password,
            });
            const data = response.data;
            if (!data.success) {
                // Handle known field-specific errors
                if (data.error?.toLowerCase().includes("email")) {
                    setEmailError(data.error);
                } else if (data.error?.toLowerCase().includes("password")) {
                    setPasswordError(data.error);
                } else {
                    toast.error(data.error || "Signup failed");
                }
                return;
            }

            // Success flow
            toast.success("SignUp successful!");
            form.reset();
            setEmailError("");
            setPasswordError("");
            router.push("/signin");

        } catch (error: any) {
            console.log("Error calling SignUp API");
            const apiError = error.response?.data?.error || error.message || "Something went wrong";
            if (apiError.toLowerCase().includes("email")) {
                setEmailError(apiError);
            } else if (apiError.toLowerCase().includes("password")) {
                setPasswordError(apiError);
            } else {
                toast.error(apiError);
            }
        } finally {
            setisSubmitting(false);
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-black/90 p-24 rounded-lg max-w-xl hover:shadow-[20px_-10px_10px_rgba(0,0,0,0.8)] transition-shadow duration-300 ease-in-out shadow-lg mx-auto mt-10 hover:scale-[1.02]">
                    <div className="flex items-center justify-center mb-6">
                        <p className="text-white mr-2 pt-4 font-bold">Signup to </p>
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
                                    {emailError || "Easily login with an email address."}
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
                                    {passwordError || "We keep your password secure and never share it with anyone."}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl cursor-pointer">
                        Submit
                    </Button>
                    <p className="text-white mt-4">Already have an account? <Link href="/signin" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Sign In</Link></p>
                </form>
            </Form>
        </motion.div>
    )
}
