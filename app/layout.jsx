import { Reshaped } from "reshaped";
import "reshaped/themes/reshaped/theme.css";
import './tailwind.css'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Reshaped>
          {children}
        </Reshaped>
      </body>
    </html>
  )
}
