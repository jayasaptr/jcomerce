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

  const handleLogin = (values) => {
    alert(`Email ${values.email} Password ${values.password}`);
  };

  return (
    <main className='container py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]'>
      <Form {...form}>
        <form
          className='w-full max-w-[540px] '
          onSubmit={form.handleSubmit(handleLogin)}>
          <Card>
            <CardHeader>
              <CardTitle>Wellcome Back!</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='email'
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
                name='password'
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
              <div className='flex items-center space-x-2'>
                <Checkbox
                  onCheckedChange={(checked) => setIsChecked(checked)}
                  id='show-password'
                />
                <Label htmlFor='show-password'>Show Password</Label>
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex flex-col space-y-4 w-full'>
                <Button type='submit'>Login</Button>
                <Button variant='link' className='w-full'>
                  Register
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
