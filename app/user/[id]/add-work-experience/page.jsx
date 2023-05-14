import { redirect } from "next/navigation";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { prisma } from "../../../prisma";

export default async function AddWorkExperience({ params }) {
  const addWorkExperienceAction = async (data) => {
    "use server";
    const workExperience = await prisma.workExperience.create({
      data: {
        studentId: Number(params.id),
        position: data.get("position"),
        company_name: data.get("company_name"),
        company_link: data.get("company_link"),
        city: data.get("city"),
        start_date: data.get("start_date"),
        end_date: data.get("end_date"),
        description: data.get("description"),
      },
    });

    redirect(`/user/${params.id}`);
  };
  return (
    <div>
      <form className="flex flex-col gap-9" action={addWorkExperienceAction}>
        <h1 className="text-xl font-medium text-black">Add work experience</h1>
        <Input
          id="position"
          name="position"
          placeholder="Frontend developer"
          label="Position"
          type="text"
          required
        />
        <div className="flex flex-row gap-4">
          <Input
            id="company_name"
            name="company_name"
            placeholder="Company name"
            label="Company name"
            type="text"
            required
          />
          <Input
            id="company_link"
            name="company_link"
            placeholder="Company link"
            label="Link"
            type="text"
            required
          />
        </div>
        <Input
          id="city"
          name="city"
          placeholder="Location"
          label="Astana"
          type="text"
          required
        />
        <div className="flex flex-row gap-4">
          <Input
            id="start_date"
            name="start_date"
            placeholder="Jun, 2022"
            label="Start date"
            type="text"
            required
          />
          <Input
            id="end_date"
            name="end_date"
            placeholder="Mar, 2023"
            label="End date"
            type="text"
            required
          />
        </div>
        <Input
          id="description"
          name="description"
          placeholder="I was working on ..."
          label="Description"
          type="text"
          required
        />
        <Button variant="primary" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
