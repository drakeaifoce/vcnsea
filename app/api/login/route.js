import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "../../jwt";
import { prisma } from "../../prisma";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const student = await prisma.student.findFirst({
    where: {
      email: body.username,
    },
  });

  if (student && (await bcrypt.compare(body.password, student.password))) {
    const userWithoutPass = { ...student };
    delete userWithoutPass.password;

    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };

    return new Response(JSON.stringify(result));
  }
  const companyUser = await prisma.company.findFirst({
    where: {
      email: body.username,
    },
  });

  if (
    companyUser &&
    (await bcrypt.compare(body.password, companyUser.password))
  ) {
    const userWithoutPass = { ...companyUser };
    delete userWithoutPass.password;

    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };

    return new Response(JSON.stringify(result));
  }

  return new Response(JSON.stringify(null));
}
