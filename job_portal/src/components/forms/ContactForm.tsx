"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactFormService from "@/services/ContactFormService";

const contactFormService = new ContactFormService();
const contactFormSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email(),
  message: z.string(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: ContactFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  message: "",
};
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      let response = await contactFormService.add(data);
      
      if (response.error) {
        setError("root", {
          message: response.error,
        });
      } else {
        reset();
      }
    } catch (error) {
      setError("root", {
        message: "something went wrong",
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="dzForm">
        <input type="hidden" value="Contact" name="dzToDo" />
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <div className="input-group">
                <input
                  {...register("first_name")}
                  type="text"
                  className={`form-control ${errors.first_name ? "border-danger" : ""}`}
                  placeholder="First Name"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <div className="input-group">
                <input
                  {...register("last_name")}
                  type="text"
                  className={`form-control ${errors.last_name ? "border-danger" : ""}`}
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <div className="input-group">
                <input
                  {...register("email")}
                  type="text"
                  className={`form-control ${errors.email ? "border-danger" : ""}`}
                  placeholder="Your Email Address"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <div className="input-group">
                <textarea
                  {...register("message")}
                  rows={4}
                  className={`form-control ${errors.message ? "border-danger" : ""}`}
                  placeholder="Your Message..."
                ></textarea>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-12">
            <div className="recaptcha-bx">
              <div className="input-group">
                <div
                  className="g-recaptcha"
                  data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN"
                  data-callback="verifyRecaptchaCallback"
                  data-expired-callback="expiredRecaptchaCallback"
                ></div>
                <input
                  className="form-control d-none"
                  style={{ display: "none" }}
                  data-recaptcha="true"
                  required
                  data-error="Please complete the Captcha"
                />
              </div>
            </div>
          </div> */}
          <div className="col-lg-12">
            <button disabled={isSubmitting} type="submit" className="site-button ">
              <span>{isSubmitting ? "Loading..." : "Submit"}</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
