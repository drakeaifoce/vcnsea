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
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-medium text-sage-12">
        Dive into the sea of talents
      </h1>
      <section className="grid grid-cols-4 gap-4">
        {students.map((student) => {
          return (
            <Link
              key={student.id}
              href={`/profile/user/${student.id}`}
              className="rounded-xl border border-sage-7 bg-sage-2"
            >
              <div className="flex flex-col gap-4 p-4">
                <header className="flex flex-row items-center gap-2">
                  <Image
                    src={`https://ui-avatars.com/api/name=${
                      student.firstName + student.secondName
                    }`}
                    alt={student.firstName + " " + student.secondName}
                    className="h-10 w-10 rounded-full"
                    height={0}
                    width={0}
                    unoptimized
                  />
                  <section className="flex flex-col">
                    <h1 className="text-xl font-medium text-black">
                      {student.firstName + " " + student.secondName}
                    </h1>
                    <h2 className="text-sm font-normal text-sage-11">
                      {student.specialty && student.city
                        ? student.specialty + ", " + student.city
                        : " "}
                    </h2>
                  </section>
                </header>
                {student.quote && (
                  <section>
                    <p className="rounded-xl border border-sage-4 bg-white px-1.5 py-1 text-xs font-normal text-sage-12">
                      {student.quote}
                    </p>
                  </section>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
