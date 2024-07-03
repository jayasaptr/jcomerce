/** @format */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
  FormDescription,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";
import { Link } from "react-router-dom";

const registerFormShcema = z
  .object({
    email: z
      .string()
      .min(3, "email must be at least 3 characters or more")
      .email("Invalid email"),
    username: z
      .string()
      .min(3, "username must be at least 3 characters or more"),
    password: z
      .string()
      .min(8, "your password needs to be at least 8 characters or more"),
    confirmPassword: z
      .string()
      .min(8, "your password needs to be at least 8 characters or more"),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    if (password !== confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerFormShcema),
    reValidateMode: "onSubmit",
  });

  const handleRegister = async (values) => {
    const userResponse = await axiosInstance.get("/users", {
      params: {
        email: values.email,
      },
    });

    if (userResponse.data.length > 0) {
      form.setError("email", {
        type: "manual",
        message: "Email already exists",
      });
      return;
    }

    try {
      await axiosInstance.post("/users", {
        email: values.email,
        username: values.username,
        password: values.password,
      });

      alert("User created successfully");
      form.reset();
    } catch (error) {
      console.log("🚀 ~ handleRegister ~ error:", error);
    }
  };

  return (
    <main className="container py-8 flex flex-col justify-center items-center max-w-screen-md">
      <Form {...form}>
        <form
          className="w-full max-w-[540px] "
          onSubmit={form.handleSubmit(handleRegister)}
        >
          <Card>
            <CardHeader>
              <CardTitle>Create an account!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Make sure it's at least 8 characters including a number
                      and
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <Button type="submit">Register</Button>
                <Link className="w-full text-center" to="/login">
                  Login instead
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default RegisterPage;
