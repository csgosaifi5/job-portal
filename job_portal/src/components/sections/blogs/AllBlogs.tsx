"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import util from "@/util/util";
import CommonService from "@/services/CommonService";

const AllBlogs = ({ blogs, count }: any) => {
  const commServ = new CommonService();
  const [blogsList, setBlogsList] = useState(blogs);
  const [blogsCount, setBlogsCount] = useState(count);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 3,
    sortBy: { createdAt: "desc" },
    filter: {
      searchText: "",
    },
  });

  const getBlogsList = async (search: any) => {
    let result = await commServ.listAll(search, "blogs", "PATCH");

    if (result && result.rows) {
      setBlogsList(result.rows);
      setBlogsCount(result.count);
    }
  };

  useEffect(() => {
    getBlogsList(search);
  }, [search]);

  const handlePageNext = () => {
    if (search.start + search.perPage < blogsCount) {
      setSearch({ ...search, start: search.start + search.perPage });
    }
  };

  const handlePagePrevious = () => {
    if (search.start > 0) {
      setSearch({ ...search, start: search.start - search.perPage });
    }
  };

  const totalPages = Math.ceil(blogsCount / search.perPage);
  const currentPage = Math.floor(search.start / search.perPage) + 1;

  return (
    <>
      {blogsList.map((item: BlogData, index: number) => (
        <div className="blog-post blog-lg blog-style-1 mb-5" key={index}>
          <div className="dez-post-media dez-img-effect zoom-slow radius-sm">
            <Link href={`/blog-details/${item.slug}`}>
              <img src={item.image} alt="" />
            </Link>
          </div>
          <div className="dez-info">
            <div className="dez-post-meta">
              <ul className="d-flex align-items-center">
                <li className="post-date">
                  <i className="fa fa-calendar"></i>
                  {util.formatDate(item.createdAt)}
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
              <h4 className="post-title font-24">
                <Link href={`/blog-details/${item.slug}`}>{item.title}</Link>
              </h4>
            </div>
            <div className="dez-post-readmore blog-share">
              <Link href={`/blog-details/${item.slug}`} title="READ MORE" rel="bookmark" className="site-button-link">
                <span className="fw6">READ MORE</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="pagination-bx clearfix text-center">
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
    </>
  );
};

export default AllBlogs;
