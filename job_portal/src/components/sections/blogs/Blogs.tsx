import React from "react";
import Link from "next/link";
import BannerTitle from "@/components/shared/BannerTitle";
import AllBlogs from "./AllBlogs";
import BlogSidebar from "./BlogSidebar";
import CommonService from "@/services/CommonService";

const Blogs = async () => {
  const commServ = new CommonService();
  let blogsList = [];
  let blogsCount = null;
  let search = {
    start: 0,
    perPage: 3,
  };

  let result = await commServ.listAll(search, "blogs", "PATCH");

  if (result && result.rows) {
    blogsList = result.rows;
    blogsCount = result.count;
  }
  return (
    <div className="page-content bg-white">
      <BannerTitle motherName="Home" activeName="Blogs" imageUrl="/images/banner/bnr1.jpg" />

      <div className="content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7 col-sm-12">
              <AllBlogs blogs={blogsList} count={blogsCount} />
            </div>

            <div className="col-lg-4 col-md-5 col-sm-12 sticky-top">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
