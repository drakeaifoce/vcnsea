import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { prisma } from "./prisma";

export default async function Index() {
  const vacancies = await prisma.vacancy.findMany({
    include: {
      company: true,
    },
  });

  return (
    <div className="w-full">
      <section className="mb-8 flex flex-row">
        <form className="flex w-full flex-row gap-4">
          <label htmlFor="search" className="sr-only">
            For search
          </label>
          <Input
            id="search"
            name="search"
            placeholder="Погрузитесь в море вакансий"
            className="w-full"
          />
          <Button variant="secondary" type="submit">
            Найти
          </Button>
        </form>
      </section>

      <h1 className="mb-4 text-2xl font-medium text-sage-12">
        Доступно {vacancies.length} вакансий
      </h1>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vacancies.map((vacancy) => {
          return (
            <Link
              key={vacancy.id}
              href={`/vacancy/${vacancy.id}`}
              className="rounded-xl border border-sage-7 bg-sage-2"
            >
              <div key={vacancy.id} className="flex flex-col gap-3 p-4">
                <header className="flex flex-row justify-between">
                  <Image
                    src={`https://ui-avatars.com/api/name=${vacancy.company.company_name}`}
                    alt={vacancy.companyName}
                    className="h-6 w-6 rounded-full"
                    height={0}
                    width={0}
                    unoptimized
                  />
                  <p className="text-base font-normal text-sage-11">
                    {vacancy.company.company_name}, {vacancy.location}
                  </p>
                </header>
                <main className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium text-sage-12">
                    {vacancy.title}
                  </h3>
                  <p className="text-base font-medium text-sage-11">
                    {vacancy.floorSalary} ₸ - {vacancy.ceilingSalary} ₸
                  </p>
                </main>
                <footer className="flex flex-row flex-wrap gap-1.5">
                  <div className="rounded-3xl border border-sage-7 bg-sage-3 px-1.5 py-1 text-xs font-normal text-sage-11">
                    Полная занятость
                  </div>
                </footer>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";
