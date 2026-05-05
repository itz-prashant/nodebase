"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const registerSchema = z.object({
  email: z.string().email("Please enter valid email."),
  password: z.string().min(1, "Password is required"),
  confirmPassWord: z.string()
})
.refine((data)=> data.password === data.confirmPassWord, {
    message: "Password don't match",
    path: ["confirmPassWord"]
});

type registerFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
    const router = useRouter()

  const form = useForm<registerFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassWord:""
    },
  });

  const onSubmit = async (values: registerFormValues) => {
    await authClient.signUp.email(
        {
          name: values.email,
          email: values.email,
          password: values.password,
          callbackURL: '/' 
        },
        {
            onSuccess:()=>{
                router.push("/")
            },
            onError:(ctx)=>{
                toast.error(ctx.error.message)
            }
        }
    )
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={isPending}
                >
                    <Image
                      src={"/logos/github.svg"}
                      alt="Github"
                      width={20}
                      height={20}
                    />
                  Continue with Github
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={isPending}
                >
                    <Image
                      src={"/logos/google.svg"}
                      alt="Github"
                      width={20}
                      height={20}
                    />
                  Continue with Google
                </Button>
              </div>

              <div>
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="example@gmail.com"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                          {...field}
                          type="password"
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="**********"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="confirmPassWord"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                        <Input
                          {...field}
                          type="password"
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="**********"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button className="w-full" disabled={isPending}>
                    Login
                  </Button>
                </FieldGroup>
              </div>
              <div className="text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
