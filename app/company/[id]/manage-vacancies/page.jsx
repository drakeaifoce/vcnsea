import Link from "next/link";
import { prisma } from "../../../prisma";

function dateFormater(date, separator) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return day + separator + month + separator + year;
}

export default async function ManageVacancies({ params }) {
  const vacancies = await prisma.vacancy.findMany({
    where: {
      companyId: Number(params.id),
    },
  });
  return (
    <>
      <table className="w-full table-auto text-left text-sm text-sage-10">
        <thead className=" bg-sage-6 text-xs font-medium uppercase text-sage-12">
          <tr>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Salary from
            </th>
            <th scope="col" className="px-6 py-3">
              To
            </th>
            <th scope="col" className="px-6 py-3 ">
              Post date
            </th>
            <th scope="col" className="px-6 py-3 ">
              Applicants
            </th>
            <th scope="col" className="px-6 py-3 ">
              Edit
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
                <td className="px-6 py-4">
                  {dateFormater(vacancy.createdAt, "-")}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/company/${params.id}/manage-vacancies/${vacancy.id}/manage-applicants`}
                    className="text-teal-11 hover:underline"
                  >
                    View
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/company/${params.id}/manage-vacancies/${vacancy.id}`}
                    className="text-sage-11 hover:underline"
                  >
                    Edit
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
