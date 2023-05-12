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
      Cv: false,
      Responses: true,
    },
  });

  return (
    <div className="container mx-auto">
      <div className="mx-96 flex flex-col gap-8">
        <div className="flex flex-row gap-8">
          <Image
            src="/logo_placeholder.svg"
            unoptimized
            width={0}
            height={0}
            className="h-20 w-20 rounded-full"
          />
          <div>
            <h1 className="text-xl font-medium text-black">
              {student.firstName + " " + student.secondName}
            </h1>
            <h2 className="text-sm font-normal text-sage-11">
              {student.specialty + ", " + student.city}{" "}
            </h2>
            <Link
              href={student.website}
              className="text-sm font-normal text-sage-9 hover:underline"
            >
              {student.website}
            </Link>
          </div>
        </div>
        <div>
          <p className="rounded-xl border-2 border-sage-4 px-6 py-4 text-sm font-normal text-sage-12">
            {student.quote}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-black">Обо мне</h3>
          <p className="ml-4 text-sm font-normal text-sage-11">
            {student.about}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex w-full flex-row items-center justify-between">
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
                    <br />
                    {experience.end_date}
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
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
    </div>
  );
}