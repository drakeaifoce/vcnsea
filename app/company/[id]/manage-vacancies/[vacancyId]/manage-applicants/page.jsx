import Link from "next/link";
import { prisma } from "../../../../../prisma";

export default async function ManageApplicants({ params }) {
  const vacancyWithApplications = await prisma.vacancy.findUnique({
    where: {
      id: Number(params.vacancyId),
    },
    select: {
      title: true,
      location: true,
      floorSalary: true,
      ceilingSalary: true,
      Applications: {
        select: {
          id: true,
          status: true,
          Student: {
            select: {
              id: true,
              firstName: true,
              secondName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <table className="w-full table-auto text-left text-sm text-sage-10">
        <thead className=" bg-sage-6 text-xs font-medium uppercase text-sage-12">
          <tr>
            <th scope="col" className="px-6 py-3">
              Имя
            </th>
            <th scope="col" className="px-6 py-3">
              Электронная почта
            </th>
            <th scope="col" className="px-6 py-3">
              Статус
            </th>
            <th scope="col" className="px-6 py-3">
              Ссылка
            </th>
          </tr>
        </thead>
        <tbody>
          {vacancyWithApplications.Applications.map((application) => {
            return (
              <tr
                key={application.id}
                className="border-b border-sage-6 bg-sage-2"
              >
                <th
                  scope="row"
                  className="text- whitespace-nowrap px-6 py-4 font-medium text-sage-12"
                >
                  <Link
                    href={`/profile/user/${application.Student.id}`}
                    className="hover:underline"
                  >
                    {application.Student.firstName +
                      " " +
                      application.Student.secondName}
                  </Link>
                </th>
                <td className="px-6 py-4">{application.Student.email}</td>
                <td className="px-6 py-4">{application.status}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/profile/user/${application.Student.id}`}
                    className="text-teal-11 hover:underline"
                  >
                    Посмотреть
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
