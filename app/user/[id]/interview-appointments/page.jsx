import Link from "next/link";
import { prisma } from "../../../prisma";

export default async function InterviewAppointments({ params }) {
  const interviews = await prisma.appointment.findMany({
    where: {
      studentId: Number(params.id),
    },
    select: {
      id: true,
      date: true,
      time: true,
      link: true,
      company: {
        select: {
          id: true,
          company_name: true,
        },
      },
      Vacancy: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-medium text-black">Scheduled interviews</h1>
      <section className="grid grid-cols-4 gap-4">
        {interviews.map((interview) => {
          return (
            <div
              key={interview.id}
              className="rounded-xl border border-sage-7 bg-sage-2"
            >
              <div className="flex flex-col gap-4 p-4">
                <header className="flex flex-col gap-2">
                  <Link
                    href={`/vacancy/${interview.Vacancy.id}`}
                    className="text-lg font-medium text-black hover:underline"
                  >
                    {interview.Vacancy.title}
                  </Link>
                  <Link
                    className="text-sm font-normal text-sage-11 hover:underline"
                    href={`/profile/company/${interview.company.id}`}
                  >
                    {interview.company.company_name}
                  </Link>
                </header>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2">
                    <p className="text-sm font-normal text-sage-11">
                      {interview.date}
                    </p>
                    <p className="text-sm font-normal text-sage-11">
                      {interview.time}
                    </p>
                  </div>
                  <Link
                    href={interview.link}
                    className="text-sm font-normal text-teal-10 hover:underline"
                  >
                    Join meeting
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
