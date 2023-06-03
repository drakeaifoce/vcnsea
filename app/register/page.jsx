import Link from "next/link";

export default function RegisterChoice() {
  return (
    <div className=" flex flex-col items-center">
      <h1 className="my-20 text-xl font-extrabold sm:text-2xl md:my-32 md:text-3xl lg:text-4xl xl:text-5xl">
        Who are you?
      </h1>
      <div className="flex flex-row justify-between gap-20">
        <Link
          href="/register/user"
          className="text-base font-semibold hover:underline sm:text-lg md:text-xl lg:text-3xl"
        >
          Job Seeker
        </Link>
        <Link
          href="/register/company"
          className="text-base font-semibold hover:underline sm:text-lg md:text-xl  lg:text-3xl"
        >
          Representative of the Company
        </Link>
      </div>
    </div>
  );
}
