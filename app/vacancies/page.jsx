"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "../../components/primitives/Badge";
import { Button } from "../../components/primitives/Button";
import { Input } from "../../components/primitives/Input";
import { employment, technologies } from "../consts";
import { numberWithSpaces } from "../utils";

export default function Index() {
  const [vacancies, setVacancies] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [minumuSalaryFilter, setMinimumSalaryFilter] = useState("");

  const [tech, setTech] = useState("");
  const [emp, setEmp] = useState("");

  const router = useRouter();
  const onSearch = () => {
    if (typeof searchQuery !== "string") {
      return;
    }
    const encodedSearchQuery = encodeURI(searchQuery);
    const encodedMinimumSalary = encodeURI(minumuSalaryFilter);
    const encodedTech = encodeURI(tech);
    const encodedEmp = encodeURI(emp);
    getVacancies({
      encodedSearchQuery,
      encodedMinimumSalary,
      encodedTech,
      encodedEmp,
    });
    router.refresh();
  };

  const getVacancies = useCallback(async (queries) => {
    const res = await fetch(
      `/api/search?${
        queries && queries.encodedSearchQuery
          ? "search=" + queries.encodedSearchQuery + "&"
          : ""
      }${
        queries && queries.encodedMinimumSalary
          ? "minimumSalary=" + queries.encodedMinimumSalary + "&"
          : ""
      }${
        queries && queries.encodedTech
          ? "technology=" + queries.encodedTech + "&"
          : ""
      }${
        queries && queries.encodedEmp ? "employment=" + queries.encodedEmp : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (res.ok) {
      const body = await res.json();
      setVacancies(body);
    }
  }, []);

  useEffect(() => {
    getVacancies();
  }, [getVacancies]);

  return (
    <div className="text-black">
      <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        Dive into the sea of vacancies
      </h1>
      <div className="flex flex-row items-center gap-4">
        <Input
          value={searchQuery}
          className="my-4 w-full lg:my-8 xl:my-10"
          placeholder="Search for vacancy"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" className="h-fit" onClick={onSearch}>
          Search
        </Button>
      </div>

      <div className="my-4 flex flex-col gap-x-4 gap-y-4 md:flex-row  md:gap-x-6 lg:my-8 lg:gap-x-8 xl:my-10 xl:gap-x-10">
        <section className="max-h-fit">
          <div className="bg-orange-primary border p-4 md:p-6 lg:p-8 xl:p-10">
            <div className="flex flex-col items-end gap-1">
              <Input
                label="Minimum salary"
                placeholder="Set minimum salary"
                value={minumuSalaryFilter}
                onChange={(e) => setMinimumSalaryFilter(e.target.value)}
              />
              <select
                id="employment"
                name="employment"
                onChange={(e) => setEmp(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
              <select
                id="technology"
                name="technology"
                onChange={(e) => setTech(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                {technologies.map((tech) => {
                  return (
                    <option key={tech.id} value={tech.name}>
                      {tech.name}
                    </option>
                  );
                })}
              </select>
              <Button variant="secondary" onClick={onSearch}>
                Apply
              </Button>
            </div>
          </div>
        </section>
        <section className="  grid w-full grid-cols-1 gap-y-4 md:gap-y-6  lg:gap-y-8  xl:gap-y-10">
          {vacancies &&
            vacancies.map((vacancy) => {
              return (
                <article
                  key={vacancy.id}
                  href={`/vacancy/${vacancy.id}`}
                  className="w-full border bg-white"
                >
                  <div className="flex flex-col gap-2.5 p-4 md:p-6 lg:p-8 xl:p-10">
                    <header className="flex flex-row justify-between">
                      <Link
                        href={`/vacancy/${vacancy.id}`}
                        className="w-3/4 text-lg font-bold uppercase hover:underline sm:w-fit sm:text-xl md:text-2xl lg:text-3xl"
                      >
                        {vacancy.title}
                      </Link>
                      <div className="flex flex-col items-center md:flex-row-reverse md:gap-4">
                        <Image
                          src={`https://ui-avatars.com/api/?background=BBB9BA&color=090909&name=${vacancy.company.company_name}`}
                          alt={vacancy.company.company_name}
                          className="hidden rounded-full md:inline-block"
                          width={32}
                          height={32}
                          unoptimized
                        />
                        <Link
                          href={`/profile/company/${vacancy.company.id}`}
                          className="text-base font-semibold hover:underline sm:text-lg md:text-xl lg:text-2xl"
                        >
                          {vacancy.company.company_name}
                        </Link>
                      </div>
                    </header>
                    <main className="flex flex-col">
                      <section className="flex flex-row items-center justify-between text-sm font-medium md:text-base lg:text-lg">
                        <p>
                          {numberWithSpaces(vacancy.floorSalary)} ₸ -{" "}
                          {numberWithSpaces(vacancy.ceilingSalary)} ₸
                        </p>
                        <address className="not-italic">
                          {vacancy.location}
                        </address>
                      </section>
                    </main>
                    <footer className="flex flex-row justify-between">
                      <section className="flex flex-col gap-4 sm:flex-row">
                        {vacancy.Tags &&
                          vacancy.Tags.map((tag) => {
                            return <Badge key={tag.id} name={tag.name} />;
                          })}
                      </section>
                      <Link
                        href={`/vacancy/${vacancy.id}`}
                        className="uppercase"
                      >
                        <Button variant="primary" type="button">
                          Apply Now
                        </Button>
                      </Link>
                    </footer>
                  </div>
                </article>
              );
            })}
        </section>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
