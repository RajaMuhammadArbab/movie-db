import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const oswald = Oswald({ 
  subsets: ["latin"],
  variable: '--font-oswald',
});

export const metadata = {
  title: "MovieDB | Cinematic Experience",
  description: "Discover movies, explore cast & crew, and find your next watch on MovieDB — the premium movie database powered by TMDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} ${inter.className}`}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
