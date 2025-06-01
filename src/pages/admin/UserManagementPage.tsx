
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Edit, Trash2, UserPlus, Ban, Undo2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserFormDialog from "@/components/admin/UserFormDialog";
import ConfirmActionDialog from "@/components/admin/ConfirmActionDialog";
import { User, UserFormData } from "@/types/user";
import { toast } from "@/hooks/use-toast"; // Ensure this path is correct

const initialUsersData: User[] = [
  {
    id: "usr_1",
    name: "Alice Wonderland",
    email: "alice@example.com",
    role: "Customer",
    joined: "2025-01-15",
    status: "active",
  },
  {
    id: "usr_2",
    name: "Bob The Admin",
    email: "bob.admin@example.com",
    role: "Admin",
    joined: "2024-12-01",
    status: "active",
  },
  {
    id: "usr_3",
    name: "Charlie User",
    email: "charlie@example.com",
    role: "Editor",
    joined: "2025-03-20",
    status: "banned",
  },
];

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>(initialUsersData);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
  const [isConfirmBanDialogOpen, setIsConfirmBanDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const openAddUserDialog = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setIsUserFormOpen(true);
  };

  const openEditUserDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsUserFormOpen(true);
  };

  const openDeleteUserDialog = (user: User) => {
    setSelectedUser(user);
    setIsConfirmDeleteDialogOpen(true);
  };

  const openBanUserDialog = (user: User) => {
    setSelectedUser(user);
    setIsConfirmBanDialogOpen(true);
  };

  const handleAddUser = (data: UserFormData) => {
    const newUser: User = {
      ...data,
      id: uuidv4(),
      joined: new Date().toISOString().split("T")[0],
      status: "active",
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
    toast({ title: "User Added", description: `${data.name} has been successfully added.` });
  };

  const handleEditUser = (data: UserFormData) => {
    if (!selectedUser) return;
    setUsers(prevUsers =>
      prevUsers.map(u => (u.id === selectedUser.id ? { ...u, ...data } : u))
    );
    toast({ title: "User Updated", description: `${data.name}'s details have been updated.` });
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers(prevUsers => prevUsers.filter(u => u.id !== selectedUser.id));
    toast({ title: "User Deleted", description: `${selectedUser.name} has been deleted.`, variant: "destructive" });
    setSelectedUser(null);
    setIsConfirmDeleteDialogOpen(false);
  };

  const handleToggleBanUser = () => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === "active" ? "banned" : "active";
    setUsers(prevUsers =>
      prevUsers.map(u => (u.id === selectedUser.id ? { ...u, status: newStatus } : u))
    );
    toast({
      title: `User ${newStatus === "banned" ? "Banned" : "Unbanned"}`,
      description: `${selectedUser.name} has been ${newStatus === "banned" ? "banned" : "unbanned"}.`,
      variant: newStatus === "banned" ? "destructive" : "default",
    });
    setSelectedUser(null);
    setIsConfirmBanDialogOpen(false);
  };


  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-8rem)] py-[91px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-amethyst mr-3" />
            <h1 className="text-3xl font-serif font-bold text-metal">User Management</h1>
          </div>
          <Button className="bg-amethyst hover:bg-plum text-white" onClick={openAddUserDialog}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>

        <Card className="shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-metal dark:text-white">All Users</CardTitle>
            <CardDescription className="text-metal/70 dark:text-gray-400">
              Manage all registered users in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of all users.</TableCaption>
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead className="text-metal/70 dark:text-gray-400">Name</TableHead>
                  <TableHead className="text-metal/70 dark:text-gray-400">Email</TableHead>
                  <TableHead className="text-metal/70 dark:text-gray-400">Role</TableHead>
                  <TableHead className="text-metal/70 dark:text-gray-400">Joined Date</TableHead>
                  <TableHead className="text-metal/70 dark:text-gray-400">Status</TableHead>
                  <TableHead className="text-right text-metal/70 dark:text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id} className={`dark:border-gray-700 ${user.status === 'banned' ? 'bg-red-100 dark:bg-red-900/30 opacity-70' : ''}`}>
                    <TableCell className="font-medium text-metal dark:text-gray-200">{user.name}</TableCell>
                    <TableCell className="text-metal dark:text-gray-300">{user.email}</TableCell>
                    <TableCell className="text-metal dark:text-gray-300">{user.role}</TableCell>
                    <TableCell className="text-metal dark:text-gray-300">{user.joined}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'
                          : 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:text-amethyst dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-amethyst"
                        onClick={() => openEditUserDialog(user)}
                        disabled={user.status === 'banned'}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:text-red-500 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-red-500"
                        onClick={() => openDeleteUserDialog(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                       <Button
                        variant="outline"
                        size="icon"
                        className={`${user.status === 'active' ? 'hover:text-orange-500 dark:hover:text-orange-400' : 'hover:text-green-500 dark:hover:text-green-400'} dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700`}
                        onClick={() => openBanUserDialog(user)}
                      >
                        {user.status === 'active' ? <Ban className="h-4 w-4" /> : <Undo2 className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <UserFormDialog
        open={isUserFormOpen}
        onOpenChange={setIsUserFormOpen}
        onSubmit={isEditMode ? handleEditUser : handleAddUser}
        defaultValues={selectedUser ? { name: selectedUser.name, email: selectedUser.email, role: selectedUser.role } : undefined}
        isEditMode={isEditMode}
      />

      <ConfirmActionDialog
        open={isConfirmDeleteDialogOpen}
        onOpenChange={setIsConfirmDeleteDialogOpen}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        actionLabel="Delete"
        actionVariant="destructive"
      />

      <ConfirmActionDialog
        open={isConfirmBanDialogOpen}
        onOpenChange={setIsConfirmBanDialogOpen}
        onConfirm={handleToggleBanUser}
        title={selectedUser?.status === "active" ? "Ban User" : "Unban User"}
        description={`Are you sure you want to ${selectedUser?.status === "active" ? "ban" : "unban"} ${selectedUser?.name}?`}
        actionLabel={selectedUser?.status === "active" ? "Ban User" : "Unban User"}
        actionVariant={selectedUser?.status === "active" ? "destructive" : "default"}
      />
    </div>
  );
};

export default UserManagementPage;
