"use client";
import Image from "next/image";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";

export default function VacancyPage({ params }) {
  const { data: session } = useSession();
  console.log(session);
  const onSubmitApplication = async () => {
    const res = await fetch(`http://localhost:3000/api/vacancy/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: session.user.id,
      }),
    });

    alert("Вы успешно подали заявку");
    return res;
  };

  const [vacancy, setVacancy] = useState(null);

  useEffect(() => {
    const getVacancy = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/vacancy/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (res.ok) {
          const data = await res.json();
          setVacancy(data);
        } else {
          throw new Error("Failed to fetch vacancy data.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getVacancy();
  }, [params.id]);

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
            <Button onClick={onSubmitApplication} variant="primary">
              Подать заявку
            </Button>
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
      </>
    )
  );
}
