"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  DollarSign,
  Globe,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Documents",
      icon: FileText,
      href: "/dashboard/documents",
      active: pathname.startsWith("/dashboard/documents"),
    },
    {
      label: "Finance",
      icon: DollarSign,
      href: "/dashboard/finance",
      active: pathname.startsWith("/dashboard/finance"),
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname.startsWith("/dashboard/analytics"),
    },
    {
      label: "Integrations",
      icon: Globe,
      href: "/dashboard/integrations",
      active: pathname.startsWith("/dashboard/integrations"),
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname.startsWith("/dashboard/settings"),
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">Leaseflow</span>
          </div>
        </div>
        <div className="px-3">
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    route.active ? "bg-accent text-accent-foreground" : "transparent"
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Button variant="outline" className="w-full justify-start gap-2" asChild>
          <Link href="/auth/logout">
            <LogOut className="h-4 w-4" />
            Log out
          </Link>
        </Button>
      </div>
    </div>
  );
}