"use client";
import React, { useState, useEffect } from "react";
import { useUserAuth } from "@/context/userAuthContext";
import ApplicantSidebar from "@/components/sections/applicant/ApplicantSidebar";
import Link from "next/link";
import ApplicantProfile from "@/components/sections/applicant/ApplicantProfile";
import ApplicantAppliedJobs from "@/components/sections/applicant/ApplicantAppliedJobs";
import ChangePassword from "@/components/sections/applicant/ChangePassword";
import ApplicantJobAlert from "@/components/sections/applicant/ApplicantJobAlert";
import ApplicantResume from "@/components/sections/applicant/ApplicantResume";

const Page = () => {
  const { isLoading, setIsLoading, user, setUser } = useUserAuth();
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ApplicantSidebar
                  setCurrentTab={setCurrentTab}
                  currentTab={currentTab}
                  applicantData={user.applicant_id ? user : null}
                />
                {currentTab === 0 && <ApplicantProfile applicantData={user.applicant_id ? user : null} />}
                {currentTab === 1 && <ApplicantResume applicantData={user.applicant_id ? user : null}/>}
                {currentTab === 2 && <ApplicantAppliedJobs applicantData={user.applicant_id ? user : null}/>}
                {currentTab === 3 && <ApplicantJobAlert />}
                {currentTab === 4 && <ChangePassword applicantData={user.applicant_id ? user : null}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
