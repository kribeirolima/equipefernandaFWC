import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Painel da Delegação — NYC / NJ",
  description:
    "Tempos, custos, rotas e locais úteis para a delegação em Nova York, New Jersey, Cidade do México e Miami.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <span className="text-sm font-medium text-muted-foreground">Painel da Delegação</span>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
