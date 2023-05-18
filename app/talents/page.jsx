import Image from "next/image";
import Link from "next/link";
import { prisma } from "../prisma";

export default async function Talents() {
  const students = await prisma.student.findMany({
    select: {
      id: true,
      firstName: true,
      secondName: true,
      email: false,
      password: false,
      avatar: false,
      specialty: true,
      city: true,
      website: false,
      quote: true,
      about: false,
      Role: false,
      workExperiences: false,
      Responses: false,
    },
  });
  return (
    <div className="text-black">
      <h1 className="text-xl font-extrabold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        Dive into the sea of talents
      </h1>
      <section className="my-4 grid grid-cols-1 gap-x-2 gap-y-4 md:my-6 md:grid-cols-2 md:gap-x-4 md:gap-y-6 lg:my-8 lg:gap-x-4 lg:gap-y-8 xl:my-10 xl:gap-x-6 xl:gap-y-10">
        {students.map((student) => {
          return (
            <Link
              key={student.id}
              href={`/profile/user/${student.id}`}
              className="border bg-white"
            >
              <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8 xl:gap-10 xl:p-10">
                <header className="flex flex-row items-center gap-2 md:gap-4 lg:gap-6 xl:gap-8">
                  <Image
                    src={`https://ui-avatars.com/api/?background=BBB9BA&color=090909&name=${
                      student.firstName + "+" + student.secondName
                    }`}
                    alt={student.firstName + " " + student.secondName}
                    className="h-12 w-12 rounded-full"
                    height={0}
                    width={0}
                    unoptimized
                  />
                  <section className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                      {student.firstName + " " + student.secondName}
                    </h1>
                    <h2 className="text-base font-normal sm:text-lg lg:text-xl xl:text-2xl">
                      {student.specialty && student.city
                        ? student.specialty + ", " + student.city
                        : " "}
                    </h2>
                  </section>
                </header>
                {student.quote && (
                  <p className="w-3/4 border border-black bg-orange/80  px-2.5 py-2 text-xs font-normal md:w-full md:text-base lg:px-5 lg:py-4 lg:text-lg">
                    {student.quote}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
