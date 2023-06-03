"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { Button } from "../../components/primitives/Button";
import { Input } from "../../components/primitives/Input";

export default function Login() {
  const emailField = useRef("");
  const passwordField = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: emailField.current,
      password: passwordField.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <Image
        alt="wave"
        height={0}
        width={0}
        unoptimized
        src="/wave_wide.jpg"
        className="h-20 w-full object-cover"
      />
      <div className="bg-orange-primary">
        <form className="flex flex-col items-center gap-4 px-4 py-8 sm:gap-6 sm:px-6 md:gap-8 md:px-8 md:py-12 lg:gap-10 lg:px-10 lg:py-16">
          <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Sign in account
          </h1>

          <label htmlFor="email" className="sr-only">
            For email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Enter you email"
            type="email"
            className="w-full"
            required
            onChange={(e) => (emailField.current = e.target.value)}
          />

          <label htmlFor="password" className="sr-only">
            For password
          </label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            className="w-full"
            required
            onChange={(e) => (passwordField.current = e.target.value)}
          />
          <Button variant="primary" type="button" onClick={onSubmit}>
            Sign in
          </Button>
          <div className="text-lg">
            Do not have an account yet?{" "}
            <Link href="/register" className="font-semibold hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
