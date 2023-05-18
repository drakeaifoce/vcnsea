import "./tailwind.css";
import { Jost } from "next/font/google";
import { Header } from "../components/Header";
import Providers from "../components/Providers";

export const metadata = {
  title: "vcnsea",
  description: "Web-application for students to find vacancies",
};

const jost = Jost({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className={`${jost.className} container mx-auto px-4 py-8`}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
