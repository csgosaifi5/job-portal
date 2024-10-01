"use client";
import React,{useState} from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import UserService from "@/services/UserService";

const UserServ = new UserService();

const CompanySidebar = ({ setCurrentTab,currentTab,employerData,setJobData }: any) => {
  const [employerDetail, setEmployerDetail] = useState(employerData)
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

    formData.append("employer_id", employerDetail.employer_id);
    formData.append("image", event.target.files[0]);

    try {
      const resp = await UserServ.updateUser(formData,"employer");
      if (resp.data) {
        setEmployerDetail(resp.data)
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
    <>
      <div className="col-xl-3 col-lg-4 m-b30">
        <div className="sticky-top">
          <div className="candidate-info company-info">
            <div className="candidate-detail text-center">
              <div className="canditate-des">
                <Link href={"#"}>
                  <img alt="" src={employerDetail?.image || "/images/logo/icon3.jpg"} />
                </Link>
                <div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
                  <input type="file" className="update-flie" onChange={handleFileChange}/>
                  <i className="fa fa-pencil"></i>
                </div>
              </div>
              <div className="candidate-title">
                <h4 className="m-b5">
                  <Link href={"#"}>{employerDetail?.company_name || "@Company"}</Link>
                </h4>
              </div>
            </div>
            <ul>
              <li>
                <Link href={"#"} onClick={() => setCurrentTab(0)} className={currentTab === 0 ? "active" : ""}>
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  <span>Company Profile</span>
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={() =>{ setCurrentTab(1); setJobData(null)}} className={currentTab === 1 ? "active" : ""}>
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  <span>Post A Job</span>
                </Link>
              </li>
              {/* <li>
                <Link href={"#"} onClick={() => setCurrentTab(2)} className={currentTab === 2 ? "active" : ""}>
                  <i className="fa fa-random" aria-hidden="true"></i>
                  <span>Transactions</span>
                </Link>
              </li> */}
              <li>
                <Link href={"#"} onClick={() => setCurrentTab(3)} className={currentTab === 3 ? "active" : ""}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Manage jobs</span>
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={() => setCurrentTab(4)} className={currentTab === 4 ? "active" : ""}>
                  <i className="fa fa-id-card-o" aria-hidden="true"></i>
                  <span>Resume</span>
                </Link>
              </li>
              <li>
                <Link href={"#"} onClick={() => setCurrentTab(5)} className={currentTab === 5 ? "active" : ""}>
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
    </>
  );
};

export default CompanySidebar;
