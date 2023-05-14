import * as bcrypt from "bcrypt";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { prisma } from "../../prisma";

export default function RegisterCompany() {
  const registerCompanyAction = async (data) => {
    "use server";
    const company = await prisma.company.create({
      data: {
        email: data.get("email"),
        firstName: data.get("firstName"),
        secondName: data.get("secondName"),
        position: data.get("position"),
        company_name: data.get("company_name"),
        BIN: data.get("BIN"),
        city: data.get("city"),
        description: data.get("description"),
        Role: "COMPANY",
        password: await bcrypt.hash(data.get("password"), 10),
      },
    });

    redirect("/");
  };
  return (
    <>
      <Image
        alt="sunrise"
        height={0}
        width={0}
        unoptimized
        src="/sunrise_wide.jpg"
        className="h-20 w-full object-cover"
      />
      <>
        <div className="mt-8 lg:px-96">
          <form
            className="flex flex-col items-center gap-4 bg-sage-2 p-8 lg:mx-20"
            action={registerCompanyAction}
          >
            <h1 className="text-center text-2xl font-semibold text-teal-12">
              Dive into talaents <br /> sea
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
              id="position"
              name="position"
              placeholder="Enter your position"
              type="text"
              className="w-full"
              required
            />

            <Input
              id="company_name"
              name="company_name"
              placeholder="Enter the name of your company"
              type="text"
              className="w-full"
              required
            />

            <Input
              id="BIN"
              name="BIN"
              placeholder="Enter BIN of your company"
              type="text"
              className="w-full"
              required
            />

            <Input
              id="city"
              name="city"
              placeholder="Enter location of your company"
              type="text"
              className="w-full"
              required
            />

            <Input
              id="description"
              name="description"
              placeholder="Enter short description of your company"
              type="text"
              className="w-full"
              required
            />

            <Input
              id="password"
              name="password"
              placeholder="Enter password"
              type="password"
              className="w-full"
              required
            />

            <Button variant="primary" type="submit">
              Register
            </Button>
            <div className="text-sm text-teal-12">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </>
    </>
  );
}
