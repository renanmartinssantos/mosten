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
    <html lang="pt-BR" data-oid="7s66kzk">
      <body className="bg-gray-50 min-h-screen" data-oid="b529sms">
        <UserProvider data-oid="vrw1bp6">
          <AdminProvider data-oid="vh-:8_9">
            <Header data-oid="j721isp" />
            <main className="min-h-screen" data-oid="3pnnv0y">
              {children}
            </main>
          </AdminProvider>
        </UserProvider>
      </body>
    </html>
  );
}
