import { useState, useEffect } from "react";
import Link from "next/link";
import JobService from "@/services/JobService";
import util from "@/util/util";
import { formatDistanceToNow } from "date-fns";
const postBlog = [{ title: "PHP Web Developer" }, { title: "Software Developer" }, { title: "Branch Credit Manager" }];

const JobServ = new JobService();
const ApplicantAppliedJobs = ({ applicantData }: any) => {
  const [appliedjobs, setAppliedjobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 5,
    applicantId: applicantData.applicant_id,
    sortBy: { createdAt: "desc" },
    filter: {
      searchText: "",
    },
  });
  const fetchAppliedJobs = async () => {
    try {
      const response = await JobServ.fetchAppliedJobs(search);
      if (response.error) {
        console.log(response.error);
      } else if (response) {
        setAppliedjobs(response.rows);
        setJobCount(response.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const handlePageNext = () => {
    if (search.start + search.perPage < jobCount) {
      setSearch({ ...search, start: search.start + search.perPage });
    }
  };

  const handlePagePrevious = () => {
    if (search.start > 0) {
      setSearch({ ...search, start: search.start - search.perPage });
    }
  };

  const totalPages = Math.ceil(jobCount / search.perPage);
  const currentPage = Math.floor(search.start / search.perPage) + 1;
  return (
    <>
      <div className="col-xl-9 col-lg-8 m-b30 browse-job">
        <div className="job-bx-title  clearfix">
          <h5 className="font-weight-700 pull-left text-uppercase">2269 Jobs Found</h5>
          <div className="float-right">
            <span className="select-title">Sort by freshness</span>
            <select className="custom-btn">
              <option>Last 2 Months</option>
              <option>Last Months</option>
              <option>Last Weeks</option>
              <option>Last 3 Days</option>
            </select>
          </div>
        </div>
        <ul className="post-job-bx browse-job">
          {appliedjobs.length > 0 &&
            appliedjobs.map((job: any, index: number) => {
              const timeAgo = formatDistanceToNow(new Date(job.createdAt), { addSuffix: true });
              const jobTags = JSON.parse(job.tags) || [];
              console.log(jobTags);

              return (
                <li key={index}>
                  <div className="post-bx">
                    <div className="job-post-info m-a0">
                      <h4>
                        <Link href={`/jobs/job-detail/${job.slug}`}>{job.title}</Link>
                      </h4>
                      <ul>
                        <li>
                          <Link href={"/company-profile"}>@company-name</Link>
                        </li>
                        <li>
                          <i className="fa fa-map-marker"></i> {job.job_address}, {job.region}
                        </li>
                        <li>
                          <i className="fa fa-money"></i> &#8377;
                          {job.min_salary * 100000} - &#8377;{job.max_salary * 100000}
                        </li>
                      </ul>
                      <div className="job-time m-t15 m-b10">
                        {jobTags.length > 0 &&
                          jobTags.map((tag: any, index: number) => {
                            return (
                              <Link href={""} key={index} className="mr-1">
                                <span>{tag.label}</span>
                              </Link>
                            );
                          })}
                      </div>
                      <div className="posted-info clearfix">
                        <p className="m-tb0 text-primary float-left">
                          <span className="text-black m-r10">Posted:</span> {timeAgo}
                        </p>
                        {/* <Link href={"/jobs-my-resume"} className="site-button button-sm float-right">
                          Apply Job
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className="pagination-bx m-t30">
        <ul className="pagination">
          <li className={`previous ${currentPage === 1 ? "disabled" : ""}`}>
            <Link href={"#"} onClick={handlePagePrevious}>
              <i className="ti-arrow-left"></i> Prev
            </Link>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={currentPage === index + 1 ? "active" : ""}>
              <Link href={"#"} onClick={() => setSearch({ ...search, start: index * search.perPage })}>
                {index + 1}
              </Link>
            </li>
          ))}
          <li className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
            <Link href={"#"} onClick={handlePageNext}>
              Next <i className="ti-arrow-right"></i>
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </>
  );
};

export default ApplicantAppliedJobs;
