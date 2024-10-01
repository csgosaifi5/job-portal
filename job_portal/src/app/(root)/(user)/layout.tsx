"use client";
import { UserProvider } from "@/context/userAuthContext";
import { PropsWithChildren } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { Toaster } from "sonner";

const UserLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserProvider>
      <ProtectedRoute>
      <Toaster toastOptions={{ duration: 3000 }} position="top-right" richColors />
        {children}
      </ProtectedRoute>
    </UserProvider>
  );
};

export default UserLayout;
