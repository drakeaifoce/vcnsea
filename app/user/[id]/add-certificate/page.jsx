import { redirect } from "next/navigation";
import { Button } from "../../../../components/primitives/Button";
import { Input } from "../../../../components/primitives/Input";
import { Textfield } from "../../../../components/primitives/Textfield";
import { prisma } from "../../../prisma";

export default function AddCertificate({ params }) {
  const addCertificate = async (data) => {
    "use server";
    const certificate = await prisma.Certificate.create({
      data: {
        studentId: Number(params.id),
        certificateName: data.get("certificateName"),
        year: data.get("year"),
        description: data.get("description"),
        link: data.get("link"),
      },
    });

    redirect(`/user/${params.id}`);
  };
  return (
    <div>
      <form className="flex flex-col gap-9" action={addCertificate}>
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Add certificate
        </h1>
        <Input
          id="certificateName"
          name="certificateName"
          placeholder="CISCO IT Essentials"
          label="Certificate name"
          type="text"
          required
        />
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            id="year"
            name="year"
            placeholder="2020"
            label="Location"
            type="text"
            required
          />
          <Input
            id="link"
            name="link"
            placeholder="Certificate link"
            label="Link"
            type="text"
            required
          />
        </div>
        <Textfield
          id="description"
          name="description"
          placeholder="I was working on ..."
          label="Description"
          type="text"
          required
          className="w-full"
        />
        <Button variant="primary" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
