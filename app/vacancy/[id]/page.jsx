"use client";
import { Robot } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/Button";

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

    alert("Successfully submited!");
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

  return (
    vacancy && (
      <>
        <div className="flex flex-col gap-4 px-4">
          <section className="flex flex-row items-center justify-between">
            <Image
              src={`https://ui-avatars.com/api/name=${vacancy.company.company_name}`}
              unoptimized
              width={0}
              height={0}
              className="h-20 w-20 rounded-full"
              alt={vacancy.company.company_name}
            />
            {session && session.user && session.user.Role === "USER" ? (
              <div className="flex flex-row items-center gap-4">
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
                    <p>Try sample interview with AR-AI</p>{" "}
                    <Robot size={24} className="text-current" />
                  </Button>
                </Link>
                <Button onClick={onSubmitApplication} variant="primary">
                  Submit
                </Button>
              </div>
            ) : (
              <></>
            )}
          </section>
          <section className="flex flex-col">
            <Link
              href={`/profile/company/${vacancy.company.id}`}
              className="text-sm font-normal text-sage-10 hover:underline"
            >
              {vacancy.company.company_name}
            </Link>
            <h1 className="text-xl font-normal text-sage-12">
              {vacancy.title}
            </h1>
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
              Salary
            </h6>
            <p className="cols-span-2  text-sm font-normal text-sage-12">
              {vacancy.floorSalary} - {vacancy.ceilingSalary}
            </p>
          </section>
          <section className="grid grid-cols-3">
            <h6 className="cols-span-1 text-sm font-normal text-sage-10">
              Location
            </h6>
            <p className="cols-span-2 text-sm font-normal text-sage-12">
              {vacancy.location}
            </p>
          </section>
          <section className="grid grid-cols-3">
            <h6 className="text-sm font-normal text-sage-10">Description</h6>
            <p className="text-sm font-normal text-sage-12">
              {vacancy.description}
            </p>
          </section>
        </div>
      </>
    )
  );
}
