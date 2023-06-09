// Redux
import { ReactElement } from "react";
import { Providers } from "../redux/provider";

// Style
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Metadata
export const metadata = {
  title: "Marcket",
  description: "Marc Carranza offers you his wares",
};

type Props = {
  children: ReactElement;
};

export default function RootLayout({ children }: Props): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
