import { redirect } from "next/navigation";
import { Button } from "../../../../components/primitives/Button";
import { Input } from "../../../../components/primitives/Input";
import { Textfield } from "../../../../components/primitives/Textfield";
import { prisma } from "../../../prisma";

export default function CreateCompany({ params }) {
  const createCompanyAction = async (data) => {
    "use server";
    const company = await prisma.company.create({
      data: {
        company_name: data.get("company_name"),
        BIN: data.get("BIN"),
        city: data.get("city"),
        description: data.get("description"),
        contact: data.get("contact"),
        companyAdminId: Number(params.id),
      },
    });

    redirect(`/company-admin/${params.id}/manage-company/${company.id}`);
  };
  return (
    <>
      <div className="bg-orange-primary">
        <form
          className="flex flex-col items-center gap-4 px-4 py-8 sm:gap-6 sm:px-6 md:gap-8 md:px-8 md:py-12 lg:gap-10 lg:px-10 lg:py-16"
          action={createCompanyAction}
        >
          <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Create company
          </h1>

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
            id="contact"
            name="contact"
            placeholder="Enter contact email"
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

          <Textfield
            id="description"
            name="description"
            placeholder="Enter short description of your company"
            type="text"
            className="w-full"
            required
          />

          <Button variant="primary" type="submit">
            Create
          </Button>
        </form>
      </div>
    </>
  );
}
