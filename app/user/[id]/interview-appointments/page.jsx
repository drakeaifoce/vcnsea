import Link from "next/link";
import { prisma } from "../../../prisma";
import { dateFormater } from "../../../utils";

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
    <div className="flex flex-col gap-8 text-black">
      <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        Scheduled interviews
      </h1>
      <section className="my-4 grid grid-cols-1 gap-x-2 gap-y-4 md:my-6 md:grid-cols-1 md:gap-x-4 md:gap-y-6 lg:my-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-8 xl:my-10 xl:gap-x-8 xl:gap-y-10">
        {interviews.map((interview) => {
          return (
            <div key={interview.id} className="border bg-white">
              <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 xl:p-10">
                <header className="flex flex-col gap-2">
                  <Link
                    href={`/vacancy/${interview.Vacancy.id}`}
                    className="text-lg font-medium text-black hover:underline md:text-xl lg:text-2xl"
                  >
                    {interview.Vacancy.title}
                  </Link>
                  <Link
                    className="text-sage-11 text-base font-normal hover:underline"
                    href={`/profile/company/${interview.company.id}`}
                  >
                    {interview.company.company_name}
                  </Link>
                </header>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2">
                    <p className="text-sm font-normal md:text-base  lg:text-lg">
                      {interview.date}
                    </p>
                    <p className="text-sm font-normal md:text-base lg:text-lg">
                      {interview.time}
                    </p>
                  </div>
                  <Link
                    href={interview.link}
                    className="text-sm font-normal text-green-primary hover:underline md:text-base lg:text-lg"
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
