"use client";
import { useState, useEffect } from "react";
import { TopBar } from "./top-bar";
import { NavSidebar } from "./nav-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024);
  }, []);

  return (
    <>
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
          {children}
        </main>
      </div>
    </>
  );
}
