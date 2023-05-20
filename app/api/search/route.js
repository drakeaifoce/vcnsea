import { prisma } from "../../prisma";

export async function GET(request, { searchParams, params }) {
  try {
    const vacancies = await prisma.vacancy.findMany({
      where: {
        ...(request.nextUrl.searchParams.get("search")
          ? {
              title: {
                contains: request.nextUrl.searchParams.get("search"),
                mode: "insensitive",
              },
            }
          : {}),
        ...(request.nextUrl.searchParams.get("minimumSalary")
          ? {
              floorSalary: {
                gte: Number(request.nextUrl.searchParams.get("minimumSalary")),
              },
            }
          : {}),
      },
      include: {
        company: true,
      },
    });

    return new Response(JSON.stringify(vacancies));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
