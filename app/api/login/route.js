import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "../../jwt";
import prisma from "../../prisma";

export async function POST(request) {
  const body = await request.json();

  const user = await prisma.student.findFirst({
    where: {
      email: body.username,
    },
  });

  if (!user) {
    const company = await prisma.company.findFirst({
      where: {
        email: body.username,
      },
    });

    if (company && (await bcrypt.compare(body.password, company.password))) {
      const { password, ...userWithoutPass } = user;
      const accessToken = signJwtAccessToken(userWithoutPass);
      const result = {
        ...userWithoutPass,
        accessToken,
      };
      return new Response(JSON.stringify(result));
    }
  }

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  }
  return new Response(JSON.stringify(null));
}
