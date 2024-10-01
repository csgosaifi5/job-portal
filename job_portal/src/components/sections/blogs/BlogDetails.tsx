import React from "react";
import BlogSidebar from "./BlogSidebar";
import BannerTitle from "@/components/shared/BannerTitle";
import Link from "next/link";
import util from "@/util/util";

const BlogDetails = ({blogData}:blogsProps) => {
  const tags= JSON.parse(blogData.tags);
  
  return (
    <>
      <div className="page-content bg-white">
        <BannerTitle motherName="Home" activeName="Blogs" imageUrl={blogData.banner_image} />
        <div className="content-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-7 m-b10">
                <div className="blog-post blog-single blog-style-1">
                  <div className="dez-post-meta">
                    <ul className="d-flex align-items-center">
                      <li className="post-date">
                        <i className="fa fa-calendar"></i>{util.formatDate(blogData.createdAt)}
                      </li>
                      <li className="post-author">
                        <i className="fa fa-user"></i>By <Link href={"#"}>Admin</Link>{" "}
                      </li>
                      <li className="post-comment">
                        <i className="fa fa-comments-o"></i>
                        <Link href={"#"}>5k</Link>{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="dez-post-title">
                    <h4 className="post-title m-t0">
                     {blogData.title}
                      
                    </h4>
                  </div>
                  <div className="dez-post-media dez-img-effect zoom-slow m-t20">
                      <img src={blogData.image} alt="" />
                    
                  </div>
                  <div className="dez-post-text">
                  <div dangerouslySetInnerHTML={{ __html: blogData.description }} />
                  </div>
                  <div className="dez-post-tags clear">
                    <div className="post-tags">
                    {tags.map((item:any,index:number)=>{
                      return <Link href={"#"} key={index}>{item.label} </Link>
                    
                    })}  
                    </div>
                  </div>
                  <div className="dez-divider bg-gray-dark op4">
                    <i className="icon-dot c-square"></i>
                  </div>
                  <div className="share-details-btn">
                    <ul>
                      <li>
                        <h5 className="m-a0">Share Post</h5>
                      </li>
                      <li>
                        <Link href={"#"} className="site-button facebook button-sm">
                          <i className="fa fa-facebook"></i> Facebook
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="site-button google-plus button-sm">
                          <i className="fa fa-google-plus"></i> Google Plus
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="site-button linkedin button-sm">
                          <i className="fa fa-linkedin"></i> Linkedin
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="site-button instagram button-sm">
                          <i className="fa fa-instagram"></i> Instagram
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="site-button twitter button-sm">
                          <i className="fa fa-twitter"></i> Twitter
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="site-button whatsapp button-sm">
                          <i className="fa fa-whatsapp"></i> Whatsapp
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="clear" id="comment-list">
                  <div className="comments-area" id="comments">
                    <h2 className="comments-title">8 Comments</h2>
                    <div className="clearfix m-b20">
                      <ol className="comment-list">
                        <li className="comment">
                          <div className="comment-body">
                            <div className="comment-author vcard">
                              <img
                                className="avatar photo"
                                src={"/images/testimonials/pic1.jpg"}
                                alt=""
                              />{" "}
                              <cite className="fn">Stacy poe</cite> <span className="says">says:</span>
                            </div>
                            <div className="comment-meta">
                              {" "}
                              <Link href={"#"}>October 6, 2015 at 7:15 am</Link>{" "}
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neqnsectetur adipiscing
                              elit. Nam viae neqnsectetur adipiscing elit. Nam vitae neque vitae sapien malesuada
                              aliquet.{" "}
                            </p>
                            <div className="reply">
                              {" "}
                              <Link href={"#"} className="comment-reply-link">
                                Reply
                              </Link>{" "}
                            </div>
                          </div>
                          <ol className="children">
                            <li className="comment odd parent">
                              <div className="comment-body">
                                <div className="comment-author vcard">
                                  {" "}
                                  <img
                                    className="avatar photo"
                                    src={"/images/testimonials/pic2.jpg"}
                                    alt=""
                                  />{" "}
                                  <cite className="fn">Stacy poe</cite> <span className="says">says:</span>{" "}
                                </div>
                                <div className="comment-meta">
                                  {" "}
                                  <Link href={"#"}>October 6, 2015 at 7:15 am</Link>{" "}
                                </div>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien
                                  malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare
                                  molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.
                                </p>
                                <div className="reply">
                                  {" "}
                                  <Link href={"#"} className="comment-reply-link">
                                    Reply
                                  </Link>{" "}
                                </div>
                              </div>
                              <ol className="children">
                                <li className="comment odd parent">
                                  <div className="comment-body">
                                    <div className="comment-author vcard">
                                      {" "}
                                      <img
                                        className="avatar photo"
                                        src={"/images/testimonials/pic3.jpg"}
                                        alt=""
                                      />{" "}
                                      <cite className="fn">Stacy poe</cite> <span className="says">says:</span>{" "}
                                    </div>
                                    <div className="comment-meta">
                                      {" "}
                                      <Link href={"#"}>October 6, 2015 at 7:15 am</Link>{" "}
                                    </div>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae
                                      sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu
                                      ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.
                                    </p>
                                    <div className="reply">
                                      {" "}
                                      <Link href={"#"} className="comment-reply-link">
                                        Reply
                                      </Link>{" "}
                                    </div>
                                  </div>
                                </li>
                              </ol>
                            </li>
                          </ol>
                        </li>
                        <li className="comment">
                          <div className="comment-body">
                            <div className="comment-author vcard">
                              <img
                                className="avatar photo"
                                src={"/images/testimonials/pic1.jpg"}
                                alt=""
                              />{" "}
                              <cite className="fn">Stacy poe</cite> <span className="says">says:</span>{" "}
                            </div>
                            <div className="comment-meta">
                              {" "}
                              <Link href={"#"}>October 6, 2015 at 7:15 am</Link>{" "}
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien
                              malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare
                              molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.
                            </p>
                            <div className="reply">
                              {" "}
                              <Link href={"#"} className="comment-reply-link">
                                Reply
                              </Link>{" "}
                            </div>
                          </div>
                        </li>
                        <li className="comment">
                          <div className="comment-body">
                            <div className="comment-author vcard">
                              <img
                                className="avatar photo"
                                src={"/images/testimonials/pic2.jpg"}
                                alt=""
                              />{" "}
                              <cite className="fn">Stacy poe</cite> <span className="says">says:</span>{" "}
                            </div>
                            <div className="comment-meta">
                              {" "}
                              <Link href={"#"}>October 6, 2015 at 7:15 am</Link>{" "}
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien
                              malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare
                              molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.
                            </p>
                            <div className="reply">
                              {" "}
                              <Link href={"#"} className="comment-reply-link">
                                Reply
                              </Link>{" "}
                            </div>
                          </div>
                        </li>
                        <li className="comment">
                          <div className="comment-body">
                            <div className="comment-author vcard">
                              <img
                                className="avatar photo"
                                src={"/images/testimonials/pic3.jpg"}
                                alt=""
                              />{" "}
                              <cite className="fn">Stacy poe</cite> <span className="says">says:</span>{" "}
                            </div>
                            <div className="comment-meta">
                              {" "}
                              <Link href={"#"}>October 6, 2015 at 7:15 am</Link>{" "}
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien
                              malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare
                              molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.
                            </p>
                            <div className="reply">
                              {" "}
                              <Link href={"#"} className="comment-reply-link">
                                Reply
                              </Link>{" "}
                            </div>
                          </div>
                        </li>
                      </ol>

                      <div className="comment-respond" id="respond">
                        <h4 className="comment-reply-title" id="reply-title">
                          Leave a Reply{" "}
                          <small>
                            {" "}
                            <Link href={"#"} style={{ display: "none" }} id="cancel-comment-reply-link" rel="nofollow">
                              Cancel reply
                            </Link>{" "}
                          </small>{" "}
                        </h4>
                        <form
                          className="comment-form"
                          id="commentform"
                          method="post"
                          action="http://sedatelab.com/developer/donate/wp-comments-post.php"
                        >
                          <p className="comment-form-author">
                            <label htmlFor="author">
                              Name <span className="required">*</span>
                            </label>
                            <input type="text" defaultValue="Author" name="Author" placeholder="Author" id="author" />
                          </p>
                          <p className="comment-form-email">
                            <label htmlFor="email">
                              Email <span className="required">*</span>
                            </label>
                            <input type="text" defaultValue="email" placeholder="Email" name="email" id="email" />
                          </p>
                          <p className="comment-form-url">
                            <label htmlFor="url">Website</label>
                            <input type="text" defaultValue="url" placeholder="Website" name="url" id="url" />
                          </p>
                          <p className="comment-form-comment">
                            <label htmlFor="comment">Comment</label>
                            <textarea rows={8} name="comment" placeholder="Comment" id="comment"></textarea>
                          </p>
                          <p className="form-submit">
                            <input
                              type="submit"
                              defaultValue="Post Comment"
                              className="submit site-button"
                              id="submit"
                              name="submit"
                            />
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="col-lg-4 col-md-5 sticky-top">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
