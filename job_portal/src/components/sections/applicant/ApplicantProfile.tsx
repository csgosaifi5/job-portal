import React,{useState} from "react";
import Link from "next/link";
import FormInput from "@/components/ui/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";
import { toast } from "sonner";

const UserServ = new UserService();
const userSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  designation: z.string().min(2, "Last name must be at least 2 characters"),
  languages: z.string().min(2, "Last name must be at least 2 characters"),
  age: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  current_ctc: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  expected_ctc: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  description: z.string().min(2, "Description must be at least 2 characters"),
  phone: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  email_id: z.string().email(),
  country: z.string().min(2, "Last name must be at least 2 characters"),
  zip_code: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  city: z.string().min(2, "Last name must be at least 2 characters"),
  full_address: z.string().min(2, "Last name must be at least 2 characters"),
});

type userValues = z.infer<typeof userSchema>;

const ApplicantProfile = ({ applicantData }: any) => {
  const [applicantDetail, setApplicantDetail] = useState(applicantData)
  const defaultValues: ApplicantAttributes = {
    first_name: applicantDetail?.first_name || "",
    last_name: applicantDetail?.last_name || "",
    email_id: applicantDetail?.email_id || "",
    languages: applicantDetail?.languages || "",
    phone: applicantDetail?.phone || "",
    age: applicantDetail?.age || "",
    country: applicantDetail?.country || "",
    city: applicantDetail?.city || "",
    zip_code: applicantDetail?.zip_code || "",
    full_address: applicantDetail?.full_address || "",
    description: applicantDetail?.description || "",
    designation: applicantDetail?.designation || "",
    current_ctc: applicantDetail?.current_ctc || "",
    expected_ctc: applicantDetail?.expected_ctc || "",
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
      const formData = new FormData();

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      formData.append("applicant_id", applicantDetail.applicant_id);
      response = await UserServ.updateUser(formData,"applicant");

      if (response.error) {
        toast.error(response.error);
        setError("root", {
          message: response.error,
        });
      } else if (response.data) {
        toast.success("profile updated successfully");
        setApplicantDetail(response.data);
        reset({
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          email_id: response.data.email_id || "",
          languages: response.data.languages || "",
          phone: response.data.phone || "",
          age: response.data.age || "",
          country: response.data.country || "",
          city: response.data.city || "",
          zip_code: response.data.zip_code || "",
          full_address: response.data.full_address || "",
          description: response.data.description || "",
          designation: response.data.designation || "",
          current_ctc: response.data.current_ctc || "",
          expected_ctc: response.data.expected_ctc || "",
        });
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
          <h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5>
          <Link href={"#"} className="site-button right-arrow button-sm float-right">
            Back
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row m-b30">
            <FormInput label={"First Name"} errors={errors} name={"first_name"} register={register} />
            <FormInput label={"Last Name"} errors={errors} name={"last_name"} register={register} />
            <FormInput label={"Professional title"} errors={errors} name={"designation"} register={register} />
            <FormInput label={"Languages"} errors={errors} name={"languages"} register={register} />
            <FormInput label={"Age"} name={"age"} errors={errors} register={register} />
            <FormInput label={"Current Salary(Rs)"} errors={errors} name={"current_ctc"} register={register} />
            <FormInput label={"Expected Salary"} errors={errors} name={"expected_ctc"} register={register} />

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
          <div className="row">
            <FormInput label={"Phone"} errors={errors} name={"phone"} register={register} />
            <FormInput label={"Email Address"} errors={errors} name={"email_id"} register={register} />
            <FormInput label={"Country"} errors={errors} name={"country"} register={register} />
            <FormInput label={"Zip code"} errors={errors} name={"zip_code"} register={register} />
            <FormInput label={"City"} errors={errors} name={"city"} register={register} />
            <FormInput label={"Full Address"} errors={errors} name={"full_address"} register={register} />
          </div>
          <button className="site-button m-b30">{isSubmitting ? "Saving..." : "Save Setting"}</button>
        </form>
      </div>
    </div>
  );
};

export default ApplicantProfile;
