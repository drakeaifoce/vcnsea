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
  return <>page</>;
}
