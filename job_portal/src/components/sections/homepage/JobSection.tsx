import Link from "next/link";
import CommonService from "@/services/CommonService";
import util from "@/util/util";
import { formatDistanceToNow } from "date-fns";

const JobSection = async () => {
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
    <div className="section-full bg-white content-inner-2">
      <div className="container">
        <div className="d-flex job-title-bx section-head">
          <div className="mr-auto">
            <h2 className="m-b5">Recent Jobs</h2>
            {/* <h6 className="fw4 m-b0">20+ Recently Added Jobs</h6> */}
          </div>
          <div className="align-self-end">
            <Link href={"/jobs"} className="site-button button-sm">
              Browse All Jobs <i className="fa fa-long-arrow-right"></i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <ul className="post-job-bx browse-job">
              {latestJobs.map((item: any, index: number) => {
                const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
                return (
                  <li key={index}>
                    <div className="post-bx">
                      <div className="d-flex m-b30">
                        <div className="job-post-company">
                          <span>
                            <img alt="" src={item.image} />
                          </span>
                        </div>
                        <div className="job-post-info">
                          <h4>
                            <Link href={`/jobs/job-detail/${item.slug}`}>{item.title}</Link>
                          </h4>
                          <ul>
                            <li>
                              <i className="fa fa-map-marker"></i> {item.job_address}
                            </li>
                            <li>
                              <i className="fa fa-bookmark-o"></i> {item.job_type}
                            </li>
                            <li>
                              <i className="fa fa-clock-o"></i>
                              Published {timeAgo}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="job-time mr-auto">
                          <Link href={"#"}>
                            <span>{item.job_type}</span>
                          </Link>
                        </div>
                        <div className="salary-bx">
                          <span>
                            &#8377;{item.min_salary * 100000} - &#8377;{item.max_salary * 100000}
                          </span>
                        </div>
                      </div>
                      <label className="like-btn">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="m-t30">
              <div className="d-flex">
                <Link className="site-button button-sm mr-auto" href={""}>
                  <i className="ti-arrow-left"></i> Prev
                </Link>
                <Link className="site-button button-sm" href={""}>
                  Next <i className="ti-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="sticky-top">
              <div className="candidates-are-sys m-b30">
                <div className="candidates-bx">
                  <div className="testimonial-pic radius">
                    <img src={"/images/testimonials/pic3.jpg"} alt="" width="100" height="100" />
                  </div>
                  <div className="testimonial-text">
                    <p>
                      I just got a job that I applied for via careerfy! I used the site all the time during my job hunt.
                    </p>
                  </div>
                  <div className="testimonial-detail">
                    {" "}
                    <strong className="testimonial-name">Richard Anderson</strong>{" "}
                    <span className="testimonial-position">Nevada, USA</span>{" "}
                  </div>
                </div>
              </div>
              <div className="quote-bx">
                <div className="quote-info">
                  <h4>Make a Difference with Your Online Resume!</h4>
                  <p>Your resume in minutes with JobBoard resume assistant is ready!</p>
                  <Link href={"/register"} className="site-button">
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
