"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";
import { Toaster, toast } from "sonner";

import Link from "next/link";

const UserServ = new UserService();
const userSchema = z
  .object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    email_id: z.string().email(),
    password: z.string().min(8, "Minimum 8 characters required"),
    confirm_password: z.string().min(8, "Minimum 8 characters required"),
    registerType: z.string().min(2, "Please select a type of registration"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type userValues = z.infer<typeof userSchema>;

const defaultValues: userValues = {
  first_name: "",
  last_name: "",
  email_id: "",
  password: "",
  confirm_password: "",
  registerType: "",
};

const Register = () => {
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

  const onSubmit: SubmitHandler<userValues> = async (data) => {
    try {
      let response;
      if (data.registerType === "applicant") {
        response = await UserServ.registerUser(data, "applicant");
      } else if (data.registerType === "employer") {
        response = await UserServ.registerUser(data, "employer");
      }

      if (response.error) {
        toast.error(response.error);
        setError("root", {
          message: response.error,
        });
      } else if (response.result && response.message) {
        toast.success(response.message);
        setTimeout(() => {
          reset();
        }, 3000);
          
      }
    } catch (error) {
      setError("root", {
        message: "something went wrong",
      });
    }
  };
  return (<>
      <form id="login" onSubmit={handleSubmit(onSubmit)} className="tab-pane active">
        <h4 className="font-weight-700 m-b5">PERSONAL INFORMATION</h4>
        <p className="font-weight-600">
          If you have an account with us, Please <Link href={"/sign-in"}> Sign in.</Link>
        </p>
        <div className="form-group">
          <label className="font-weight-700">
            First Name *
            {errors.first_name && <span className="text-danger">&nbsp;&nbsp;{`(${errors.first_name?.message})`}</span>}
          </label>
          <input {...register("first_name")} className="form-control" placeholder="First Name" type="text" />
        </div>
        <div className="form-group">
          <label className="font-weight-700">
            Last Name *
            {errors.last_name && <span className="text-danger">&nbsp;&nbsp;{`(${errors.last_name?.message})`}</span>}
          </label>
          <input {...register("last_name")} className="form-control" placeholder="Last Name" type="text" />
        </div>
        <div className="form-group">
          <label className="font-weight-700">
            E-MAIL *
            {errors.email_id && <span className="text-danger">&nbsp;&nbsp;{`(${errors.email_id?.message})`}</span>}{" "}
          </label>
          <input {...register("email_id")} className="form-control" placeholder="Your Email Address" type="email_id" />
        </div>
        <div className="form-group">
          <label className="font-weight-700">
            Password *{" "}
            {errors.password && <span className="text-danger">&nbsp;&nbsp;{`(${errors.password?.message})`}</span>}
          </label>
          <input {...register("password")} className="form-control " placeholder="Type Password" type="password" />
        </div>
        <div className="form-group">
          <label className="font-weight-700">
            Confirm Password *{" "}
            {errors.confirm_password && (
              <span className="text-danger">&nbsp;&nbsp;{`(${errors.confirm_password?.message})`}</span>
            )}
          </label>
          <input
            {...register("confirm_password")}
            className="form-control "
            placeholder="Type Password"
            type="password"
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700 mr-2">I&apos;m a</label>
          <div className="form-check form-check-inline mr-3">
            <input
              className="form-check-input"
              type="radio"
              {...register("registerType")}
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
              {...register("registerType")}
              value="employer"
              id="inlineRadio2"
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Employer
            </label>
          </div>
          {errors.registerType && <div className="text-danger mt-2">{`(${errors.registerType?.message})`}</div>}
        </div>

        <div className="text-left">
          <button disabled={isSubmitting} type="submit" className="site-button float-left">
            {isSubmitting ? "LOADING..." : "CREATE"}
          </button>
        </div>
      </form>
    <Toaster toastOptions={{ duration: 3000 }} position="top-right" richColors />
    </>
  );
};

export default Register;
