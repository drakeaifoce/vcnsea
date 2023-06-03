import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export default function page() {
  const createSuperAdminAction = async (data) => {
    "use server";
    const superAdmin = await prisma.superAdmin.create({
      data: {
        email: data.get("email"),
        Role: "SUPERADMIN",
        password: await bcrypt.hash(data.get("password"), 10),
      },
    });
    redirect("/superadmin");
  };
  return (
    <div>
      <form action={createSuperAdminAction}>
        <input id="email" name="email" type="email" required />
        <input id="password" name="password" type="password" required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
