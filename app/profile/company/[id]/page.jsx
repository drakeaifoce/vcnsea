import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../../components/Button";
import { prisma } from "../../../prisma";

export default async function CompanyProfile({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      Vacancies: {
        select: {
          id: true,
          title: true,
          location: true,
          createdAt: true,
        },
      },
    },
  });

  return (
    <>
      <div className="mx-72 flex flex-col gap-4 px-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-8">
            <Image
              alt={company.company_name}
              src={`https://ui-avatars.com/api/name=${company.company_name}`}
              unoptimized
              width={0}
              height={0}
              className="h-20 w-20 rounded-full"
            />
            <>
              <h1 className="text-xl font-medium text-black">
                {company.company_name}
              </h1>
              <h2 className="text-sage-11 text-sm font-normal">
                {company.city}
              </h2>
            </>
          </div>
        </div>
        <section className="grid grid-cols-3 ">
          <h6 className="cols-span-1 text-sage-10 text-sm font-normal">
            {company.position}
          </h6>
          <p className="cols-span-2 text-sage-12 text-sm font-normal">
            {company.firstName + " " + company.secondName}
          </p>
        </section>
        <section className="grid grid-cols-3 ">
          <h6 className="cols-span-1 text-sage-10 text-sm font-normal">
            Description
          </h6>
          <p className="cols-span-2 text-sage-12 text-sm font-normal">
            {company.description}
          </p>
        </section>
        <section className="grid grid-cols-3 ">
          <h6 className="cols-span-1 text-sage-10 text-sm font-normal">
            Contacts
          </h6>
          <p className="cols-span-2 text-sage-12 text-sm font-normal">
            {company.email}
          </p>
        </section>
        <secion className="flex flex-col gap-4">
          <h5 className="text-sage-12 text-base font-medium">
            Available positions
          </h5>
          <table className="text-sage-10 w-full table-auto text-left text-sm">
            <thead className=" bg-sage-6 text-sage-12 text-xs font-medium uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Post date
                </th>
              </tr>
            </thead>
            <tbody>
              {company.Vacancies.map((vacancy) => {
                return (
                  <tr
                    key={vacancy.id}
                    className="border-sage-6 bg-sage-2 border-b"
                  >
                    <th
                      scope="row"
                      className="text- text-sage-12 whitespace-nowrap px-6 py-4 font-medium"
                    >
                      <Link
                        href={`/vacancy/${vacancy.id}`}
                        className="hover:underline"
                      >
                        {vacancy.title}
                      </Link>
                    </th>
                    <td className="px-6 py-4">{vacancy.location}</td>
                    <td className="px-6 py-4">{vacancy.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </secion>
      </div>
    </>
  );
}
