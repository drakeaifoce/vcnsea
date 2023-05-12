import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/Button";
import { prisma } from "../../prisma";

export default async function VacancyPage({ params }) {
  const vacancy = await prisma.vacancy.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      floorSalary: true,
      ceilingSalary: true,
      title: true,
      description: true,
      location: true,
      company: {
        select: {
          id: true,
          firstName: true,
          secondName: true,
          position: true,
          email: true,
          company_name: true,
        },
      },
    },
  });
  return (
    <div className="container mx-auto">
      <div className="mx-72 flex flex-col gap-4 px-4">
        <section className="flex flex-row items-center justify-between">
          <Image
            src="/logo_placeholder.svg"
            unoptimized
            width={0}
            height={0}
            className="h-20 w-20 rounded-full"
          />
          <Button variant="primary">Подать заявку</Button>
        </section>
        <section className="flex flex-col">
          <Link
            href={`/company/${vacancy.company.id}`}
            className="text-sm font-normal text-sage-10 hover:underline"
          >
            {vacancy.company.company_name}
          </Link>
          <h1 className="text-xl font-normal text-sage-12">{vacancy.title}</h1>
        </section>
        <section className="grid grid-cols-3 ">
          <h6 className="cols-span-1 text-sm font-normal text-sage-10">
            {vacancy.company.position}
          </h6>
          <p className="cols-span-2 text-sm font-normal text-sage-12">
            {vacancy.company.firstName + " " + vacancy.company.secondName}
          </p>
        </section>
        <section className="grid grid-cols-3 ">
          <h6 className="cols-span-1 text-sm font-normal text-sage-10">
            Заработная плата
          </h6>
          <p className="cols-span-2  text-sm font-normal text-sage-12">
            {vacancy.floorSalary} - {vacancy.ceilingSalary}
          </p>
        </section>
        <section className="grid grid-cols-3">
          <h6 className="cols-span-1 text-sm font-normal text-sage-10">
            Локация
          </h6>
          <p className="cols-span-2 text-sm font-normal text-sage-12">
            {vacancy.location}
          </p>
        </section>
        <section className="grid grid-cols-3">
          <h6 className="text-sm font-normal text-sage-10">Описание</h6>
          <p className="text-sm font-normal text-sage-12">
            {vacancy.description}
          </p>
        </section>
      </div>
    </div>
  );
}
