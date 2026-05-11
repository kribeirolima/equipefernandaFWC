"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinned, Route as RouteIcon, Compass, Clapperboard, CalendarDays } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const NAV = [
  {
    href: "/",
    label: "Deslocamentos",
    description: "NYC / NJ",
    Icon: RouteIcon,
  },
  {
    href: "/proximidades",
    label: "Locais próximos",
    description: "CDMX · NJ · Miami",
    Icon: Compass,
  },
  {
    href: "/locacoes",
    label: "Locações",
    description: "Para gravações ao vivo",
    Icon: Clapperboard,
  },
  {
    href: "/ordem-dia",
    label: "Ordem do Dia",
    description: "CazéTV · Copa 2026",
    Icon: CalendarDays,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm">
            <MapPinned className="h-4 w-4" />
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold">Painel da Delegação</span>
            <span className="truncate text-xs text-muted-foreground">Logística internacional</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.label}
                      className="h-auto py-2"
                    >
                      <item.Icon className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-[11px] text-muted-foreground group-data-[collapsible=icon]:hidden">
                          {item.description}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t group-data-[collapsible=icon]:hidden">
        <p className="px-2 py-1 text-[11px] leading-tight text-muted-foreground">
          Tempos e custos são estimativas. Pedágios e tarifas podem variar.
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
