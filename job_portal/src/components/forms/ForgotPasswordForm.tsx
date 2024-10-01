"use client";
import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const userService = new UserService();
const loginSchema = z
  .object({
    email_id: z.string().email().optional(),
    otp: z
      .string()
      .optional()
      .refine((val: any) => val.length === 0 || val.length >= 6, {
        message: "Minimum 6 characters required",
      }),
    password: z
      .string()
      .optional()
      .refine((val: any) => val.length === 0 || val.length >= 8, {
        message: "Minimum 8 characters required",
      }),
    confirm_password: z
      .string()
      .optional()
      .refine((val: any) => val.length === 0 || val.length >= 8, {
        message: "Minimum 8 characters required",
      }),
  })
  .refine(
    (data) => {
      if (data.password || data.confirm_password) {
        return data.password === data.confirm_password;
      }
      return true;
    },
    {
      message: "Passwords must match",
      path: ["confirm_password"],
    }
  );

type loginValues = z.infer<typeof loginSchema>;

const defaultValues: loginValues = {
  email_id: "",
  otp: "",
  password: "",
  confirm_password: "",
};
const ForgotPasswordForm = () => {
  const [isEnterOtp, setIsEnterOtp] = useState(false);
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["token"]);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<loginValues> = async (data) => {
    try {
      if (!isEnterOtp) {
        let response = await userService.forgotPassword(data);

        if (response.error) {
            toast.error(response.error);
          setError("root", {
            message: response.error,
          });
        } else if (response.result && response.message) {
          toast.success(response.message);
          setIsEnterOtp(true);
        }
      } else {
        let response = await userService.resetPassword(data);

        if (response.error) {
            toast.error(response.error);
          setError("root", {
            message: response.error,
          });
        } else if (response.result && response.message) {
          toast.success(response.message);
          setTimeout(() => {
            reset();
            router.push("/sign-in");
          }, 3000);
        }
      }
    } catch (error) {
      setError("root", {
        message: "something went wrong",
      });
    }
  };

  return (
    <>
      <div className="nav">
        <form className="col-12 p-a0 " onSubmit={handleSubmit(onSubmit)}>
          {!isEnterOtp && (
            <div className="form-group ">
              <label>
                E-Mail Address*
                {errors.email_id && <span className="text-danger">&nbsp;&nbsp;{`(${errors.email_id?.message})`}</span>}
              </label>
              <div className="input-group">
                <input
                  type="email"
                  {...register("email_id")}
                  className="form-control"
                  placeholder="Type Your Email Address"
                />
              </div>
            </div>
          )}
          {isEnterOtp && (
            <>
              <div className="form-group ">
                <label>
                  OTP*
                  {errors.otp && <span className="text-danger">&nbsp;&nbsp;{`(${errors.otp?.message})`}</span>}
                </label>
                <div className="input-group">
                  <input type="text" {...register("otp")} className="form-control" placeholder="Type OTP" />
                </div>
              </div>
              <div className="form-group ">
                <label>
                  New Password*
                  {errors.password && (
                    <span className="text-danger">&nbsp;&nbsp;{`(${errors.password?.message})`}</span>
                  )}
                </label>
                <div className="input-group">
                  <input type="text" {...register("password")} className="form-control" placeholder="Type Password" />
                </div>
              </div>
              <div className="form-group ">
                <label>
                  Confirm Password*
                  {errors.confirm_password && (
                    <span className="text-danger">&nbsp;&nbsp;{`(${errors.confirm_password?.message})`}</span>
                  )}
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    {...register("confirm_password")}
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </>
          )}
          <div className="text-center d-flex justify-content-between align-items-center">
            <button className="site-button float-left">{isSubmitting ? "Loading..." : "Submit"}</button>

            <Link data-toggle="tab" href="/sign-in" className="forget-pass m-l5">
              <i className="fa fa-unlock-alt"></i> Sign-in
            </Link>
          </div>
        </form>
      </div>
      <Toaster toastOptions={{ duration: 3000 }} position="top-right" richColors />
    </>
  );
};

export default ForgotPasswordForm;
