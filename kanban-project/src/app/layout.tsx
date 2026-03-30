import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow | Projetos",
  description: "Gerenciador de projetos estilo Kanban",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-gray-50 h-full">
      <body className={`${inter.className} flex h-screen w-screen overflow-hidden text-gray-900 bg-gray-50 antialiased`}>
        <Providers>
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-50/50">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
