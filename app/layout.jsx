import "./tailwind.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/Button";

export const metadata = {
  title: "vcnsea",
  description: "Web-application for students to find vacancies",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="container mx-auto flex flex-row items-center justify-between px-4 pb-14 pt-10">
            <Link href="/">
              <Image
                src="/vcnsea.svg"
                alt="vcnsea icon"
                width={84}
                height={14}
              />
            </Link>
            <div className="flex flex-row gap-4">
              {/* <Button variant="transparent" type="button">
                <span className="md:hidden">Опубликовать</span>
                <span className="hidden md:inline-block">
                  Добавить вакансию
                </span>
              </Button> */}
              <Link href="/sign-in">
                <Button variant="tertiary" type="button">
                  Войти
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="primary" type="button">
                  Начать{" "}
                  <span className="hidden md:inline-block">пользоваться</span>
                </Button>
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
