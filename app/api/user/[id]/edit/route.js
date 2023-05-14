import { prisma } from "../../../../prisma";

export async function GET(request, { params }) {
  const student = await prisma.student.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: false,
      firstName: true,
      secondName: true,
      specialty: true,
      city: true,
      website: true,
      quote: true,
      about: true,
      Role: false,
      workExperiences: false,
      Responses: false,
    },
  });
  return new Response(JSON.stringify(student));
}

export async function PATCH(request, { params }) {
  const body = await request.json();
  const student = await prisma.student.update({
    where: {
      id: Number(params.id),
    },
    data: {
      firstName: body.firstName,
      secondName: body.secondName,
      specialty: body.specialty,
      city: body.city,
      website: body.website,
      quote: body.quote,
      about: body.about,
    },
  });

  return new Response(JSON.stringify(student));
}
