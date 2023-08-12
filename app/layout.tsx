import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import SearchModal from "@/components/modals/SearchModal";
import RentModal from "@/components/modals/RentModal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/actions/getCurrentUser";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={null} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
