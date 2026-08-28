"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./top-bar";
import { NavSidebar } from "./nav-sidebar";
import { CityBar } from "./city-bar";
import { CityProvider } from "@/lib/city-context";

const CITY_BAR_ROUTES = ["/", "/proximidades", "/locacoes"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const showCityBar = CITY_BAR_ROUTES.includes(pathname);

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024);
  }, []);

  return (
    <CityProvider>
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <div className="flex min-h-screen pt-14 pb-16 lg:pb-0">
        <NavSidebar open={sidebarOpen} />
        <main
          className={`flex-1 min-w-0 transition-[margin] duration-200 bg-white ${
            sidebarOpen ? "lg:ml-60" : "lg:ml-16"
          }`}
        >
          {showCityBar && <CityBar />}
          {children}
        </main>
      </div>
    </CityProvider>
  );
}
