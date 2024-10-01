import React,{useState} from "react";
import Link from "next/link";
import FormInput from "@/components/ui/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";
import { toast } from "sonner";

const UserServ = new UserService();
const employerSchema = z.object({
  company_name: z.string().min(2, "Company Name must be at least 2 characters"),
  first_name: z.string().min(2, "Company Name must be at least 2 characters"),
  last_name: z.string().min(2, "Company Name must be at least 2 characters"),
  company_email: z.string().email(),
  website_link: z.string().optional(),
  founded_date: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  description: z.string().min(2, "Description must be at least 2 characters"),

  phone: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  email_id: z.string().email(),
  country: z.string().min(2, "Country must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zip_code: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  full_address: z.string().min(2, "Full address must be at least 2 characters"),

  facebook_link: z.string().optional(),
  twitter_link: z.string().optional(),
  instagram_link: z.string().optional(),
  linkedin_link: z.string().optional(),
});

type employerValues = z.infer<typeof employerSchema>;

const CompanyProfile = ({ employerData }: any) => {
const [employerDetail, setEmployerDetail] = useState(employerData)
  const defaultValues: employerValues = {
    company_name: employerDetail?.company_name || "",
    company_email: employerDetail?.company_email || "",
    website_link: employerDetail?.website_link || "",
    founded_date: employerDetail?.founded_date || "",
    category: employerDetail?.category || "",
    location: employerDetail?.location || "",
    description: employerDetail?.description || "",
    first_name: employerDetail?.first_name || "",
    last_name: employerDetail?.last_name || "",
    phone: employerDetail?.phone || "",
    email_id: employerDetail?.email_id || "",
    country: employerDetail?.country || "",
    city: employerDetail?.city || "",
    zip_code: employerDetail?.zip_code || "",
    full_address: employerDetail?.full_address || "",

    facebook_link: employerDetail?.facebook_link || "",
    twitter_link: employerDetail?.twitter_link || "",
    instagram_link: employerDetail?.instagram_link || "",
    linkedin_link: employerDetail?.linkedin_link || "",
  };
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<employerValues>({
    resolver: zodResolver(employerSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<employerValues> = async (data: any) => {
    try {
      let response: any;
      const formData = new FormData();

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      formData.append("employer_id", employerDetail.employer_id);
      response = await UserServ.updateUser(formData, "employer");

      if (response.error) {
        toast.error(response.error);
        setError("root", {
          message: response.error,
        });
      } else if (response.data && response.message) {
        toast.success(response.message);
        setEmployerDetail(response.data);
      }
    } catch (error) {
      setError("root", {
        message: "something went wrong",
      });
    }
  };
  return (
    <>
      <div className="col-xl-9 col-lg-8 m-b30">
        <div className="job-bx submit-resume">
          <div className="job-bx-title clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase">Company Profile</h5>
            <Link href={"/company-profile"} className="site-button right-arrow button-sm float-right">
              Back
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row m-b30">
              <FormInput label={"Company Name"} errors={errors} name={"company_name"} register={register} />
              <FormInput label={"Company Email"} errors={errors} name={"company_email"} register={register} />
              <FormInput label={"Website"} errors={errors} name={"website_link"} register={register} />
              <FormInput label={"Founded Date"} errors={errors} name={"founded_date"} register={register} />

              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Category</label>
                  <select className="custom-select" {...register("category")} >
                    <option>Web Designer</option>
                    <option>Web Developer1</option>
                  </select>
                </div>
              </div>
              <FormInput label={"Location"} errors={errors} name={"location"} register={register} />

              <FormInput
                label={"Description"}
                errors={errors}
                name={"description"}
                register={register}
                cn={"col-lg-12 col-md-12"}
              />
            </div>

            <div className="job-bx-title clearfix">
              <h5 className="font-weight-700 pull-left text-uppercase">Contact Information</h5>
            </div>
            <div className="row m-b30">
            <FormInput label={"First Name"} errors={errors} name={"first_name"} register={register} />
            <FormInput label={"Last Name"} errors={errors} name={"last_name"} register={register} />
              <FormInput label={"Phone"} errors={errors} name={"phone"} register={register} />
              <FormInput label={"Email"} errors={errors} name={"email_id"} register={register} />
              <FormInput label={"Country"} errors={errors} name={"country"} register={register} />
              <FormInput label={"Zip code"} errors={errors} name={"zip_code"} register={register} />
              <FormInput label={"City"} errors={errors} name={"city"} register={register} />
              <FormInput label={"Full Address"} errors={errors} name={"full_address"} register={register} />
              {/* <div className="col-lg-12">
                <GoogleMaps
                  apiKey={"AIzaSyBPDjB2qkV4Yxn9h0tGSk2X5uH6NKmssXw"}
                  style={{ height: "300px", width: "100%", border: "0" }}
                  zoom={6}
                  center={{ lat: 37.4224764, lng: -122.0842499 }}
                  markers={{ lat: 37.4224764, lng: -122.0842499 }} //optional
                />
              </div> */}
            </div>

            <div className="job-bx-title clearfix">
              <h5 className="font-weight-700 pull-left text-uppercase">Social link</h5>
            </div>
            <div className="row">
              <FormInput label={"Facebook"} errors={errors} name={"facebook_link"} register={register} />
              <FormInput label={"Twitter"} errors={errors} name={"twitter_link"} register={register} />
              <FormInput label={"Instagram"} errors={errors} name={"instagram_link"} register={register} />
              <FormInput label={"Linkedin"} errors={errors} name={"linkedin_link"} register={register} />
            </div>
            <button type="submit" className="site-button m-b30">
            {isSubmitting ? "Saving..." : "Save Setting"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
