import Link from "next/link";
import { Button } from "../../../../../components/primitives/Button";
import { prisma } from "../../../../prisma";

export default async function ManageCompany({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      id: Number(params.companyId),
    },
    include: {
      CompanyWorkers: true,
      Vacancies: true,
      Appointment: true,
    },
  });
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Dashboard | {company.company_name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 rounded-md bg-white p-4 md:w-1/3">
          <h2 className="text-sm font-extrabold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Insights
          </h2>
          <div className="flex flex-col gap-4">
            {company.CompanyWorkers ? (
              <p>Total workers: {company.CompanyWorkers.length}</p>
            ) : (
              ""
            )}
            {company.Vacancies ? (
              <p>Total vacancies: {company.Vacancies.length}</p>
            ) : (
              ""
            )}
            {company.Appointment ? (
              <p>Total appointments: {company.Appointment.length}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-md bg-white p-4 md:w-2/3">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-sm font-extrabold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              Workers
            </h2>
            <Link
              href={`/company-admin/${params.id}/manage-company/${params.companyId}/add-worker`}
            >
              <Button variant="primary" type="button" className="h-fit">
                Create worker
              </Button>
            </Link>
          </div>
          <table className="w-full table-auto text-left text-sm sm:text-base md:text-lg">
            <thead className="bg-orange-primary border font-medium uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="hidden px-6 py-3 md:inline-block">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Position
                </th>
              </tr>
            </thead>
            <tbody>
              {company.CompanyWorkers &&
                company.CompanyWorkers.map((worker) => {
                  return (
                    <tr key={worker.id}>
                      <th scope="row" className="px-6 py-4 font-medium">
                        {worker.firstName + " " + worker.secondName}
                      </th>
                      <td className="hidden px-6 py-4 md:inline-block">
                        {worker.email}
                      </td>
                      <td className="px-6 py-4">{worker.position}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
