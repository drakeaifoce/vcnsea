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

  const deleteVacancyAction = async (data) => {
    "use server";
    const deleted = await prisma.vacancy.delete({
      where: {
        id: Number(data.get("id")),
      },
    });
  };
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
        Manage vacancies
      </h1>
      <table className="w-full table-auto text-left text-sm sm:text-base md:text-lg">
        <thead className="border bg-orange-primary font-medium uppercase">
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
            <th scope="col" className="px-6 py-3 " />
          </tr>
        </thead>
        <tbody>
          {vacancies.map((vacancy, index) => {
            return (
              <tr
                key={vacancy.id}
                className={`border-b ${
                  index % 2 === 0 || index === 0 ? "bg-blue-1" : ""
                }`}
              >
                <th scope="row" className="px-6 py-4 font-medium">
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
                    className="text-purple-primary hover:underline"
                  >
                    View
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <form action={deleteVacancyAction}>
                    <input
                      readOnly
                      id="id"
                      name="id"
                      value={vacancy.id}
                      className="hidden"
                      type="text"
                    />
                    <button
                      type="submit"
                      className="text-red-primary hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
