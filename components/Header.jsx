"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./Button";

export const Header = () => {
  const { data: session } = useSession();
  return (
    <nav
      className={`flex w-full flex-row items-center px-4 py-4 ${
        session && session.user ? "justify-end" : "justify-between"
      }`}
    >
      {session && session.user ? (
        ""
      ) : (
        <div className="flex flex-row gap-4">
          <Button variant="transparent" type="button">
            <span className="md:hidden">Опубликовать</span>
            <span className="hidden md:inline-block">Добавить вакансию</span>
          </Button>
          <Button variant="tertiary" type="button" onClick={() => signIn()}>
            Войти
          </Button>
          <Link href="/register">
            <Button variant="primary" type="button">
              Начать{" "}
              <span className="hidden md:inline-block">пользоваться</span>
            </Button>
          </Link>
        </div>
      )}
      <Link href="/">
        <Image src="/vcnsea.svg" alt="vcnsea icon" width={84} height={14} />
      </Link>
    </nav>
  );
};
