"use client";
import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const JobsClient = ({ jobsData, count }: any) => {
  const [jobsArray, setJobsArray] = useState(jobsData);
  const [jobsCount, setJobsCount] = useState(count);

  return (
    <>
      <div className="section-full browse-job-find">
        <div className="container">
          <div className="find-job-bx">
            <form className="dezPlaceAni">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="form-group">
                    <label>Job Title, Keywords, or Phrase</label>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="" />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <label>City, State or ZIP</label>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="" />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-map-marker"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <select className="select-btn">
                      <option>Select Sector</option>
                      <option>Construction</option>
                      <option>Corodinator</option>
                      <option>Employer</option>
                      <option>Financial Career</option>
                      <option>Information Technology</option>
                      <option>Marketing</option>
                      <option>Quality check</option>
                      <option>Real Estate</option>
                      <option>Sales</option>
                      <option>Supporting</option>
                      <option>Teaching</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <button type="submit" className="site-button btn-block">
                    Find Job
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="content-block">
        <div className="section-full browse-job p-b50">
          <div className="container">
            <div className="row">
              <div className="col-xl-9 col-lg-8 col-md-7">
                <div className="job-bx-title clearfix">
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
                <ul className="post-job-bx">
                  {jobsArray.map((item: any, index: number) => {
                    const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
                    return (
                      <li key={index}>
                        <div className="post-bx">
                          <div className="d-flex m-b30">
                            <div className="job-post-company">
                              <Link href={"#"}>
                                <span>
                                  <img alt="" src={item.image} />
                                </span>
                              </Link>
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
                                  <i className="fa fa-clock-o"></i> Published {timeAgo}
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
                <div className="pagination-bx m-t30">
                  <ul className="pagination">
                    <li className="previous">
                      <Link href={"#"}>
                        <i className="ti-arrow-left"></i> Prev
                      </Link>
                    </li>
                    <li className="active">
                      <Link href={"#"}>1</Link>
                    </li>
                    <li>
                      <Link href={"#"}>2</Link>
                    </li>
                    <li>
                      <Link href={"#"}>3</Link>
                    </li>
                    <li className="next">
                      <Link href={"#"}>
                        Next <i className="ti-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-5">
                <div className="sticky-top">
                  <div className="candidates-are-sys m-b30">
                    <div className="candidates-bx">
                      <div className="testimonial-pic radius">
                        <img src={"/images/testimonials/pic3.jpg"} alt="" width="100" height="100" />
                      </div>
                      <div className="testimonial-text">
                        <p>
                          I just got a job that I applied for via careerfy! I used the site all the time during my job
                          hunt.
                        </p>
                      </div>
                      <div className="testimonial-detail">
                        {" "}
                        <strong className="testimonial-name">Richard Anderson</strong>{" "}
                        <span className="testimonial-position">Nevada, USA</span>{" "}
                      </div>
                    </div>
                  </div>
                  <ul className="company-logo-wg sidebar bg-white job-bx m-b30 clearfix">
                    {[{}, {}].map((item, index) => (
                      <li className="brand-logo" key={index}>
                        <Link href={"#"}>
                          <img src={"/images/logo/icon1.png"} alt="" />
                        </Link>
                      </li>
                    ))}
                  </ul>
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
      </div>
    </>
  );
};

export default JobsClient;
