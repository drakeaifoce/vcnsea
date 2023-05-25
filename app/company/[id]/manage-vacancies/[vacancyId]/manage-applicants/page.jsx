import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../../../../../../components/Button";
import { prisma } from "../../../../../prisma";

export default async function ManageApplicants({ params }) {
  const vacancyWithApplications = await prisma.vacancy.findUnique({
    where: {
      id: Number(params.vacancyId),
    },
    select: {
      id: true,
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
        orderBy: {
          id: "desc",
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
    redirect(
      `/company/${params.id}/manage-vacancies/${params.vacancyId}/manage-applicants`,
    );
  };

  return (
    <div className=":sm:gap-6 flex flex-col gap-4 px-4 text-black md:gap-8 lg:gap-10">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Applicants list for{" "}
          <Link
            href={`/vacancy/${params.vacancyId}`}
            className="text-green-focus hover:underline"
          >
            {vacancyWithApplications.title}
          </Link>
        </h1>
        <Link href={`/company/${params.id}/interviews`}>
          <Button variant="primary" type="button">
            Scheduled interviews
          </Button>
        </Link>
      </div>
      <table className="w-full table-auto text-left text-sm sm:text-base md:text-lg">
        <thead className="border bg-orange-primary font-medium uppercase">
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
          {vacancyWithApplications.Applications.map((application, index) => {
            return (
              <tr
                key={application.id}
                className={`border-b ${
                  index % 2 === 0 || index === 0 ? "bg-blue-1" : ""
                }`}
              >
                <th scope="row" className="px-6 py-4 font-medium">
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
                    className="text-purple-primary hover:underline"
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
                      className="text-green-primary hover:underline"
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
                        className="text-red-primary hover:underline"
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
