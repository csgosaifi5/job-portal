import { useState, useEffect } from "react";
import Link from "next/link";
import JobService from "@/services/JobService";
import { formatDistanceToNow } from "date-fns";
const postResume = [
  { title: "Tammy Dixon" },
  { title: "John Doe" },
  { title: "Ali Tufan" },
  { title: "David kamal" },
  { title: "Tammy Dixon" },
  { title: "John Doe" },
  { title: "David kamal" },
  { title: "Ali Tufan" },
];

const JobServ = new JobService();
const CompnayResume = ({ employerData }: any) => {
  const [appliedjobs, setAppliedjobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [allJobs, setAllJobs] = useState([]);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 5,
    employerId: employerData.employer_id,
    sortBy: { createdAt: "desc" },
    filter: {
      searchText: "",
      job_id: "",
    },
  });
  const fetchAppliedResume = async () => {
    try {
      const response = await JobServ.fetchAppliedResume(search);
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
  const fetchEmployerJobs = async () => {
    try {
      const response = await JobServ.getEmployerJobs({
        employerId: employerData.employer_id,
        filter: { job: true },
      });
      if (response.error) {
        console.log(response.error);
      } else if (response.data) {
        setAllJobs(response.data.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAppliedResume();
  }, [search]);

  useEffect(() => {
    fetchEmployerJobs();
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
      <div className="col-xl-9 col-lg-8 m-b30">
        <div className="job-bx clearfix">
          <div className="job-bx-title clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase">Resume</h5>
            <div className="float-right">
              <span className="select-title">Sort by jobs</span>
              <select
                className="custom-btn"
                onChange={(e) => {
                  setSearch({ ...search, start: 0, filter: { ...search.filter, job_id: e.target.value } });
                }}
              >
                <option value={""}>All</option>
                {allJobs.map((job: any, index: number) => {
                  return (
                    <option value={job.job_id} key={index}>
                      {job.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <ul className="post-job-bx browse-job-grid post-resume row">
            {appliedjobs.length > 0 ?
              appliedjobs.map((item: any, index: number) => {
                const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
                const jobTags = JSON.parse(item.Jp_Job.tags) || [];
                return (
                  <li className="col-lg-6 col-md-6" key={index}>
                    <div className="post-bx">
                      <div className="d-flex m-b20">
                        <div className="job-post-info">
                          <h5 className="m-b0">
                            <Link href={"/#"}>{item.Applicant.first_name + " " + item.Applicant.last_name}</Link>
                          </h5>
                          <p className="m-b5 font-13">
                            <Link href={"#"} className="text-primary">
                              {item.Applicant.designation}
                            </Link>
                            {/* at Atract Solutions */}
                          </p>
                          <ul>
                            <li>
                              <i className="fa fa-map-marker"></i>
                              {item.Jp_Job.job_address + ", " + item.Jp_Job.region}
                            </li>
                            <li>
                              <i className="fa fa-money"></i>{" "}
                              {item.Jp_Job.min_salary * 100000 + " - " + item.Jp_Job.max_salary * 100000}
                            </li>
                          </ul>
                        </div>
                      </div>
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
                          <span className="text-black m-r10">Applied:</span> {timeAgo}
                        </p>
                      </div>
                      <Link href={item.Applicant.resume_url} target="_blank" download className="job-links">
                        <i className="fa fa-download"></i>
                      </Link>
                    </div>
                  </li>
                );
              }) : <div className="col-lg-12 col-md-12 text-center">No Resumes Found</div>}
          </ul>
          <div className="pagination-bx float-right">
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
      </div>
    </>
  );
};

export default CompnayResume;
