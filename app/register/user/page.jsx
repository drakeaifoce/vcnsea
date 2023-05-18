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
        Role: "USER",
        password: await bcrypt.hash(data.get("password"), 10),
      },
    });

    redirect("/");
  };
  return (
    <>
      <Image
        alt="ocean"
        height={0}
        width={0}
        unoptimized
        src="/ocean_wide.jpg"
        className="h-20 w-full object-cover"
      />
      <div className="bg-orange">
        <form
          className="flex flex-col items-center gap-4 px-4 py-8 sm:gap-6 sm:px-6 md:gap-8 md:px-8 md:py-12 lg:gap-10 lg:px-10 lg:py-16"
          action={registerUserAction}
        >
          <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Dive into the vcnsea
          </h1>

          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            className="w-full"
            required
          />

          <Input
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            type="text"
            className="w-full"
            required
          />

          <Input
            id="secondName"
            name="secondName"
            placeholder="Enter your second name"
            type="text"
            className="w-full"
            required
          />

          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            className="w-full"
            required
          />

          <Button variant="primary" type="submit">
            Register
          </Button>
          <div className="text-lg">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
