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
    },
  });
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-medium text-black">Interviews list</h1>
      <table className="w-full table-auto text-left text-sm text-sage-10">
        <thead className=" bg-sage-6 text-xs font-medium uppercase text-sage-12">
          <tr>
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
          {interviews.map((interview) => {
            return (
              <tr
                key={interview.id}
                className="border-b border-sage-6 bg-sage-2"
              >
                <th
                  scope="row"
                  className="text- whitespace-nowrap px-6 py-4 font-medium text-sage-12"
                >
                  <Link
                    className="hover:underline"
                    href={`/profile/user/${interview.studentId}`}
                  >
                    {interview.Student.firstName +
                      " " +
                      interview.Student.secondName}
                  </Link>
                </th>
                <td className="px-6 py-4">{interview.date}</td>
                <td className="px-6 py-4">{interview.time}</td>
                <td className="px-6 py-4">
                  <Link
                    href={interview.link}
                    className="text-teal-11 hover:underline"
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
