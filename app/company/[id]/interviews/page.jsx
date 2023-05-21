import Link from "next/link";
import { prisma } from "../../../prisma";

export default async function Interviews({ params }) {
  const interviews = await prisma.appointment.findMany({
    where: {
      companyId: Number(params.id),
    },
    select: {
      id: true,
      date: true,
      time: true,
      link: true,
      Student: {
        select: {
          firstName: true,
          secondName: true,
        },
      },
      company: false,
      studentId: true,
      companyId: false,
      Vacancy: {
        select: {
          id: true,
          title: true,
        },
      },
      vacancyId: true,
    },
  });
  return (
    <div className=":sm:gap-6 flex flex-col gap-4 px-4 text-black md:gap-8 lg:gap-10">
      <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
        Interviews list
      </h1>
      <table className="w-full table-auto text-left text-sm sm:text-base md:text-lg">
        <thead className="border bg-orange-primary font-medium uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Candidate
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Meeting link
            </th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview, index) => {
            return (
              <tr
                key={interview.id}
                className={`border-b ${
                  index % 2 === 0 || index === 0 ? "bg-blue-1" : ""
                }`}
              >
                <th scope="row" className="px-6 py-4 font-medium">
                  <Link
                    href={`/vacancy/${interview.Vacancy.id}`}
                    className=" hover:underline"
                  >
                    {interview.Vacancy.title}
                  </Link>
                </th>
                <td className="px-6 py-4">
                  <Link
                    className="hover:underline"
                    href={`/profile/user/${interview.studentId}`}
                  >
                    {interview.Student.firstName +
                      " " +
                      interview.Student.secondName}
                  </Link>
                </td>
                <td className="px-6 py-4">{interview.date}</td>
                <td className="px-6 py-4">{interview.time}</td>
                <td className="px-6 py-4">
                  <Link
                    href={interview.link}
                    className="text-blue-8 hover:underline"
                  >
                    Enter
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
