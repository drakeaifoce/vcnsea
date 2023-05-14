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
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center gap-8">
          <Image
            src={`https://ui-avatars.com/api/name=${
              student.firstName + student.secondName
            }`}
            unoptimized
            width={0}
            height={0}
            className="h-20 w-20 rounded-full"
            alt={`${student.firstName + student.secondName}`}
          />
          <>
            <h1 className="text-xl font-medium text-black">
              {student.firstName + " " + student.secondName}
            </h1>
            <h2 className="text-sm font-normal text-sage-11">
              {student.specialty
                ? student.specialty
                : "" + ", " + student.city
                ? student.city
                : ""}{" "}
            </h2>
            {student.webiste && (
              <Link
                href={student.website}
                className="text-sm font-normal text-sage-9 hover:underline"
              >
                {student.website}
              </Link>
            )}
          </>
          <Link href={`/user/${params.id}/edit`}>
            <Button variant="primary">Редактировать</Button>
          </Link>
        </div>
        <>
          {student.quote && (
            <p className="rounded-xl border-2 border-sage-4 px-6 py-4 text-sm font-normal text-sage-12">
              {student.quote}
            </p>
          )}
        </>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-black">Обо мне</h3>
          <p className="ml-4 text-sm font-normal text-sage-11">
            {student.about}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex w-full flex-row items-center gap-9">
            <h3 className="text-sm font-medium text-black">Опыт работы</h3>
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
                <div key={experience.id} className="flex flex-row gap-9">
                  <h4 className="text-sm font-normal text-sage-9">
                    {" "}
                    {experience.start_date + " -"}
                    {experience.end_date}
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h4 className="text-sm font-normal text-black">
                        {experience.title}
                      </h4>
                      <Link
                        href={experience.company_link}
                        className="text-sm font-normal text-sage-12 hover:underline"
                      >
                        {experience.company_name}
                      </Link>
                      <address className="text-sm font-normal not-italic text-sage-9">
                        {experience.city}
                      </address>
                    </div>
                    <p className="text-sm font-normal text-sage-11">
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
