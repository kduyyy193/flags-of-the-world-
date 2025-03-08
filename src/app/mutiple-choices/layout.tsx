import { ArrowLeftNewICon } from "@/assets/icons/ArrowLeftIcon";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flags of the world",
  description: "Mutiple choices games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <div className="flex items-center ml-2">
        <div className="flex items-center w-full">
          <Link href="/">
            <ArrowLeftNewICon />
          </Link>
          <div className="grow text-center -ml-4">
            <h1 className="text-lg font-semibold text-center">
              Mutiple Choices Game
            </h1>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
