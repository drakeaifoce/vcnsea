import { redirect } from "next/navigation";
import { Button } from "../../../../components/primitives/Button";
import { Input } from "../../../../components/primitives/Input";
import { Textfield } from "../../../../components/primitives/Textfield";
import { prisma } from "../../../prisma";

export default function AddEducation({ params }) {
  const addEducationAction = async (data) => {
    "use server";
    const education = await prisma.Education.create({
      data: {
        studentId: Number(params.id),
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
        institutionName: data.get("institutionName"),
        degreeName: data.get("degreeName"),
        location: data.get("location"),
        description: data.get("description"),
        link: data.get("link"),
      },
    });

    redirect(`/user/${params.id}`);
  };
  return (
    <div>
      <form className="flex flex-col gap-9" action={addEducationAction}>
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Add education
        </h1>
        <Input
          id="institutionName"
          name="institutionName"
          placeholder="Astana IT University"
          label="Institution name"
          type="text"
          required
        />
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            id="location"
            name="location"
            placeholder="Astana"
            label="Location"
            type="text"
            required
          />
          <Input
            id="link"
            name="link"
            placeholder="Institution link"
            label="Link"
            type="text"
            required
          />
        </div>
        <Input
          id="degreeName"
          name="degreeName"
          placeholder="Bachelor's Of Software Engineering"
          label="Degree name"
          type="text"
          required
        />
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            id="startDate"
            name="startDate"
            placeholder="Jun, 2022"
            label="Start date"
            type="text"
            required
          />
          <Input
            id="endDate"
            name="endDate"
            placeholder="Mar, 2023"
            label="End date"
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
