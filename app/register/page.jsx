"use client";
import { redirect } from "next/navigation";
import { useRef } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export default function Register() {
  const emailField = useRef("");
  const passwordField = useRef("");

  const onSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailField.current,
        password: passwordField.current,
      }),
    });

    console.log(res);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-40 lg:px-96">
        <form
          className="flex flex-col items-center gap-4 bg-sage-2 p-8 lg:mx-20"
          onSubmit={onSubmit}
        >
          <h1 className="text-center text-2xl font-semibold text-teal-12">
            Погрузитесь в море <br /> вакансий
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

          <Button variant="primary" type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}
