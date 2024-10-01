import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const UserServ = new UserService();
const userSchema = z
  .object({
    old_password: z.string().min(8, "Minimum 8 characters"),
    new_password: z.string().min(8, "Minimum 8 characters"),
    confirm_password: z.string().min(8, "Minimum 8 characters"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type userValues = z.infer<typeof userSchema>;

const ChangePassword = ({ applicantData, employerData }: any) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const defaultValues: userValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<userValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<userValues> = async (data: any) => {
    try {
      let response: any;

      if (applicantData) {
        data.applicant_id = applicantData.applicant_id;
      }
      if (employerData) {
        data.employer_id = employerData.employer_id;
      }

      response = await UserServ.changePassword(data);

      if (response.error) {
        toast.error(response.error);
        setError("root", {
          message: response.error,
        });
      } else if (response.result && response.message) {
        toast.success(response.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        removeCookie("token", { path: "/", domain: process.env.NEXT_PUBLIC_DOMAIN });
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
        reset();
      }
    } catch (error) {
      toast.error("something went wrong");
      setError("root", {
        message: "something went wrong",
      });
    }
  };
  return (
    <div className="col-xl-9 col-lg-8 m-b30">
      <div className="job-bx job-profile">
        <div className="job-bx-title clearfix">
          <h5 className="font-weight-700 pull-left text-uppercase">Change Password</h5>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label>Old Password</label>
                <input type="text" {...register("old_password")} className="form-control" />
                {errors.old_password && (
                  <div className="text-danger">&nbsp;&nbsp;{`(${errors.old_password?.message})`}</div>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>New Password </label>
                <input type="password" {...register("new_password")} className="form-control" />
                {errors.new_password && (
                  <div className="text-danger">&nbsp;&nbsp;{`(${errors.new_password?.message})`}</div>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Confirm New Password *</label>
                <input type="password" {...register("confirm_password")} className="form-control" />
                {errors.confirm_password && (
                  <div className="text-danger">&nbsp;&nbsp;{`(${errors.confirm_password?.message})`}</div>
                )}
              </div>
            </div>
            <div className="col-lg-12 m-b10">
              <button type="submit" className="site-button">
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
