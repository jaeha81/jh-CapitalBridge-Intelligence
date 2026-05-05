import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/features/Sidebar";
import ServiceWorkerRegistration from "@/components/features/ServiceWorkerRegistration";

export const metadata: Metadata = {
  applicationName: "CapitalBridge",
  title: {
    default: "CapitalBridge Intelligence",
    template: "%s | CapitalBridge",
  },
  description: "AI operating platform for interior business owners",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CapitalBridge",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
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
          <ServiceWorkerRegistration />
        </div>
      </body>
    </html>
  );
}
