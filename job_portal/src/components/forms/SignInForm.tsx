"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";
import { useCookies } from "react-cookie";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const userService = new UserService();
const loginSchema = z.object({
  email_id: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters required"),
  loginType: z.string().min(2, "Please select login type"),
});

type loginValues = z.infer<typeof loginSchema>;

const defaultValues: loginValues = {
  email_id: "",
  password: "",
  loginType: "",
};
const SignInForm = () => {
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
      let response = await userService.login(data);

      if (response.error) {
        toast.error(response.error);
        setError("root", {
          message: response.error,
        });
      } else if (response.user && response.message && response.token) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        setCookie("token", response.token, {
          path: "/",
          maxAge: 86400, // Expires after 24hr
          // sameSite: true,
          sameSite: "lax",
          domain: process.env.NEXT_PUBLIC_DOMAIN,
        });

        if (response.user.employer_id) router.push("/company-profile");
        if (response.user.applicant_id) router.push("/applicant-profile");
      }
    } catch (error) {
      toast.error("something went wrong");
      setError("root", {
        message: "something went wrong",
      });
    }
  };

  return (
    <>
      <form className="col-12 p-a0 " onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group ">
          <label>E-Mail Address*</label>
          <div className="input-group">
            <input
              type="email"
              {...register("email_id")}
              className="form-control"
              placeholder="Type Your Email Address"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Password *</label>
          <div className="input-group">
            <input
              type="password"
              {...register("password")}
              className="form-control"
              placeholder="Type Your Password"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="font-weight-700 mr-2">I&apos;m a</label>
          <div className="form-check form-check-inline mr-3">
            <input
              className="form-check-input"
              type="radio"
              {...register("loginType")}
              value="applicant"
              id="inlineRadio1"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Applicant
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              {...register("loginType")}
              value="employer"
              id="inlineRadio2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Employer
            </label>
          </div>
        </div>
        <div className="text-center">
          <button className="site-button float-left">{isSubmitting ? "Loading..." : "login"}</button>

          <Link data-toggle="tab" href="/forgot-password" className="forget-pass m-l5">
            <i className="fa fa-unlock-alt"></i> Forgot Password
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
