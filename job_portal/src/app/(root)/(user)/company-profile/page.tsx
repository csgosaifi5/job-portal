"use client";
import { useState } from "react";
import { useUserAuth } from "@/context/userAuthContext";
import CompanySidebar from "@/components/sections/employer/CompanySidebar";
import CompanyProfile from "@/components/sections/employer/CompanyProfile";
import CompanyPostJob from "@/components/sections/employer/CompanyPostJob";
import CompanyTransactions from "@/components/sections/employer/CompanyTransactions";
import CompanyJobsList from "@/components/sections/employer/CompanyJobsList";
import CompnayResume from "@/components/sections/employer/CompnayResume";
import ChangePassword from "@/components/sections/applicant/ChangePassword";

const Page = () => {
  const { isLoading, setIsLoading, user, setUser } = useUserAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [jobData, setJobData] = useState(null);

  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanySidebar
                  setCurrentTab={setCurrentTab}
                  setJobData={setJobData}
                  currentTab={currentTab}
                  employerData={user.employer_id ? user : null}
                />
                {currentTab === 0 && <CompanyProfile employerData={user.employer_id ? user : null} />}
                {currentTab === 1 && (
                  <CompanyPostJob employerData={user.employer_id ? user : null} setCurrentTab={setCurrentTab} jobData={jobData}/>
                )}
                {currentTab === 2 && <CompanyTransactions />}
                {currentTab === 3 && (
                  <CompanyJobsList
                    employerData={user.employer_id ? user : null}
                    setCurrentTab={setCurrentTab}
                    setJobData={setJobData}
                  />
                )}
                {currentTab === 4 && <CompnayResume employerData={user.employer_id ? user : null} />}
                {currentTab === 5 && <ChangePassword  employerData={user.employer_id ? user : null} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
