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

export default async function AppliedVacancies({ params }) {
  const applications = await prisma.application.findMany({
    where: {
      studentId: Number(params.id),
    },
    select: {
      id: true,
      status: true,
      Student: false,
      studentId: false,
      vacancyId: false,
      Vacancy: {
        select: {
          id: true,
          title: true,
          createdAt: true,
          location: true,
          company: {
            select: {
              id: true,
              company_name: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="text-xl font-medium text-black">Applied vacancies</h1>
      <section className="grid grid-cols-3 gap-4">
        {applications.map((application) => {
          return (
            <div
              key={application.id}
              className="rounded-xl border border-sage-7 bg-sage-2"
            >
              <div className="flex flex-col gap-4 p-4">
                <header className="flex flex-row items-start justify-between">
                  <div className="flex flex-col">
                    <Link
                      href={`/vacancy/${application.Vacancy.id}`}
                      className="text-lg font-medium text-black hover:underline"
                    >
                      {application.Vacancy.title}
                    </Link>
                    <p className="text-sm font-normal text-sage-11">
                      {dateFormater(application.Vacancy.createdAt, "-")}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      className="text-lg font-medium text-sage-12 hover:underline"
                      href={`/profile/company/${application.Vacancy.company.id}`}
                    >
                      {application.Vacancy.company.company_name}
                    </Link>
                    <p className="text-sm font-normal text-sage-11">
                      {application.Vacancy.location}
                    </p>
                  </div>
                </header>
                <section>
                  <p className="rounded-lg bg-teal-6 p-4 text-sm font-normal text-sage-11">
                    Status: {application.status}
                  </p>
                </section>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
