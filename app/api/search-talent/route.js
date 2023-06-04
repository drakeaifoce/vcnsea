import { prisma } from "../../prisma";

export async function GET(request, { searchParams, params }) {
  try {
    const talents = await prisma.student.findMany({
      where: {
        ...(request.nextUrl.searchParams.get("search")
          ? {
              specialty: {
                contains: request.nextUrl.searchParams.get("search"),
                mode: "insensitive",
              },
            }
          : {}),
      },
    });
    return new Response(JSON.stringify(talents));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
