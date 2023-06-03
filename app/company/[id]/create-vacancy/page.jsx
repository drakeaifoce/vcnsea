import { redirect } from "next/navigation";
import { Button } from "../../../../components/primitives/Button";
import { Input } from "../../../../components/primitives/Input";
import { Textfield } from "../../../../components/primitives/Textfield";
import { prisma } from "../../../prisma";

export default function CreateVacancy({ params }) {
  const createVacancyAction = async (data) => {
    "use server";
    console.log(data);
    const vacancy = await prisma.vacancy.create({
      data: {
        title: data.get("title"),
        floorSalary: Number(data.get("floorSalary")),
        ceilingSalary: Number(data.get("ceilingSalary")),
        location: data.get("location"),
        description: data.get("description"),
        companyId: Number(params.id),
      },
    });

    redirect(`/company/${params.id}`);
  };
  return (
    <>
      <div className="flex flex-col gap-8 py-8">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Create vacancy
        </h1>
        <form className="flex flex-col gap-6 px-4" action={createVacancyAction}>
          <Input
            id="title"
            name="title"
            placeholder="Python Backend Developer"
            type="text"
            className="w-full"
            label="Position name"
            required
          />
          <div className="flex flex-col">
            <section className="flex flex-col gap-8 md:flex-row">
              <Input
                id="floorSalary"
                name="floorSalary"
                placeholder="150000"
                type="text"
                className="w-full"
                label="Salary from"
                required
              />
              <Input
                id="ceilingSalary"
                name="ceilingSalary"
                placeholder="300000"
                type="text"
                className="w-full"
                label="To"
                required
              />
            </section>
          </div>
          <Input
            id="location"
            name="location"
            placeholder="Astana"
            type="text"
            className="w-full"
            label="Location"
            required
          />
          <Textfield
            id="description"
            name="description"
            placeholder="We need person, who ..."
            type="text"
            className="w-full"
            label="Description"
            required
          />
          <Button type="submit" variant="secondary">
            Create
          </Button>
        </form>
      </div>
    </>
  );
}
