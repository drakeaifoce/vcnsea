import { redirect } from "next/navigation";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Textfield } from "../../../../components/Textfield";
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
      <div className="flex flex-col gap-8 bg-white">
        <h1 className="text-xl font-medium text-black">Manage vacancies</h1>

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
            <section className="flex flex-row gap-8">
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
