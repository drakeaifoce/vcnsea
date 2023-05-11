import * as bcrypt from "bcrypt";
import prisma from "../../prisma";

export async function POST(request) {
  const body = await request.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: await bcrypt.hash(body.password.toString(), 10),
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
