import React from "react";
import Link from "next/link";

const BannerTitle = ({activeName, motherName,imageUrl}:BannerTitleParams) => {
  return (
    <div className="dez-bnr-inr overlay-black-middle" style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      <div className="container">
        <div className="dez-bnr-inr-entry">
          <h1 className="text-white">{activeName}</h1>
          <div className="breadcrumb-row">
            <ul className="list-inline">
              <li>
                <Link href={"/"}>{motherName}</Link>
              </li>
              {/* <li><Link href={`/${activeName.toLowerCase()}`}>{activeName}</Link></li> */}
              <li>{activeName}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTitle;
