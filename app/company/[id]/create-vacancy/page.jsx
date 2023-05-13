import { redirect } from "next/navigation";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
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
      <div className="bg-white">
        <form className="flex flex-col gap-6 px-4" action={createVacancyAction}>
          <Input
            id="title"
            name="title"
            placeholder="Python Backend разработчик"
            type="text"
            className="w-full"
            label="Название позиции"
            required
          />
          <div className="flex flex-col">
            <h5 className="text-base font-normal text-sage-12">
              Заработная плата
            </h5>
            <section className="flex flex-row gap-8">
              <Input
                id="floorSalary"
                name="floorSalary"
                placeholder="150000"
                type="text"
                className="w-full"
                label="От"
                required
              />
              <Input
                id="ceilingSalary"
                name="ceilingSalary"
                placeholder="300000"
                type="text"
                className="w-full"
                label="До"
                required
              />
            </section>
          </div>
          <Input
            id="location"
            name="location"
            placeholder="Астана"
            type="text"
            className="w-full"
            label="Локация"
            required
          />
          <Input
            id="description"
            name="description"
            placeholder="В нашу команду требуется человек..."
            type="text"
            className="w-full"
            label="Описание вакансии"
            required
          />
          <Button type="submit" variant="secondary">
            Создать
          </Button>
        </form>
      </div>
    </>
  );
}
