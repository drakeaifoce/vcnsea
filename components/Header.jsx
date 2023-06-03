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
        <div className="flex flex-row items-center gap-2 sm:gap-4 md:gap-8">
          1
        </div>

        {session && session.user ? (
          <div className="flex flex-row gap-2">
            <button
              onClick={() =>
                router.push(
                  session.user.Role === "USER"
                    ? `/user/${session.user.id}`
                    : `/company/${session.user.id}`,
                )
              }
            >
              <Image
                alt={`${
                  session.user.firstName.charAt(0) +
                  session.user.secondName.charAt(0)
                }`}
                width={32}
                height={32}
                className="rounded-full"
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
