import * as bcrypt from "bcrypt";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import prisma from "../prisma";

export default function Register() {
  const registerAction = async (data) => {
    "use server";
    console.log(data);
    const user = await prisma.user.create({
      data: {
        email: data.get("email"),
        firstName: data.get("firstName"),
        secondName: data.get("secondName"),
        Role: data.get("role"),
        password: await bcrypt.hash(data.get("password"), 10),
      },
    });
    const { password, ...result } = user;
    return result;
  };

  return (
    <div className="container mx-auto">
      <div className="mt-20 lg:px-96">
        <form
          className="flex flex-col items-center gap-4 bg-sage-2 p-8 lg:mx-20"
          action={registerAction}
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
          <label htmlFor="role" className="sr-only">
            For role
          </label>
          <select
            defaultValue="USER"
            id="role"
            name="role"
            className="block w-full rounded-md border-transparent bg-sage-3 px-4 py-2 text-base font-normal text-sage-12 outline-none hover:bg-sage-4 focus:border-transparent focus:bg-sage-5 focus:text-black focus:ring-0"
          >
            <option className="hidden">Я являюсь</option>
            <option value="USER" className="hover:bg-sage-4">
              Искателем
            </option>
            <option value="COMPANY" className="hover:bg-sage-4">
              Работодателем
            </option>
          </select>
          <Button variant="primary" type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}
