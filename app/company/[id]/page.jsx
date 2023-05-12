import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/Button";
import { prisma } from "../../prisma";

export default async function CompanyAccount({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-4">
          <Image
            src={company.avatar || "/logo_placeholder.svg"}
            unoptimized
            width={0}
            height={0}
            className="h-20 w-20 rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{company.company_name}</h1>
            <p>{company.city}</p>
          </div>
        </div>
        <Link href={`/company/${params.id}/create-vacancy`}>
          <Button variant="primary">Создать вакансию</Button>
        </Link>
      </div>

      <p className="my-4 rounded-md bg-sage-3 p-4 text-sm font-medium">
        {company.description}
      </p>
    </div>
  );
}
