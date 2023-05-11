"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";

export const Header = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="container mx-auto flex flex-row items-center justify-between px-4 pb-14 pt-10">
      <Link href="/">
        <Image src="/vcnsea.svg" alt="vcnsea icon" width={84} height={14} />
      </Link>
      <div className="flex flex-row gap-4">
        {/* <Button variant="transparent" type="button">
                <span className="md:hidden">Опубликовать</span>
                <span className="hidden md:inline-block">
                  Добавить вакансию
                </span>
              </Button> */}
        <Button variant="tertiary" type="button" onClick={() => signIn()}>
          Войти
        </Button>
        <Button variant="primary" type="button">
          Начать <span className="hidden md:inline-block">пользоваться</span>
        </Button>
      </div>
    </nav>
  );
};
