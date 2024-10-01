import React from "react";
import Link from "next/link";

const AllServices = ({ ServicesList, count }: any) => {

  return (
    <>
      {ServicesList.map((item: ServiceAttributes, index: number) => (
        <div className="row image-text-grid-outer" key={index}>
          <div className="image-outer-con image-outer-con02">
            <img src={item.image} alt="icon" className="object-fit-cover image-left-con" />
          </div>
          <h3 className="fw4">{item.title}</h3>
          <div className="m-b15" dangerouslySetInnerHTML={{ __html: item.overview }} />
          <div className="dez-post-readmore blog-share">
            <Link href={`/service-details/${item.slug}`} title="READ MORE" rel="bookmark" className="site-button-link">
              <span className="fw6">READ MORE</span>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllServices;
