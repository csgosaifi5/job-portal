"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import JobService from "@/services/JobService";
const JobServ = new JobService();
const ApplyJobButton = ({ jobData }: any) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any | null>(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      let parsedUser: any;
      if (user) {
        parsedUser = JSON.parse(user);
        setUserData(parsedUser);
      }
      if (parsedUser && parsedUser?.applicant_id) {
        fetchJobApplication(parsedUser.applicant_id, jobData.employer_id, jobData.job_id);
      }
    }
  }, []);

  const fetchJobApplication = async (applicantId: number, employerId: number, jobId: number) => {
    try {
      const response = await JobServ.HaveApplicantAppliedJob({ applicantId, employerId, jobId });
      if (response.data) {
        setAlreadyApplied(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const applyJob = async (applicantId: number, employerId: number, jobId: number) => {
    try {
      const response = await JobServ.applyJob({ applicantId, employerId, jobId });  
      if (response.data) {
        setAlreadyApplied(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (!userData?.applicant_id) {
      router.push("/sign-in");
      return;
    }else{
        applyJob(userData.applicant_id, jobData.employer_id, jobData.job_id);
    }
  };

  return (
    <>
      <button
        className="site-button"
        style={{ backgroundColor: alreadyApplied ? "grey" : "" }}
        disabled={alreadyApplied}
        onClick={handleClick}
      >
        {alreadyApplied ? "Applied" : "Apply This Job"}
      </button>
    </>
  );
};

export default ApplyJobButton;
