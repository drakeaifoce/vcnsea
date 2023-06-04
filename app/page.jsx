import Image from "next/image";

export default function Landing() {
  return (
    <div className="flex flex-col items-center md:flex-row">
      <div className="flex flex-col gap-10">
        <h1 className="text-xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Discover <br />
          <span className="font-extrabold">vcnsea</span> <br /> the sea of
          vacancies
        </h1>
      </div>
      <Image
        src="/ship.png"
        unoptimized
        width={0}
        height={0}
        className="h-full w-2/3"
        alt="Ship"
      />
    </div>
  );
}
