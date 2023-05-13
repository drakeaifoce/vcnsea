import { redirect } from "next/navigation";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { prisma } from "../../../prisma";

export default async function AddWorkExperience({ params }) {
  const addWorkExperienceAction = async (data) => {
    "use server";
    const workExperience = await prisma.workExperience.create({
      data: {
        studentId: Number(params.id),
        position: data.get("position"),
        company_name: data.get("company_name"),
        company_link: data.get("company_link"),
        city: data.get("city"),
        start_date: data.get("start_date"),
        end_date: data.get("end_date"),
        description: data.get("description"),
      },
    });

    redirect(`/user/${params.id}`);
  };
  return (
    <div>
      <form className="flex flex-col gap-9" action={addWorkExperienceAction}>
        <h1 className="text-xl font-medium text-black">
          Добавление опыта работы
        </h1>
        <Input
          id="position"
          name="position"
          placeholder="Frontend разработчик"
          label="Позиция"
          type="text"
          required
        />
        <div className="flex flex-row gap-4">
          <Input
            id="company_name"
            name="company_name"
            placeholder="Название компании"
            label="Название компании"
            type="text"
            required
          />
          <Input
            id="company_link"
            name="company_link"
            placeholder="Ссылка на компанию"
            label="Ссылка"
            type="text"
            required
          />
        </div>
        <Input
          id="city"
          name="city"
          placeholder="Локация"
          label="Астана"
          type="text"
          required
        />
        <div className="flex flex-row gap-4">
          <Input
            id="start_date"
            name="start_date"
            placeholder="Июнь, 2022"
            label="Дата начала"
            type="text"
            required
          />
          <Input
            id="end_date"
            name="end_date"
            placeholder="Март, 2023"
            label="Дата завершения"
            type="text"
            required
          />
        </div>
        <Input
          id="description"
          name="description"
          placeholder="Описание вашей работы"
          label="Описание"
          type="text"
          required
        />
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </form>
    </div>
  );
}
