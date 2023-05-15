import { prisma } from "../../../prisma";

export async function POST(request, { params }) {
  const body = await request.json();
  const application = await prisma.application.create({
    data: {
      status: "Pending",
      vacancyId: Number(params.id),
      studentId: body.studentId,
    },
  });

  return new Response(JSON.stringify(application));
}

export async function GET(request, { params }) {
  try {
    if (!params.id) {
      throw new Error("Invalid request. Vacancy ID is missing.");
    }
    const vacancy = await prisma.vacancy.findUnique({
      where: {
        id: Number(params.id),
      },
      select: {
        id: true,
        floorSalary: true,
        ceilingSalary: true,
        title: true,
        description: true,
        location: true,
        company: {
          select: {
            id: true,
            firstName: true,
            secondName: true,
            position: true,
            email: true,
            company_name: true,
          },
        },
      },
    });
    if (!vacancy) {
      throw new Error("Vacancy not found.");
    }
    return new Response(JSON.stringify(vacancy));
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
