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
import { useDispatch } from "react-redux";
import { GuestPage } from "@/components/guard/GuestPage";

const loginFormShcema = z.object({
  email: z
    .string()
    .min(3, "email must be at least 3 characters or more")
    .email("Invalid email"),
  password: z
    .string()
    .min(8, "your password needs to be at least 8 characters or more"),
});

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormShcema),
    reValidateMode: "onSubmit",
  });

  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          email: values.email,
        },
      });

      if (userResponse.data.length === 0) {
        form.setError("email", {
          type: "manual",
          message: "Email not found",
        });

        return;
      }

      if (userResponse.data.length > 0) {
        const user = userResponse.data[0];
        if (user.password !== values.password) {
          form.setError("password", {
            type: "manual",
            message: "Password not match",
          });

          return;
        }
      }

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data[0].username,
          email: userResponse.data[0].email,
          id: userResponse.data[0].id,
          role: userResponse.data[0].role,
        },
      });

      localStorage.setItem("current-user", userResponse.data[0].id);

      form.reset();
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
    }
  };

  return (
    <GuestPage>
      <main className="container py-8 flex flex-col justify-center items-center max-w-screen-md min-h-[80vh]">
        <Form {...form}>
          <form
            className="w-full max-w-[540px] "
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Wellcome Back!</CardTitle>
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={isChecked ? "text" : "password"}
                        />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={(checked) => setIsChecked(checked)}
                    id="show-password"
                  />
                  <Label htmlFor="show-password">Show Password</Label>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                  <Button type="submit">Login</Button>
                  <Link className="w-full text-center" to="/register">
                    Register
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};

export default LoginPage;
