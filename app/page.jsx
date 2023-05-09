import Image from "next/image";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const metadata = {
  title: "vcnsea",
  description: "Web-application for students to find vacancies",
}

export default async function Index() {
  return (
    <div className="container mx-auto px-4">
      {/* search */}
      <section className="flex flex-row mb-8">
        <form className="flex flex-row w-full gap-4">
          <Input
            id="search"
            name="search"
            placeholder="Погрузитесь в море вакансий"
            className="w-full"
          />
          <label htmlFor="search" className="sr-only">
            For search
          </label>
          <Button variant="secondary" type="submit">
            Найти
          </Button>
        </form>
      </section>

      <h1 className="text-sage-12 font-medium text-2xl mb-4">
        Доступно 228 вакансий
      </h1>

      {/* cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border border-sage-7 bg-sage-2 rounded-xl">
          <div className="flex flex-col gap-3 p-4">
            <header className="flex flex-row justify-between">
              <Image
                src="/kaspi.png"
                alt="company-name"
                className="rounded-full"
                height={24}
                width={24}
              />
              <p className="text-sage-11 text-base font-normal">
                Kaspi.kz, Алматы
              </p>
            </header>
            <main className="flex flex-col gap-1">
              <h3 className="text-xl font-medium text-sage-12">
                TypeScript разработчик
              </h3>
              <p className="text-base font-medium text-sage-11">
                150 000 - 200 000 ₸
              </p>
            </main>
            <footer className="flex flex-row flex-wrap gap-1.5">
              <div className="bg-sage-3 border border-sage-7 rounded-3xl py-1 px-1.5 text-sage-11 font-normal text-xs">
                Полная занятость
              </div>
            </footer>
          </div>
        </div>
        <div className="border border-sage-7 bg-sage-2 rounded-xl">
          <div className="flex flex-col gap-3 p-4">
            <header className="flex flex-row justify-between">
              <Image
                src="/kaspi.png"
                alt="company-name"
                className="rounded-full"
                height={24}
                width={24}
              />
              <p className="text-sage-11 text-base font-normal">
                Kaspi.kz, Алматы
              </p>
            </header>
            <main className="flex flex-col gap-1">
              <h3 className="text-xl font-medium text-sage-12">
                TypeScript разработчик
              </h3>
              <p className="text-base font-medium text-sage-11">
                150 000 - 200 000 ₸
              </p>
            </main>
            <footer className="flex flex-row flex-wrap gap-1.5">
              <div className="bg-sage-3 border border-sage-7 rounded-3xl py-1 px-1.5 text-sage-11 font-normal text-xs">
                Полная занятость
              </div>
            </footer>
          </div>
        </div>
        <div className="border border-sage-7 bg-sage-2 rounded-xl">
          <div className="flex flex-col gap-3 p-4">
            <header className="flex flex-row justify-between">
              <Image
                src="/kaspi.png"
                alt="company-name"
                className="rounded-full"
                height={24}
                width={24}
              />
              <p className="text-sage-11 text-base font-normal">
                Kaspi.kz, Алматы
              </p>
            </header>
            <main className="flex flex-col gap-1">
              <h3 className="text-xl font-medium text-sage-12">
                TypeScript разработчик
              </h3>
              <p className="text-base font-medium text-sage-11">
                150 000 - 200 000 ₸
              </p>
            </main>
            <footer className="flex flex-row flex-wrap gap-1.5">
              <div className="bg-sage-3 border border-sage-7 rounded-3xl py-1 px-1.5 text-sage-11 font-normal text-xs">
                Полная занятость
              </div>
            </footer>
          </div>
        </div>
        <div className="border border-sage-7 bg-sage-2 rounded-xl">
          <div className="flex flex-col gap-3 p-4">
            <header className="flex flex-row justify-between">
              <Image
                src="/kaspi.png"
                alt="company-name"
                className="rounded-full"
                height={24}
                width={24}
              />
              <p className="text-sage-11 text-base font-normal">
                Kaspi.kz, Алматы
              </p>
            </header>
            <main className="flex flex-col gap-1">
              <h3 className="text-xl font-medium text-sage-12">
                TypeScript разработчик
              </h3>
              <p className="text-base font-medium text-sage-11">
                150 000 - 200 000 ₸
              </p>
            </main>
            <footer className="flex flex-row flex-wrap gap-1.5">
              <div className="bg-sage-3 border border-sage-7 rounded-3xl py-1 px-1.5 text-sage-11 font-normal text-xs">
                Полная занятость
              </div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";
