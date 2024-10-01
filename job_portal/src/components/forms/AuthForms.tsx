"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";
import { useCookies } from "react-cookie";
import { Toaster, toast } from "sonner";
import { usePathname } from "next/navigation";
import SignInForm from "./SignInForm";
import Register from "./RegisterForm";

const AuthForms = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="nav">
        <p className="font-weight-600">
        {pathname === "/sign-in" ? "Don't have an account with us," :"Have an account with us,"}
          <Link href={pathname === "/sign-in" ? "/register" :"/sign-in"} className="ms-3" style={{ color: "#2e55fa" }}>
            <i className="fa fa-unlock-alt"></i>{pathname === "/sign-in" ? " Sign up" :" Sign in"} 
          </Link>
        </p>
        {pathname === "/sign-in" && <SignInForm />}
        {pathname === "/register" && <Register />}
      </div>
      <Toaster toastOptions={{ duration: 3000 }} position="top-right" richColors />
    </>
  );
};

export default AuthForms;
