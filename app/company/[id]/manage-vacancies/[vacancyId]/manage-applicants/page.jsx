import Link from "next/link";
import { Button } from "../../../../../../components/Button";
import { prisma } from "../../../../../prisma";

export default async function ManageApplicants({ params }) {
  const vacancyWithApplications = await prisma.vacancy.findUnique({
    where: {
      id: Number(params.vacancyId),
    },
    select: {
      title: true,
      location: true,
      floorSalary: true,
      ceilingSalary: true,
      Applications: {
        select: {
          id: true,
          status: true,
          Student: {
            select: {
              id: true,
              firstName: true,
              secondName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  const rejectApplicantAction = async (data) => {
    "use server";
    const application = await prisma.application.update({
      where: {
        id: Number(data.get("id")),
      },
      data: {
        status: "Rejected",
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-medium text-black">Applicants list</h1>
        <Link href={`/company/${params.id}/interviews`}>
          <Button variant="primary" type="button">
            Scheduled interviews
          </Button>
        </Link>
      </div>
      <table className="w-full table-auto text-left text-sm text-sage-10">
        <thead className=" bg-sage-6 text-xs font-medium uppercase text-sage-12">
          <tr>
            <th scope="col" className="px-6 py-3">
              Fullname
            </th>
            <th scope="col" className="px-6 py-3">
              E-mail
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Link
            </th>
            <th scope="col" className="px-6 py-3">
              Interview
            </th>
            <th scope="col" className="px-6 py-3" />
          </tr>
        </thead>
        <tbody>
          {vacancyWithApplications.Applications.map((application) => {
            return (
              <tr
                key={application.id}
                className="border-b border-sage-6 bg-sage-2"
              >
                <th
                  scope="row"
                  className="text- whitespace-nowrap px-6 py-4 font-medium text-sage-12"
                >
                  <Link
                    href={`/profile/user/${application.Student.id}`}
                    className="hover:underline"
                  >
                    {application.Student.firstName +
                      " " +
                      application.Student.secondName}
                  </Link>
                </th>
                <td className="px-6 py-4">{application.Student.email}</td>
                <td className="px-6 py-4">{application.status}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/profile/user/${application.Student.id}`}
                    className="text-sage-11 hover:underline"
                  >
                    View
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {application.status === "Rejected" ||
                  application.status === "Accepted" ? (
                    <></>
                  ) : (
                    <Link
                      href={`/company/${params.id}/manage-vacancies/${params.vacancyId}/manage-applicants/appoint-interview/${application.Student.id}`}
                      className="text-teal-11 hover:underline"
                    >
                      Appoint
                    </Link>
                  )}
                </td>
                <td className="px-6 py-4">
                  {application.status === "Rejected" ? (
                    <></>
                  ) : (
                    <form action={rejectApplicantAction}>
                      <input
                        className="hidden"
                        value={application.id}
                        name="id"
                        id="id"
                        type="text"
                        readOnly
                      />
                      <button
                        className="text-red-11 hover:underline"
                        type="submit"
                      >
                        Reject
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
