import Image from "next/image";
import { Input } from "../../../../components/Input";
import { prisma } from "../../../prisma";

export default async function EditUserAccount({ params }) {
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
      workExperiences: false,
      Cv: false,
      Responses: false,
    },
  });

  const editUserAccountAction = async () => {
    console.log(1);
  };
  return (
    <>
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-row gap-8">
          <Image
            src={`https://ui-avatars.com/api/name=${
              student.firstName + student.secondName
            }`}
            unoptimized
            width={0}
            height={0}
            className="h-20 w-20 rounded-full"
          />
          <form>
            <Input value={student.firstName} type="text" id="firstName" />
          </form>
        </div>
      </div>
    </>
  );
}
