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
        <div className="min-h-screen">
          <Sidebar />
          <main className="animate-fade-in px-4 pb-24 pt-5 sm:px-6 lg:ml-64 lg:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
