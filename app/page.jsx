import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/primitives/Button";

export default function Landing() {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-10">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          The sea of vacancies <br />
          <span className="text-indigo-600">VCNSEA</span>
        </h1>
        <p className="text-lg font-normal text-gray-500">
          Web-application for students and graduates to find vacancies
        </p>
        <Link href="/register">
          <Button variant="primary">Get started</Button>
        </Link>
      </div>
      <Image src="/banner.png" width={679} height={710} alt="Ship" />
    </div>
  );
}
