"use client";
import { ArrowLeft, SignIn, SuitcaseSimple } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export const SideBar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen w-14 flex-col items-center justify-between bg-teal-6 py-7">
      <button onClick={() => router.back()}>
        <ArrowLeft size={20} className="text-sage-12" />
      </button>
      <div className="flex flex-col gap-6">
        <Link href="/">
          <SuitcaseSimple size={20} className="text-sage-12" />
        </Link>{" "}
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-sage-12" />
        </button>{" "}
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-sage-12" />
        </button>
      </div>
      {session && session.user ? (
        <button>
          <Image
            alt={`${
              session.user.firstName.charAt(0) +
              session.user.secondName.charAt(0)
            }`}
            width={32}
            height={32}
            className="rounded-full"
            src={`https://ui-avatars.com/api/name=${
              session.user.firstName + session.user.secondName
            }`}
          />
        </button>
      ) : (
        <button onClick={() => signIn()}>
          <SignIn size={20} className="text-sage-12" />
        </button>
      )}
    </div>
  );
};
