import "./tailwind.css";
import { Header } from "../components/Header";
import Providers from "../components/Providers";

export const metadata = {
  title: "vcnsea",
  description: "Web-application for students to find vacancies",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header>
            <Header />
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
