import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { Button } from "../../../../../../components/primitives/Button";
import { Input } from "../../../../../../components/primitives/Input";
import { prisma } from "../../../../../prisma";

export default async function CreateWorker({ params }) {
  const createWorkerAction = async (data) => {
    "use server";
    const companyWorker = await prisma.companyWorker.create({
      data: {
        firstName: data.get("firstName"),
        secondName: data.get("secondName"),
        email: data.get("email"),
        position: data.get("position"),
        password: await bcrypt.hash(data.get("password"), 10),
        companyId: Number(params.companyId),
        Role: "COMPANY_WORKER",
      },
    });
    redirect(`/company-admin/${params.id}/manage-company/${params.companyId}`);
  };
  return (
    <>
      <div className="bg-orange-primary">
        <form
          className="flex flex-col items-center gap-4 px-4 py-8 sm:gap-6 sm:px-6 md:gap-8 md:px-8 md:py-12 lg:gap-10 lg:px-10 lg:py-16"
          action={createWorkerAction}
        >
          <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Add worker
          </h1>

          <Input
            id="firstName"
            name="firstName"
            placeholder="Enter the first name of worker"
            type="text"
            className="w-full"
            required
          />

          <Input
            id="secondName"
            name="secondName"
            placeholder="Enter the second name of worker"
            type="text"
            className="w-full"
            required
          />

          <Input
            id="email"
            name="email"
            placeholder="Enter the email"
            type="text"
            className="w-full"
            required
          />

          <Input
            id="position"
            name="position"
            placeholder="Enter the position"
            type="text"
            className="w-full"
            required
          />

          <Input
            id="password"
            name="password"
            placeholder="Enter the password"
            type="password"
            className="w-full"
            required
          />

          <Button variant="primary" type="submit">
            Add
          </Button>
        </form>
      </div>
    </>
  );
}
