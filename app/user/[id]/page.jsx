import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/Button";
import { prisma } from "../../prisma";

export default async function UserAccount({ params }) {
  const student = await prisma.student.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      firstName: true,
      secondName: true,
      email: true,
      avatar: true,
      specialty: true,
      city: true,
      website: true,
      quote: true,
      about: true,
      workExperiences: true,
      Responses: true,
    },
  });

  return (
    <>
      <div className=":sm:gap-6 flex flex-col gap-4 px-4 text-black md:gap-8 lg:gap-10">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <Image
            src={`https://ui-avatars.com/api/?background=BBB9BA&color=090909&name=${
              student.firstName + student.secondName
            }`}
            unoptimized
            width={0}
            height={0}
            className="h-20 w-20 rounded-full"
            alt={`${student.firstName + student.secondName}`}
          />
          <>
            <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
              {student.firstName + " " + student.secondName}
            </h1>
            <h2 className="text-sm font-normal md:text-base lg:text-lg">
              {student.specialty && student.city
                ? student.specialty + ", " + student.city
                : " "}
            </h2>
            {student.website && (
              <Link
                href={student.website}
                className="text-sm font-normal text-blue-8 hover:underline md:text-base lg:text-lg"
              >
                {student.website}
              </Link>
            )}
            <address className="text-sm font-normal not-italic md:text-base lg:text-lg">
              {student.email ? student.email : " "}
            </address>
          </>
          <Link href={`/user/${params.id}/edit`}>
            <Button variant="primary">Edit</Button>
          </Link>
        </div>
        <>
          {student.quote && (
            <p className="border bg-orange-primary px-6 py-4 text-sm font-normal md:text-base lg:text-lg">
              {student.quote}
            </p>
          )}
        </>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-black md:text-lg lg:text-xl">
            About
          </h3>
          <p className="text-sm font-normal md:text-base lg:text-lg">
            {student.about}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex w-full flex-row items-center gap-9">
            <h3 className="text-base font-medium text-black md:text-lg lg:text-xl">
              Work experience
            </h3>
            <Link
              href={`/user/${params.id}/add-work-experience`}
              className="text-sm "
            >
              <Button variant="secondary">+</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-9">
            {student.workExperiences.map((experience) => {
              return (
                <div
                  key={experience.id}
                  className="grid grid-cols-2 md:grid-cols-3"
                >
                  <h4 className="col-span-1 text-sm font-normal md:text-base lg:text-lg">
                    {" "}
                    {experience.start_date + " -"}
                    {experience.end_date}
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h4 className="col-span-1 text-sm font-normal md:text-base lg:text-lg">
                        {experience.title}
                      </h4>
                      <Link
                        href={experience.company_link}
                        className="text-base hover:underline md:text-lg lg:text-xl"
                      >
                        {experience.company_name}
                      </Link>
                      <address className="not-italic">
                        {experience.city}
                      </address>
                    </div>
                    <p className="text-sage-11 text-sm font-normal">
                      {experience.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
