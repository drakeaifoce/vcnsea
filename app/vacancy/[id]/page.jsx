"use client";
import { Robot } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../../../components/primitives/Button";
import { numberWithSpaces } from "../../utils";

export default function VacancyPage({ params }) {
  const { data: session } = useSession();
  const onSubmitApplication = async () => {
    const res = await fetch(`/api/vacancy/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: session.user.id,
      }),
    });

    toast.success("Successfully submited application");
    return res;
  };

  const [vacancy, setVacancy] = useState(null);

  const getVacancy = useCallback(async () => {
    try {
      const res = await fetch(`/api/vacancy/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const body = await res.json();
        setVacancy(body);
      } else {
        throw new Error("Failed to fetch vacancy data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    getVacancy();
  }, [getVacancy]);

  console.log(vacancy);
  return (
    vacancy && (
      <>
        <div className=":sm:gap-6 flex flex-col gap-4 px-4 md:gap-8 lg:gap-10">
          <section className="flex flex-row items-center justify-between">
            <Image
              src={`https://ui-avatars.com/api/?background=BBB9BA&color=090909&name=${vacancy.company.company_name}`}
              unoptimized
              width={0}
              height={0}
              className="h-20 w-20 rounded-full"
              alt={vacancy.company.company_name}
            />
            {session && session.user && session.user.Role === "USER" ? (
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <Toaster />
                <Link
                  href={{
                    pathname: "/ar-ai/",
                    query: { p: vacancy.title.replace(/ /g, "") },
                  }}
                >
                  <Button
                    className="flex flex-row items-center gap-2"
                    type="button"
                    variant="secondary"
                  >
                    <p>AR-AI test</p>{" "}
                    <Robot size={24} className="text-current" />
                  </Button>
                </Link>
                <Button onClick={onSubmitApplication} variant="primary">
                  Apply
                </Button>
              </div>
            ) : (
              <></>
            )}
          </section>
          <section className="flex flex-col">
            <Link
              href={`/profile/company/${vacancy.company.id}`}
              className="text-sm font-normal hover:underline md:text-base lg:text-lg"
            >
              {vacancy.company.company_name}
            </Link>
            <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
              {vacancy.title}
            </h1>
          </section>
          <section className="grid grid-cols-2 text-sm md:grid-cols-3  md:text-base lg:text-lg">
            <h6 className="cols-span-1 font-medium">Salary</h6>
            <p className="cols-span-1 md:cols-span-2  font-normal">
              {numberWithSpaces(vacancy.floorSalary)} -{" "}
              {numberWithSpaces(vacancy.ceilingSalary)}
            </p>
          </section>
          <section className="grid grid-cols-2 text-sm md:grid-cols-3  md:text-base lg:text-lg">
            <h6 className="cols-span-1 font-medium">Location</h6>
            <p className="cols-span-1 md:cols-span-2 font-normal">
              {vacancy.location}
            </p>
          </section>
          <section className="grid grid-cols-2 text-sm md:grid-cols-3  md:text-base lg:text-lg">
            <h6 className="cols-span-1 font-medium">Description</h6>
            <p className="cols-span-1 md:cols-span-2font-normal">
              {vacancy.description}
            </p>
          </section>
          <section className="flex flex-col gap-4 sm:flex-row">
            {vacancy.Tags &&
              vacancy.Tags.map((tag) => {
                return (
                  <div
                    key={tag.id}
                    className="rounded-md bg-orange-primary px-4 py-2"
                  >
                    {tag.name}
                  </div>
                );
              })}
          </section>
        </div>
      </>
    )
  );
}
