import Image from "next/image";
import Link from "next/link";
import { MakeOffer } from "../../../../components/MakeOffer";
import { prisma } from "../../../prisma";

export default async function UserProfile({ params }) {
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
      Certificates: true,
      Education: true,
    },
  });

  return (
    <div className=":sm:gap-6 flex flex-col gap-4 px-4 text-black md:gap-8 lg:gap-10">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <Image
          src={`https://ui-avatars.com/api/?background=BBB9BA&color=090909&name=${
            student.firstName + student.secondName
          }`}
          unoptimized
          width={0}
          height={0}
          alt={student.firstName + " " + student.secondName}
          className="h-20 w-20 rounded-full"
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
          <MakeOffer studentId={student.id} />
        </>
      </div>
      {student.quote && (
        <>
          <p className="border bg-orange-primary px-6 py-4 text-sm font-normal md:text-base lg:text-lg">
            {student.quote}
          </p>
        </>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium text-black md:text-lg lg:text-xl">
          About
        </h3>
        <p className="text-sm font-normal md:text-base lg:text-lg">
          {student.about}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex w-full flex-row items-center justify-between">
          <h3 className="text-base font-medium text-black md:text-lg lg:text-xl">
            Work experience
          </h3>
        </div>
        <div className="flex flex-col gap-9">
          {student.workExperiences.map((experience) => {
            return (
              <div
                key={experience.id}
                className="grid grid-cols-2 md:grid-cols-3"
              >
                <h4 className="col-span-1 text-sm font-normal md:text-base lg:text-lg">
                  {experience.start_date + " - "}
                  {experience.end_date}
                </h4>
                <div className="col-span-1 flex flex-col gap-2 text-sm font-normal md:col-span-2 md:text-base lg:text-lg">
                  <div className="flex flex-col">
                    <h5 className="col-span-1 text-sm font-bold  md:text-base lg:text-lg">
                      {experience.position}
                    </h5>
                    <Link
                      href={experience.company_link}
                      className="text-base hover:underline md:text-lg lg:text-xl"
                    >
                      {experience.company_name}
                    </Link>
                    <address className="not-italic">{experience.city}</address>
                  </div>
                  <p>{experience.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex w-full flex-row items-center justify-between">
          <h3 className="text-base font-medium text-black md:text-lg lg:text-xl">
            Education
          </h3>
        </div>
        <div className="flex flex-col gap-9">
          {student.Education.map((edu) => {
            return (
              <div key={edu.id} className="grid grid-cols-2 md:grid-cols-3">
                <h4 className="col-span-1 text-sm font-normal md:text-base lg:text-lg">
                  {edu.startDate + " - "}
                  {edu.endDate}
                </h4>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <Link
                      href={edu.link}
                      className="text-base font-bold hover:underline md:text-lg lg:text-xl"
                    >
                      {edu.institutionName}
                    </Link>
                    <div className="col-span-1 flex flex-col gap-2 text-sm font-normal md:col-span-2 md:text-base lg:text-lg">
                      <h6 className="text-base md:text-lg lg:text-xl">
                        {edu.degreeName}
                      </h6>
                      <address className="not-italic">{edu.location}</address>
                    </div>
                    <p className=" text-sm font-normal md:text-base lg:text-lg">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex w-full flex-row items-center justify-between">
          <h3 className="text-base font-medium text-black md:text-lg lg:text-xl">
            Certificates
          </h3>
        </div>
        <div className="flex flex-col gap-9">
          {student.Certificates.map((certificate) => {
            return (
              <div
                key={certificate.id}
                className="grid grid-cols-2 md:grid-cols-3"
              >
                <h4 className="col-span-1 text-sm font-normal md:text-base lg:text-lg">
                  {certificate.year}
                </h4>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <Link
                      href={certificate.link}
                      className="text-base font-bold hover:underline md:text-lg lg:text-xl"
                    >
                      {certificate.certificateName}
                    </Link>
                    <p className="text-sm font-normal md:text-base lg:text-lg">
                      {certificate.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
