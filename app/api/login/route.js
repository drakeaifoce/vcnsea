import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "../../jwt";
import { prisma } from "../../prisma";

export async function POST(request) {
  const body = await request.json();

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

  const companyAdmin = await prisma.companyAdmin.findFirst({
    where: {
      email: body.username,
    },
  });
  if (
    companyAdmin &&
    (await bcrypt.compare(body.password, companyAdmin.password))
  ) {
    const userWithoutPass = { ...companyAdmin };
    delete userWithoutPass.password;

    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };

    return new Response(JSON.stringify(result));
  }

  const companyWorker = await prisma.companyWorker.findFirst({
    where: {
      email: body.username,
    },
  });
  if (
    companyWorker &&
    (await bcrypt.compare(body.password, companyWorker.password))
  ) {
    const userWithoutPass = { ...companyWorker };
    delete userWithoutPass.password;

    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };

    return new Response(JSON.stringify(result));
  }

  const superAdmin = await prisma.superAdmin.findFirst({
    where: {
      email: body.username,
    },
  });
  if (
    superAdmin &&
    (await bcrypt.compare(body.password, superAdmin.password))
  ) {
    const userWithoutPass = { ...superAdmin };
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
