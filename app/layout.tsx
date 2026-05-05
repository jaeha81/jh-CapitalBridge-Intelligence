import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/features/Sidebar";

export const metadata: Metadata = {
  title: "Interior AI Platform",
  description: "인테리어 사업자를 위한 AI 운영 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 animate-fade-in">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
