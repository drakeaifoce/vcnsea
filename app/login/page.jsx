"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

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
        height={0}
        width={0}
        unoptimized
        src="/wave_wide.jpg"
        className="h-20 w-full object-cover"
      />
      <div className="mt-20 lg:px-96">
        <form className="flex flex-col items-center gap-4 bg-sage-2 p-8 lg:mx-20">
          <h1 className="text-center text-2xl font-semibold text-teal-12">
            Войти в аккаунт
          </h1>

          <label htmlFor="email" className="sr-only">
            For email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Введите вашу электронную почту"
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
            placeholder="Введите ваш пароль"
            type="password"
            className="w-full"
            required
            onChange={(e) => (passwordField.current = e.target.value)}
          />
          <Button variant="secondary" type="button" onClick={onSubmit}>
            Войти
          </Button>
        </form>
      </div>
    </>
  );
}
