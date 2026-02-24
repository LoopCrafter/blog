"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { signupSchema, signupSchemaType } from "@/src/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";

const page = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: signupSchemaType) {
    await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          create an account to get started with our awesome app!
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      placeholder="john@example.com"
                      aria-invalid={fieldState.invalid}
                      type="email"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      placeholder="Enter your password"
                      aria-invalid={fieldState.invalid}
                      type="password"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Button>Sign up</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default page;
