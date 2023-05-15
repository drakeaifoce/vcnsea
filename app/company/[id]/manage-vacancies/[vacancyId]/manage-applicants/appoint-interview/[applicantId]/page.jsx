import { redirect } from "next/navigation";
import { Button } from "../../../../../../../../components/Button";
import { Input } from "../../../../../../../../components/Input";
import { prisma } from "../../../../../../../prisma";

export default async function AppointInterview({ params }) {
  const appointInterviewAction = async (data) => {
    "use server";
    const appointment = await prisma.appointment.create({
      data: {
        date: data.get("date"),
        time: data.get("time"),
        link: data.get("link"),
        studentId: Number(params.applicantId),
        companyId: Number(params.id),
      },
    });
    redirect(
      `/company/${params.id}/manage-vacancies/${params.vacancyId}/manage-applicants/interviews`,
    );
  };
  return (
    <div>
      <form
        className="flex flex-col items-center gap-4 bg-sage-2 p-8 lg:mx-20"
        action={appointInterviewAction}
      >
        <h1 className="text-xl font-medium text-black">Appoint interview</h1>
        <div className="flex w-full flex-row gap-8">
          <Input id="date" name="date" label="Date" type="date" required />
          <Input id="time" name="time" label="Time" required type="time" />
        </div>
        <div className="flex w-full flex-row gap-8">
          <Input
            id="link"
            name="link"
            label="Interview link"
            required
            type="text"
          />
        </div>
        <Button variant="primary" type="submit">
          Create interview appointment
        </Button>
      </form>
    </div>
  );
}
