"use client";
import Link from "next/link";
import UserService from "@/services/UserService";
import { toast } from "sonner";

const UserServ = new UserService();
const ApplicantResume = ({ applicantData }: any) => {

  const handleFileChange = async (event: any) => {
    const formData = new FormData();

    formData.append("applicant_id", applicantData.applicant_id);
    formData.append("resume", event.target.files[0]);

    try {
      const resp = await UserServ.updateUser(formData,"applicant");
      if (resp.data) {
        toast.success(resp.message);
        console.log(resp.message);
      } else if (resp.error) {
        toast.error(resp.error);
        console.log(resp.error);
      }
    } catch (err) {
      // Handle error, e.g., showing an error message
      console.error(err);
    }
  };

  return (
    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
      <div id="attach_resume_bx" className="job-bx bg-white m-b30">
        <h5 className="m-b10">Attach Resume</h5>
        <p>
          Resume is the most important document recruiters look for. Recruiters generally do not look at profiles
          without resumes.
        </p>
        <form className="attach-resume">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <div className="custom-file">
                  <p className="m-auto align-self-center">
                    <i className="fa fa-upload"></i>
                    Upload Resume File size is 3 MB
                  </p>
                  <input type="file" className="site-button form-control" id="customFile" onChange={handleFileChange} />
                </div>
              </div>
            </div>
          </div>
        </form>
        {applicantData.resume_url && (
          <p className="text-center">
            {applicantData.resume_url.replace("/uploads/files/"," ")}{" "}
            <Link href={applicantData.resume_url} className="site-button-link" download target="_blank">
              Download
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicantResume;
