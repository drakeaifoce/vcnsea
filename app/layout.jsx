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
          <main
            className={`${jost.className} container mx-auto min-h-screen px-4 py-8`}
          >
            {children}
          </main>
          <footer className="bottom-0 bg-blue-9">
            <section
              className={`${jost.className} container mx-auto px-10 py-10 text-center text-xl font-extrabold text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`}
            >
              Oops, you reached the bottom of the page
            </section>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
