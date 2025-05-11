import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/font";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SheetSide from "@/components/SheetSide";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "TopToolsBox",
  description: "The ultimate toolbox for your daily needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-[#0f1515] text-white relative min-h-screen `}
      >
        {/* Background Effects */}
        <div className="w-full h-full  fixed top-0 left-0 overflow-hidden pointer-events-none -z-10">
          <div className="grain-blur background-base" />
          <div className="grain-background background-base" />
          <div className="grid-bg background-base" />
          <div className="large-blur background-base" />
          <div className="small-blur background-base" />
        </div>

        {/* Header */}
        <Header />

        {/* Layout Wrapper */}
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
