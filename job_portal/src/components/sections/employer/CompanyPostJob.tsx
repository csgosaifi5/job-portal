"use client";
import Link from "next/link";
import CreatableSelect from "react-select/creatable";
import FormInput from "@/components/ui/FormInput";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import JobService from "@/services/JobService";
import util from "@/util/util";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "sonner";
const JobServ = new JobService();
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir",
];

const jobCategories = ["IT", "Sales", "Marketing", "Data Science", "HR", "Engineering"];

const jobSchema = z.object({
  title: z.string().min(2, "Title must be at most 255 characters"),
  contact_email: z.string().email(),
  job_type: z.string().min(2, "Job type must be at most 30 characters"),
  experience: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  min_salary: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  max_salary: z.preprocess((val) => parseInt(val as string, 10), z.number()),
  region: z.string().min(2, "Region must be at most 30 characters"),
  status: z.string().min(2, "Region must be at most 30 characters"),
  category: z.string().min(2, "Region must be at most 30 characters"),
  job_address: z.string().min(2, "Job address must be at most 300 characters"),
  job_requirements: z.string(),
  description: z.string(),
  file: z.any().optional(),
  tags: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  image: z.any().optional(),
});

type jobValues = z.infer<typeof jobSchema>;

const CompanyPostJob = ({ employerData, setCurrentTab, jobData }: any) => {
  const defaultValues = {
    title: jobData ? jobData.title : "",
    contact_email: jobData ? jobData.contact_email : "",
    job_type: jobData ? jobData.job_type : "Full Time",
    experience: jobData ? jobData.experience : 1,
    min_salary: jobData ? jobData.min_salary : 0,
    max_salary: jobData ? jobData.max_salary : 0,
    region: jobData ? jobData.region : "Delhi",
    category: jobData ? jobData.category : "IT",
    status: jobData ? jobData.status : "Active",
    job_address: jobData ? jobData.job_address : "",
    job_requirements: jobData ? jobData.job_requirements : "",
    description: jobData ? jobData.description : "",
    file: undefined,
    tags: jobData ? JSON.parse(jobData.tags) : [],
    image: undefined,
  };

  const {
    register,
    control,
    setValue,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<jobValues>({
    resolver: zodResolver(jobSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<jobValues> = async (data: any) => {
    console.log(data);

    try {
      let response: any;
      const formData = new FormData();

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === "tags") {
            formData.append(key, JSON.stringify(data[key]));
          }
          formData.append(key, data[key]);
        }
      }
      if (jobData) {
        formData.append("job_id", jobData.job_id);
      }
      formData.append("employer_id", employerData.employer_id);
      response = await JobServ.addJob(formData);

      if (response.error) {
        toast.error(response.error);
        setError("root", {
          message: response.error,
        });
      } else if (response.data && response.message) {
        toast.success(response.message);
        reset();
        setCurrentTab(3);
      }
    } catch (error) {
      setError("root", {
        message: "something went wrong",
      });
    }
  };
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setValue(e.target.name, e.target.files[0]);
    } else {
      setValue(e.target.name, undefined);
    }
  };

  return (
    <>
      <div className="col-xl-9 col-lg-8 m-b30">
        <div className="job-bx submit-resume">
          <div className="job-bx-title clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase">Post A Job</h5>
            <Link href={"/company-profile"} className="site-button right-arrow button-sm float-right">
              Back
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <FormInput label={"Job Title"} errors={errors} name={"title"} register={register} />
              <FormInput label={"Email"} errors={errors} name={"contact_email"} register={register} />
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Category</label>
                  <select className="custom-select" {...register("category")}>
                    {jobCategories.map((state) => (
                      <option selected={state === "IT"} key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Status</label>
                  <select className="custom-select" {...register("status")}>
                    <option selected value={"Active"}>
                      Active
                    </option>
                    <option selected value={"Disabled"}>
                      Disabled
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label>Job Tags</label>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <CreatableSelect
                        {...field}
                        isMulti
                        onChange={(value) => setValue("tags", [...value])}
                        options={[]} // Your options here
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Job Type</label>
                  <select className="custom-select" {...register("job_type")}>
                    <option value={"Full Time"}>Full Time</option>
                    <option value={"Part Time"}>Part Time</option>
                    <option value={"Internship"}>Internship</option>
                    <option value={"Freelance"}>Freelance</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Experience</label>
                  <select className="custom-select" {...register("experience")}>
                    <option selected value={1}>
                      1 Years
                    </option>
                    <option value={2}>2 Years</option>
                    <option value={3}>3 Years</option>
                    <option value={4}>4 Years</option>
                    <option value={5}>5 Years</option>
                  </select>
                </div>
              </div>
              <FormInput label={"Minimum Salary (LPA)"} errors={errors} name={"min_salary"} register={register} />
              <FormInput label={"Maximum Salary (LPA)"} errors={errors} name={"max_salary"} register={register} />

              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Region</label>
                  <select className="custom-select" {...register("region")}>
                    {indianStates.map((state) => (
                      <option selected={state === "Delhi"} key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <FormInput label={"Job Address"} errors={errors} name={"job_address"} register={register} />

              <div className={"col-lg-12 col-md-12"}>
                <div className="form-group">
                  <label>Description:</label>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
                        init={util.multiLineEditor}
                        value={field.value}
                        onEditorChange={(content) => field.onChange(content)}
                        onBlur={() => field.onBlur()}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={"col-lg-12 col-md-12"}>
                <div className="form-group">
                  <label>Job Requirements:</label>
                  <Controller
                    name="job_requirements"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
                        init={util.multiLineEditor}
                        value={field.value}
                        onEditorChange={(content) => field.onChange(content)}
                        onBlur={() => field.onBlur()}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label>Upload Image (Optional)</label>
                  <div className="custom-file">
                    <p className="m-a0">
                      <i className="fa fa-upload"></i>
                      Upload Image
                    </p>
                    <input type="file" className="site-button form-control" name="image" onChange={handleFileChange} />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label>Upload File (Optional)</label>
                  <div className="custom-file">
                    <p className="m-a0">
                      <i className="fa fa-upload"></i>
                      Upload File
                    </p>
                    <input type="file" className="site-button form-control" name="file" onChange={handleFileChange} />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="site-button m-b30">
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyPostJob;
