import Link from "next/link";
import { prisma } from "../../../prisma";

export default async function ManageVacancies({ params }) {
  const vacancies = await prisma.vacancy.findMany({
    where: {
      companyId: Number(params.id),
    },
  });
  return (
    <div>
      <table className="w-full table-auto text-left text-sm text-sage-10">
        <thead className=" bg-sage-6 text-xs font-medium uppercase text-sage-12">
          <tr>
            <th scope="col" className="px-6 py-3">
              Позиция
            </th>
            <th scope="col" className="px-6 py-3">
              Локация
            </th>
            <th scope="col" className="px-6 py-3">
              Зарплата от
            </th>
            <th scope="col" className="px-6 py-3">
              До
            </th>
            <th scope="col" className="px-6 py-3 ">
              Опубликована
            </th>
            <th scope="col" className="px-6 py-3 ">
              Респонденты
            </th>
            <th scope="col" className="px-6 py-3 ">
              Редактировать
            </th>
          </tr>
        </thead>
        <tbody>
          {vacancies.map((vacancy) => {
            return (
              <tr key={vacancy.id} className="border-b border-sage-6 bg-sage-2">
                <th
                  scope="row"
                  className="text- whitespace-nowrap px-6 py-4 font-medium text-sage-12"
                >
                  <Link
                    href={`/vacancy/${vacancy.id}`}
                    className="hover:underline"
                  >
                    {vacancy.title}
                  </Link>
                </th>
                <td className="px-6 py-4">{vacancy.location}</td>
                <td className="px-6 py-4">{vacancy.floorSalary}</td>
                <td className="px-6 py-4">{vacancy.ceilingSalary}</td>
                <td className="px-6 py-4">Вчера</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/company/${params.id}/manage-vacancies/${vacancy.id}/manage-applicants`}
                    className="text-teal-11 hover:underline"
                  >
                    Посмотреть
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/company/${params.id}/manage-vacancies/${vacancy.id}`}
                    className="text-sage-11 hover:underline"
                  >
                    Изменить
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
