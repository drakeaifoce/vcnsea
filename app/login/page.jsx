import { signIn } from "next-auth/react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export default function Login() {
  const loginAction = async (data) => {
    "use server";
    const result = await signIn("credentials", {
      username: data.get("email"),
      password: data.get("password"),
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mt-20 lg:px-96">
        <form
          className="flex flex-col items-center gap-4 bg-sage-2 p-8 lg:mx-20"
          action={loginAction}
        >
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
          />
          <Button variant="secondary" type="submit">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
