import Link from "next/link";
import { prisma } from "../../../prisma";
import { dateFormater } from "../../../utils";

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
      <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        Applied vacancies
      </h1>
      <section className="my-4 grid grid-cols-1 gap-x-2 gap-y-4 md:my-6 md:grid-cols-1 md:gap-x-4 md:gap-y-6 lg:my-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-8 xl:my-10 xl:gap-x-8 xl:gap-y-10">
        {applications.map((application) => {
          return (
            <div key={application.id} className="border bg-white">
              <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 xl:p-10">
                <header className="flex flex-row justify-between">
                  <Link
                    href={`/vacancy/${application.Vacancy.id}`}
                    className="w-3/4 text-sm font-bold uppercase hover:underline sm:w-fit sm:text-base md:w-full md:text-lg"
                  >
                    {application.Vacancy.title}
                  </Link>
                </header>
                <main className="flex flex-row items-center justify-between">
                  <address className="w-fit border border-black bg-green-primary/80  px-2.5 py-2 text-xs font-normal md:text-base lg:px-5 lg:py-4 lg:text-lg">
                    {dateFormater(application.Vacancy.createdAt, "-")}
                  </address>
                  <address className="text-sm md:text-base lg:text-lg">
                    <Link
                      className="hover:underline"
                      href={`/profile/company/${application.Vacancy.company.id}`}
                    >
                      {application.Vacancy.company.company_name}
                    </Link>
                    , {application.Vacancy.location}
                  </address>
                </main>
                <section
                  className={`flex justify-center border border-black ${
                    application.status === "Pending"
                      ? "bg-yellow-primary"
                      : (application.status === "Rejected"
                      ? "bg-red-primary/80"
                      : "bg-green-primary")
                  }  px-2.5 py-2 text-xs font-normal md:text-base lg:px-5 lg:py-4 lg:text-lg`}
                >
                  Status: {application.status}
                </section>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
