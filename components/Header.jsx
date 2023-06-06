"use client";
import { SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className="bg-white">
      <nav className="container mx-auto flex flex-row items-center  justify-between  px-4 py-5">
        <Link href="/">
          <Image src="/vcnsea.svg" alt="vcnsea icon" width={84} height={14} />
        </Link>
        <div className="flex flex-row justify-around">
          {session && session.user ? (
            <>
              {session.user.Role === "COMPANY_ADMIN" && (
                <Link
                  href={`/company-admin/${session.user.id}`}
                  className="hover:underline"
                >
                  Dashboard
                </Link>
              )}
              {session.user.Role === "COMPANY_WORKER" && (
                <div className="flex flex-row gap-4">
                  <Link href="/vacancies" className="hover:underline">
                    Vacancies
                  </Link>
                  <Link href="/talents" className="hover:underline">
                    Talents
                  </Link>
                </div>
              )}
              {session.user.Role === "SUPERADMIN" && (
                <Link href="/superadmin" className="hover:underline">
                  Dashboard
                </Link>
              )}
              {session.user.Role === "CONTENT_ADMIN" && (
                <div className="flex flex-row gap-4">
                  <Link href="/vacancies" className="hover:underline">
                    Vacancies
                  </Link>
                  <Link href="/talents" className="hover:underline">
                    Talents
                  </Link>
                  <Link href="/companies" className="hover:underline">
                    Companies
                  </Link>
                </div>
              )}
              {session.user.Role === "USER" && (
                <div className="flex flex-row gap-4">
                  <Link href="/vacancies" className="hover:underline">
                    Vacancies
                  </Link>
                  <Link
                    href={`/user/${session.user.id}/applied-vacancies`}
                    className="hover:underline"
                  >
                    Applied
                  </Link>
                  <Link
                    href={`/user/${session.user.id}/interview-appointments`}
                    className="hover:underline"
                  >
                    Interview
                  </Link>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        {session && session.user ? (
          <div className="flex flex-row gap-2">
            <button
              onClick={() =>
                router.push(
                  session.user.Role === "USER"
                    ? `/user/${session.user.id}`
                    : session.user.Role === "COMPANY_ADMIN"
                    ? `/company-admin/${session.user.id}`
                    : session.user.Role === "COMPANY_WORKER"
                    ? `/company/${session.user.companyId}`
                    : "",
                )
              }
            >
              <Image
                alt={
                  !session.user.Role === "SUPERADMIN" &&
                  `${
                    session.user.firstName.charAt(0) +
                    session.user.secondName.charAt(0)
                  }`
                }
                width={32}
                height={32}
                className={`rounded-full ${
                  session.user.Role === "SUPERADMIN" && "hidden"
                }`}
                src={`https://ui-avatars.com/api/?background=BBB9BA&color=090909&name=${
                  session.user.firstName + "+" + session.user.secondName
                }`}
              />
            </button>
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              <SignOut size={24} className="text-black" />
            </button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between gap-8">
            <button
              className="text-base font-normal text-black"
              onClick={() => {
                signIn();
              }}
            >
              Login
            </button>
            <Link
              className="hidden text-base font-normal text-black sm:inline-block"
              href="/register"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
