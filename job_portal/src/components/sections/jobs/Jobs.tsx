import React from "react";
import Link from "next/link";
import BannerTitle from "@/components/shared/BannerTitle";
import JobsClient from "./JobsClient";
import CommonService from "@/services/CommonService";

const Jobs = async() => {
  const commServ = new CommonService();
  let latestJobs = [];
  let jobsCount = null;
  let search = {
    start: 0,
    perPage: 6,
  };

  let result = await commServ.listAll(search, "jobs", "PATCH");

  if (result && result.rows) {
    latestJobs = result.rows;
    jobsCount = result.count;
  }
  return (
    <>
      <div className="page-content bg-white">
        <BannerTitle motherName="Home" activeName="Jobs" imageUrl="/images/banner/bnr1.jpg" />
        <JobsClient jobsData={latestJobs} count={jobsCount}/>
        
      </div>
    </>
  );
};

export default Jobs;
