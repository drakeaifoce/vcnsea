import { prisma } from "../../prisma";

export async function POST(request) {
  const body = await request.json();
  const offer = await prisma.offer.create({
    data: {
      companyWokerId: body.companyWokerId,
      studentId: body.studentId,
    },
  });
}
