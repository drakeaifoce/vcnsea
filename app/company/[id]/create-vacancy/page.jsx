import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";

export default function CreateVacancy(params) {
  const createVacancyAction = async (data) => {
    "use server";
    console.log(data);
  };
  return (
    <div className="container mx-auto">
      <div className="mx-40 bg-white">
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
          <div className="flex flex-col gap-1">
            <h5 className="text-base font-medium">Заработная плата</h5>
            <div className="flex flex-row gap-8">
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
            </div>
          </div>

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
    </div>
  );
}
