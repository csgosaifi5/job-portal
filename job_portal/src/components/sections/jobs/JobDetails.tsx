import React from "react";
import Link from "next/link";
import ApplyJobButton from "./ApplyJobButton";
import BannerTitle from "@/components/shared/BannerTitle";
const blogGrid = [
  {
    image: "/images/blog/grid/pic1.jpg",
  },
  {
    image: "/images/blog/grid/pic2.jpg",
  },
  {
    image: "/images/blog/grid/pic3.jpg",
  },
  {
    image: "/images/blog/grid/pic4.jpg",
  },
];
const JobDetails = ({ jobData }: any) => {
  return (
    <>
      <div className="page-content bg-white">
        <BannerTitle motherName="Home" activeName="Jobs" imageUrl="/images/banner/bnr1.jpg" />
        <div className="content-block">
          <div className="section-full content-inner-1">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="sticky-top">
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <div className="m-b30">
                          <img src={jobData.image} alt="" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
                          <h4 className="text-black font-weight-700 p-t10 m-b15">Job Details</h4>
                          <ul>
                            <li>
                              <i className="ti-location-pin"></i>
                              <strong className="font-weight-700 text-black">Address</strong>
                              <span className="text-black-light">
                                {jobData.job_address}, {jobData.region}
                              </span>
                            </li>
                            <li>
                              <i className="ti-money"></i>
                              <strong className="font-weight-700 text-black">Salary</strong> &#8377;
                              {jobData.min_salary * 100000} - &#8377;{jobData.max_salary * 100000}
                            </li>
                            <li>
                              <i className="ti-shield"></i>
                              <strong className="font-weight-700 text-black">Experience</strong>
                              {jobData.experience} Year Experience
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="job-info-box">
                    <h3 className="m-t0 m-b10 font-weight-700 title-head">
                      <Link href={"#"} className="text-secondry m-r30">
					                {jobData.title}
                      </Link>
                    </h3>
                    <ul className="job-info">
                      <li>
                        <strong>Designation:</strong> {jobData.title}
                      </li>
                      <li>
                        <strong>Deadline:</strong> 25th January 2018
                      </li>
                      <li>
                        <i className="ti-location-pin text-black m-r5"></i> {jobData.region}
                      </li>
                    </ul>
                    <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
                    <h5 className="font-weight-600">Job Requirements</h5>
                    <div dangerouslySetInnerHTML={{ __html: jobData.job_requirements }} />
                    
                   <ApplyJobButton jobData={jobData} />
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-full content-inner">
            <div className="container">
              <div className="row">
                {blogGrid.map((item, index) => (
                  <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                    <div className="m-b30 blog-grid">
                      <div className="dez-post-media dez-img-effect ">
                        {" "}
                        <Link href={"/blog-details"}>
                          <img src={item.image} alt="" />
                        </Link>{" "}
                      </div>
                      <div className="dez-info p-a20 border-1">
                        <div className="dez-post-title ">
                          <h5 className="post-title">
                            <Link href={"/blog-details"}>Title of blog post</Link>
                          </h5>
                        </div>
                        <div className="dez-post-meta ">
                          <ul>
                            <li className="post-date">
                              {" "}
                              <i className="ti-location-pin"></i> London{" "}
                            </li>
                            <li className="post-author">
                              <i className="ti-user"></i>By <Link href={"#"}>Jone</Link>{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="dez-post-text">
                          <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks.</p>
                        </div>
                        <div className="dez-post-readmore">
                          <Link href={"/blog-details"} title="READ MORE" rel="bookmark" className="site-button-link">
                            <span className="fw6">READ MORE</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
