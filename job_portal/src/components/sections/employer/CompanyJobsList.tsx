import { useState, useEffect } from "react";
import JobService from "@/services/JobService";
import Link from "next/link";
import util from "@/util/util";
import ConfirmDeletePopup from "@/components/popups/ConfirmDeletePopup";
import JobDetailPopup from "@/components/popups/JobDetailPopup";

const JobServ = new JobService();

const CompanyJobsList = ({ employerData,setJobData,setCurrentTab }: any) => {
  const [company, setCompany] = useState(false);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showJobPopup, setShowJobPopup] = useState(false);
  const [jobDetail, setJobDetail] = useState({});
  const [toBeDeleteAid, setToBeDeleteAid] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 5,
    employerId: employerData.employer_id,
    sortBy: { createdAt: "desc" },
    filter: {
      searchText: "",
    },
  });

  const fetchEmployerJobs = async () => {
    try {
      const response = await JobServ.getEmployerJobs(search);
      if (response.error) {
        console.log(response.error);
      } else if (response.data) {
        setEmployerJobs(response.data.rows);
        setJobCount(response.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployerJobs();
  }, [search]);

  const handleDeleteJob = async (job_id: number) => {
    try {
      let resp = await JobServ.deleteJob(job_id);
      if (resp.message) {
        fetchEmployerJobs();
        setShowDeletePopup(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
        <div className="job-bx browse-job clearfix">
          <div className="job-bx-title  clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase">Manage jobs</h5>
            <div className="float-right">
              <span className="select-title">Search</span>
              <input type="text" onChange={(e) => {
                  setSearch({ ...search, start: 0, filter: { ...search.filter, searchText: e.target.value } });
                }} placeholder="title/address/region/type" style={{width:"200px"}} className="custom-btn"/>
              {/* <select className="custom-btn">
                <option>All</option>
                <option>None</option>
                <option>Read</option>
                <option>Unread</option>
                <option>Starred</option>
                <option>Unstarred</option>
              </select> */}
            </div>
          </div>
          <table className="table-job-bx cv-manager company-manage-job">
            <thead>
              <tr>
                {/* <th className="feature">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      id="check12"
                      className="custom-control-input selectAllCheckBox"
                      name="example1"
                    />
                    <label className="custom-control-label" htmlFor="check12"></label>
                  </div>
                </th> */}
                <th>Job Title</th>
                <th>Status</th>
                {/* <th>Applications</th> */}
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employerJobs.length > 0 ?
                employerJobs.map((job: any,index:number) => {
                  let tags = JSON.parse(job.tags);
                  let labels = tags.map((tag: { label: string }) => tag.label).join(", ");

                  return (
                    <tr key={index}>
                      <td className="job-name">
                        <Link href={"#"}>{job.title}</Link>
                        <ul className="job-post-info">
                          <li>
                            <i className="fa fa-map-marker"></i> {job.job_address}
                          </li>
                          <li>
                            <i className="fa fa-bookmark-o"></i> {job.job_type}
                          </li>
                          <li>
                            <i className="fa fa-filter"></i>
                            {labels}
                          </li>
                        </ul>
                      </td>
                      <td className="text-primary">{job.status}</td>
                      {/* <td className="application text-primary">(2) Applications</td> */}
                      <td className="expired pending">{util.formatDate(job.createdAt)} </td>
                      <td className="job-links">
                        <Link
                          href={"#"}
                          onClick={() => {
                            setJobDetail(job);
                            setShowJobPopup(true);
                          }}
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                        <Link
                          href={"#"}
                          onClick={() => {
                            setJobData(job);
                            setCurrentTab(1);
                          }}
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <Link
                          href={"#"}
                          onClick={() => {
                            setToBeDeleteAid(job.job_id);
                            setShowDeletePopup(true);
                          }}
                        >
                          <i className="ti-trash"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                }) : <tr><td colSpan={4} className="text-center">No Jobs Found</td></tr>}
            
            </tbody>
          </table>
          <div className="pagination-bx m-t30 float-right">
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

          {showDeletePopup && toBeDeleteAid != 0 && (
            <ConfirmDeletePopup
              onClose={() => setShowDeletePopup(!showDeletePopup)}
              onConfirm={() => handleDeleteJob(toBeDeleteAid)}
              extraData={"Job"}
            />
          )}
          {showJobPopup && jobDetail && (
            <JobDetailPopup jobData={jobDetail} onClose={() => setShowJobPopup(!showJobPopup)} employerData={employerData}/>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyJobsList;
