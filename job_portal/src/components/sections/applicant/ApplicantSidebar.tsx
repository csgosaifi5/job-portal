"use client";
import React,{useState} from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import UserService from "@/services/UserService";

const UserServ = new UserService();

const ApplicantSidebar = ({ setCurrentTab,currentTab,applicantData }: any) => {
  const [applicantDetail, setApplicantDetail] = useState(applicantData)
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    removeCookie("token", { path: "/", domain: process.env.NEXT_PUBLIC_DOMAIN });
    router.push("/");
  };

  const handleFileChange = async (event: any) => {
    const formData = new FormData();

    formData.append("applicant_id", applicantDetail.applicant_id);
    formData.append("image", event.target.files[0]);

    try {
      const resp = await UserServ.updateUser(formData,"applicant");
      if (resp.data) {
        setApplicantDetail(resp.data)
        console.log(resp.message);
      } else if (resp.error) {
        console.log(resp.error);
      }
    } catch (err) {
      // Handle error, e.g., showing an error message
      console.error(err);
    }
  };
  return (
    <div className="col-xl-3 col-lg-4 m-b30">
      <div className="sticky-top">
        <div className="candidate-info">
          <div className="candidate-detail text-center">
            <div className="canditate-des">
              <Link href={""}>
                <img alt="" src={applicantDetail?.image || "/images/team/pic1.jpg"} />
              </Link>
              <div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
                <input type="file" className="update-flie" onChange={handleFileChange}/>
                <i className="fa fa-camera"></i>
              </div>
            </div>
            <div className="candidate-title">
              <div className="">
                <h4 className="m-b5">
                  <Link href={"#"}>{applicantDetail.first_name+" "+applicantDetail.last_name}</Link>
                </h4>
                <p className="m-b0">
                  <Link href={"#"}>{applicantDetail.designation}</Link>
                </p>
              </div>
            </div>
          </div>
          <ul>
            <li>
              <Link href={"#"} onClick={() => setCurrentTab(0)} className={currentTab === 0 ? "active" : ""}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link href={"#"} onClick={() => setCurrentTab(1)} className={currentTab === 1 ? "active" : ""}>
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span>My Resume</span>
              </Link>
            </li>
            {/* <li>
              <Link href={"/jobs-saved-jobs"}>
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                <span>Saved Jobs</span>
              </Link>
            </li> */}
            <li>
              <Link href={"#"} onClick={() => setCurrentTab(2)} className={currentTab === 2 ? "active" : ""}>
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <span>Applied Jobs</span>
              </Link>
            </li>
            <li>
              <Link href={"#"} onClick={() => setCurrentTab(3)} className={currentTab === 3 ? "active" : ""}>
                <i className="fa fa-bell-o" aria-hidden="true"></i>
                <span>Job Alerts</span>
              </Link>
            </li>
            {/* <li>
              <Link href={"/jobs-cv-manager"}>
                <i className="fa fa-id-card-o" aria-hidden="true"></i>
                <span>CV Manager</span>
              </Link>
            </li> */}
            <li>
              <Link href={"#"} onClick={() => setCurrentTab(4)} className={currentTab === 4 ? "active" : ""}>
                <i className="fa fa-key" aria-hidden="true"></i>
                <span>Change Password</span>
              </Link>
            </li>
            <li>
              <Link href={"/"} onClick={handleLogout}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span>Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApplicantSidebar;
