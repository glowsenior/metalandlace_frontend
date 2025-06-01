
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen pt-[71px]">
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full min-h-[calc(100vh-71px)]">
          <AdminSidebar />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
