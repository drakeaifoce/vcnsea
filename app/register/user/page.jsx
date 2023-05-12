import * as bcrypt from "bcrypt";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { prisma } from "../../prisma";

export default function RegisterUser() {
  const registerUserAction = async (data) => {
    "use server";
    const student = await prisma.student.create({
      data: {
        email: data.get("email"),
        firstName: data.get("firstName"),
        secondName: data.get("secondName"),
        password: await bcrypt.hash(data.get("password"), 10),
      },
    });

    redirect("/");
  };
  return (
    <>
      <Image
        height={0}
        width={0}
        unoptimized
        src="/ocean_wide.jpg"
        className="h-20 w-full object-cover"
      />
      <div className="container mx-auto h-screen">
        <div className="mt-8 lg:px-96">
          <form
            className="flex flex-col items-center gap-4 bg-sage-2 p-8 lg:mx-20"
            action={registerUserAction}
          >
            <h1 className="text-center text-2xl font-semibold text-teal-12">
              Погрузитесь в море <br /> вакансий
            </h1>

            <Input
              id="email"
              name="email"
              placeholder="Введите вашу электронную почту"
              type="email"
              className="w-full"
              required
            />

            <Input
              id="firstName"
              name="firstName"
              placeholder="Введите ваше имя"
              type="text"
              className="w-full"
              required
            />

            <Input
              id="secondName"
              name="secondName"
              placeholder="Введите вашу фамилию"
              type="text"
              className="w-full"
              required
            />

            <Input
              id="password"
              name="password"
              placeholder="Введите ваш пароль"
              type="password"
              className="w-full"
              required
            />

            <Button variant="primary" type="submit">
              Зарегистрироваться
            </Button>
            <div className="text-sm text-teal-12">
              Уже есть аккаунт таланта?{" "}
              <Link href="/login/user" className="font-semibold">
                Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
