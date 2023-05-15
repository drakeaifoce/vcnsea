import Link from "next/link";

export default function Register() {
  return (
    <>
      <div className="mt-20 flex flex-col items-center gap-8 lg:px-96">
        <h2 className="text-3xl font-semibold text-teal-12">Who are you?</h2>
        <div className="flex flex-row justify-between">
          <Link
            href="/register/user"
            className="w-96 bg-teal-3 px-4 py-20 text-center text-3xl"
          >
            Talent
          </Link>
          <Link
            href="/register/company"
            className="w-96 bg-teal-9 px-4 py-20 text-center text-3xl"
          >
            Talent seeker
          </Link>
        </div>
      </div>
    </>
  );
}
