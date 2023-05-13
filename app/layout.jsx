import "./tailwind.css";
import { Header } from "../components/Header";
import Providers from "../components/Providers";
import { SideBar } from "../components/SideBar";

export const metadata = {
  title: "vcnsea",
  description: "Web-application for students to find vacancies",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-row">
            <SideBar />
            <main className="flex flex-1 flex-col px-6">
              <Header />
              <>{children}</>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
