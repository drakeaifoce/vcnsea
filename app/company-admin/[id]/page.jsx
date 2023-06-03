import Link from "next/link";
import { Button } from "../../../components/primitives/Button";
import { prisma } from "../../prisma";

export default async function CompanyAdminDashboard({ params }) {
  const companyAdmin = await prisma.companyAdmin.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      Company: {
        select: {
          id: true,
          company_name: true,
          BIN: true,
          city: true,
        },
      },
    },
  });
  return (
    <>
      <div className=":sm:gap-6 flex flex-col gap-4 px-4 text-black md:gap-8 lg:gap-10">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Welcome to the company admin dashboard, {companyAdmin.firstName}
        </h1>
        <div className="flex flex-col gap-9 rounded-md bg-white p-4">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <h2 className="text-sm font-extrabold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              Companies
            </h2>
            <Link href={`/company-admin/${params.id}/create-company`}>
              <Button variant="primary" type="button">
                Create Company
              </Button>
            </Link>
          </div>
          {companyAdmin.Company && (
            <table className="  w-full text-left text-sm">
              <thead className="text-left text-xs uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BIN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {companyAdmin.Company.map((company) => {
                  return (
                    <tr
                      key={company.id}
                      className="dark:bg-gray-800 dark:border-gray-700 border-b bg-white"
                    >
                      <th
                        scope="row"
                        className=" whitespace-nowrap px-6 py-4 font-medium "
                      >
                        <Link
                          href={`/company-admin/${params.id}/manage-company/${company.id}`}
                          className="hover:underline"
                        >
                          {company.company_name}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{company.BIN}</td>
                      <td className="px-6 py-4">{company.city}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
