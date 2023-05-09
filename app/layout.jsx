import "reshaped/themes/reshaped/theme.css";
import "./tailwind.css";
import { Reshaped } from "reshaped";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Reshaped>{children}</Reshaped>
      </body>
    </html>
  );
}
