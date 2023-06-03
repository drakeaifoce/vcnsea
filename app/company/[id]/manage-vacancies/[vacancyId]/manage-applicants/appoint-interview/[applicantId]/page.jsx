import { redirect } from "next/navigation";
import { Button } from "../../../../../../../../components/primitives/Button";
import { Input } from "../../../../../../../../components/primitives/Input";
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
        vacancyId: Number(params.vacancyId),
      },
    });
    redirect(`/company/${params.id}/interviews`);
  };
  return (
    <div>
      <form
        className="bg-sage-2 flex flex-col items-center gap-4 p-8 lg:mx-20"
        action={appointInterviewAction}
      >
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Appoint interview
        </h1>
        <div className="flex w-full flex-col gap-8 md:flex-row">
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
