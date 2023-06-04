import Link from "next/link";
import { Button } from "../../components/primitives/Button";
import { prisma } from "../prisma";

export default async function SuperAdminDashboard() {
  const companies = await prisma.company.findMany({
    where: {
      verificationStatus: "Pending",
    },
  });

  const contentAdmins = await prisma.contentAdmin.findMany();

  const acceptVerificationAction = async (data) => {
    "use server";
    const verificationAccept = await prisma.company.update({
      where: {
        id: Number(data.get("id")),
      },
      data: {
        verificationStatus: "Accepted",
        isVerified: true,
      },
    });
  };

  const rejectVerificationAction = async (data) => {
    "use server";
    const verificationReject = await prisma.company.update({
      where: {
        id: Number(data.get("id")),
      },
      data: {
        verificationStatus: "Rejected",
      },
    });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            SuperAdmin dashboard
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 rounded-md bg-white p-4 md:w-1/2">
          <h2 className="text-sm font-extrabold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Verification application
          </h2>
          <table className="table-auto  text-left text-sm sm:text-base md:text-lg">
            <thead className="border bg-orange-primary font-medium uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 ">
                  BIN
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {companies &&
                companies.map((company) => {
                  return (
                    <tr
                      key={company.id}
                      className="dark:bg-gray-800 dark:border-gray-700 border-b bg-white text-left"
                    >
                      <th
                        scope="row"
                        className=" whitespace-nowrap px-6 py-0 font-medium "
                      >
                        <Link
                          href={`/profile/company/${company.id}`}
                          className="hover:underline"
                        >
                          {company.company_name}
                        </Link>
                      </th>
                      <td className="px-6 py-4">{company.BIN}</td>
                      <td className="px-6 py-4">{company.contact}</td>
                      <td>
                        <form action={acceptVerificationAction}>
                          <input
                            readOnly
                            className="hidden"
                            name="id"
                            value={company.id}
                          />
                          <button
                            type="submit"
                            className="text-green-primary hover:underline"
                          >
                            Accept
                          </button>
                        </form>
                      </td>
                      <td>
                        <form action={rejectVerificationAction}>
                          <input
                            readOnly
                            className="hidden"
                            name="id"
                            value={company.id}
                          />
                          <button
                            type="submit"
                            className="text-red-primary hover:underline"
                          >
                            Reject
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 rounded-md bg-white p-4 md:w-1/2">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-sm font-extrabold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              Content Admins
            </h2>
            <Link href="/superadmin/create-admin">
              <Button variant="primary" type="button" className="h-fit">
                Create Content Admin
              </Button>
            </Link>
          </div>
          <table className="w-full table-auto text-left text-sm sm:text-base md:text-lg">
            <thead className="border bg-orange-primary font-medium uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="hidden px-6 py-3 md:inline-block">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {contentAdmins &&
                contentAdmins.map((admin) => {
                  return (
                    <tr key={admin.id}>
                      <th
                        scope="row"
                        className=" whitespace-nowrap px-6 py-0 font-medium "
                      >
                        {admin.firstName + " " + admin.secondName}
                      </th>
                      <td className="px-6 py-4">{admin.email}</td>
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
