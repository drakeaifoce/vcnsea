import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../../components/Button";
import { prisma } from "../../../prisma";

export default async function CompanyProfile({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      Vacancies: {
        select: {
          id: true,
          title: true,
          location: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="mx-72 flex flex-col gap-4 px-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-8">
            <Image
              src={`https://ui-avatars.com/api/name=${company.company_name}`}
              unoptimized
              width={0}
              height={0}
              className="h-20 w-20 rounded-full"
            />
            <div>
              <h1 className="text-xl font-medium text-black">
                {company.company_name}
              </h1>
              <h2 className="text-sm font-normal text-sage-11">
                {company.city}
              </h2>
            </div>
          </div>
        </div>
        <section className="grid grid-cols-3 ">
          <h6 className="cols-span-1 text-sm font-normal text-sage-10">
            {company.position}
          </h6>
          <p className="cols-span-2 text-sm font-normal text-sage-12">
            {company.firstName + " " + company.secondName}
          </p>
        </section>
        <section className="grid grid-cols-3 ">
          <h6 className="cols-span-1 text-sm font-normal text-sage-10">
            Описание компании
          </h6>
          <p className="cols-span-2 text-sm font-normal text-sage-12">
            {company.description}
          </p>
        </section>
        <section className="grid grid-cols-3 ">
          <h6 className="cols-span-1 text-sm font-normal text-sage-10">
            Контакты
          </h6>
          <p className="cols-span-2 text-sm font-normal text-sage-12">
            {company.email}
          </p>
        </section>
        <secion className="flex flex-col gap-4">
          <h5 className="text-base font-medium text-sage-12">
            Доступные вакансии
          </h5>
          <table className="w-full table-auto text-left text-sm text-sage-10">
            <thead className=" bg-sage-6 text-xs font-medium uppercase text-sage-12">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Позиция
                </th>
                <th scope="col" className="px-6 py-3">
                  Локация
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Опубликована
                </th>
              </tr>
            </thead>
            <tbody>
              {company.Vacancies.map((vacancy) => {
                return (
                  <tr
                    key={vacancy.id}
                    className="border-b border-sage-6 bg-sage-2"
                  >
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
                    <td className="px-6 py-4">Вчера</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </secion>
      </div>
    </div>
  );
}
