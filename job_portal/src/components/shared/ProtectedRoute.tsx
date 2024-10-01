// /components/ProtectedRoute.tsx
"use client";
import { Skeleton } from "@/components/ui/Skeleton";
import { useUserAuth } from "@/context/userAuthContext";
import { useRouter, usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import UserService from "@/services/UserService";

const userServ = new UserService();

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isLoading, setIsLoading, user, setUser } = useUserAuth();
  const pathname = usePathname();
  const router = useRouter();
  const userDetail = async () => {
    let response;
    try {
      let token = null;
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }

      if (token) {
        response = await userServ.isLoginActive({
          token: token,
          loginType: pathname.includes("applicant") ? "applicant" : "employer",
        });

        if (response.status === "noactive") {
          router.push("/");
        } else {
          setUser(response.userData);
          setIsLoading(false);
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      !user ||
      (user?.applicant_id && pathname.includes("company-profile")) ||
      (user?.employer_id && pathname.includes("applicant-profile"))
    ) {
      userDetail();
    }
  }, [pathname]);

  if (!user) {
    return <Skeleton className="h-[80vh] container-main mx-10 my-10" style={{ height: "80vh", margin: "10px" }} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
