import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../../components/primitives/Button";
import { prisma } from "../../../prisma";
import { dateFormater } from "../../../utils";

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
      <div className=":sm:gap-6 flex flex-col gap-4 px-4 text-black md:gap-8 lg:gap-10">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-8">
            <Image
              alt={company.company_name}
              src={`https://ui-avatars.com/api/?background=BBB9BA&color=090909&name=${company.company_name}`}
              unoptimized
              width={0}
              height={0}
              className="h-20 w-20 rounded-full"
            />
            <>
              <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                {company.company_name}
              </h1>
              <h2 className="text-sm font-normal md:text-base lg:text-lg">
                {company.city}
              </h2>
            </>
          </div>
        </div>
        <section className="grid grid-cols-2 text-sm md:grid-cols-3  md:text-base lg:text-lg">
          <h6 className="cols-span-1 font-medium ">{company.position}</h6>
          <p className="cols-span-1 md:cols-span-2 font-normal ">
            {company.firstName + " " + company.secondName}
          </p>
        </section>
        <section className="grid grid-cols-2 text-sm md:grid-cols-3  md:text-base lg:text-lg">
          <h6 className="cols-span-1 font-medium ">Description</h6>
          <p className="cols-span-1 md:cols-span-2 font-normal ">
            {company.description}
          </p>
        </section>
        <section className="grid grid-cols-2 text-sm md:grid-cols-3  md:text-base lg:text-lg">
          <h6 className="cols-span-1 font-medium ">Contacts</h6>
          <p className="cols-span-1 md:cols-span-2 font-normal ">
            {company.email}
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h5 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
            Available positions
          </h5>
          <table className="w-full table-auto text-left text-sm sm:text-base md:text-lg">
            <thead className="border bg-orange-primary font-medium uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="hidden px-6 py-3 md:inline-block">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Post date
                </th>
              </tr>
            </thead>
            <tbody>
              {company.Vacancies.map((vacancy, index) => {
                return (
                  <tr
                    key={vacancy.id}
                    className={`border-b ${
                      index % 2 === 0 || index === 0 ? "bg-blue-1" : ""
                    }`}
                  >
                    <th scope="row" className="px-6 py-4 font-medium">
                      <Link
                        href={`/vacancy/${vacancy.id}`}
                        className="hover:underline"
                      >
                        {vacancy.title}
                      </Link>
                    </th>
                    <td className="hidden px-6 py-4 md:inline-block">
                      {vacancy.location}
                    </td>
                    <td className="px-6 py-4">
                      {dateFormater(vacancy.createdAt, "-")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
