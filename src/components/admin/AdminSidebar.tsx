
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Receipt,
  Users,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";

const AdminSidebar = () => {
  const adminMenuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      title: "Products",
      icon: Package,
      path: "/admin/products",
    },
    {
      title: "Sales Analytics",
      icon: BarChart3,
      path: "/admin/analyze",
    },
    {
      title: "Sales History",
      icon: Receipt, 
      path: "/admin/sales-history",
    },
    {
      title: "User Management",
      icon: Users,
      path: "/admin/user-management",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <NavLink to="/" className="w-10 h-10 rounded-full from-plum to-amethyst mr-1 group-data-[collapsible=icon]:mr-0 flex items-center justify-center">
            <img src="/mark.png" alt="Logo" className="h-10 w-10 rounded-full from-plum to-amethyst" />
          </NavLink>
          <span className="font-semibold text-lg bg-gradient-to-r from-metal to-plum bg-clip-text text-transparent duration-200 transition-opacity group-data-[collapsible=icon]:hidden group-data-[collapsible=icon]:opacity-0">
            Admin
          </span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            {adminMenuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                >
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => 
                      isActive ? "text-amethyst" : "text-metal dark:text-gray-400"
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-metal/60 dark:text-gray-400">
          Admin Panel v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
