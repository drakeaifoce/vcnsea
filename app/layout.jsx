import "./tailwind.css";
import Image from "next/image";
import { Button } from "../components/Button";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="container mx-auto flex flex-row justify-between items-center px-4 pb-14 pt-10">
            <Image src="/vcnsea.svg" alt="vcnsea icon" width={84} height={13} />
            <div className="flex flex-row gap-4">
              <Button variant="tertiary" type="button">
                Войти
              </Button>
              <Button variant="primary" type="button">
                Начать{" "}
                <span className="hidden md:inline-block">пользоваться</span>
              </Button>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
