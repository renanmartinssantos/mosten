import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { AdminProvider } from "@/components/AdminSwitch";
import { UserProvider } from "@/contexts/UserContext";
export const metadata: Metadata = {
  title: "Mosten - Votação de Filmes",
  description: "Sistema de votação para filmes e séries",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-oid="ya9_jha">
      <body className="bg-gray-50 min-h-screen" data-oid="6r77hrq">
        <UserProvider data-oid="cowwq6b">
          <AdminProvider data-oid="ekp.f4r">
            <Header data-oid="yggmtm:" />
            <main className="min-h-screen" data-oid="ljb9s_f">
              {children}
            </main>
          </AdminProvider>
        </UserProvider>
      </body>
    </html>
  );
}
