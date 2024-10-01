import Link from "next/link";
import BannerTitle from "@/components/shared/BannerTitle";
import CommonService from "@/services/CommonService";
import AllServices from "./AllServices";

const OurServices = async () => {
  const commServ = new CommonService();
  let response = await commServ.listAll({ type: "services" }, "pages", "POST");
  const ServicesData = (response.content && JSON.parse(response.content)) || {};
  let ServicesList = [];
  let ServicesCount = null;
  let search = {
    start: 0,
    perPage: 3,
  };

  let result = await commServ.listAll(search, "services", "PATCH");

  if (result && result.rows) {
    ServicesList = result.rows;
    ServicesCount = result.count;
  }
  return (
    <div className="page-content bg-white">
      <BannerTitle activeName="Our Services" motherName="Home" imageUrl={ServicesData.banner_image} />

      <div className="content-block">
        <div className="section-full content-inner overlay-white-middle">
          <div className="container">
            <div className="row image-text-grid-outer">
              <div className="image-outer-con image-outer-con02">
                <img src={ServicesData.image} alt="icon" className="object-fit-cover image-left-con" />
              </div>

              <h2 className="m-b5">Our Services</h2>
              <h3 className="fw4">{ServicesData.title}</h3>
              <div className="m-b15" dangerouslySetInnerHTML={ServicesData.description ? { __html: ServicesData.description } : undefined} />

            </div>

            <AllServices ServicesList={ServicesList} ServicesCount={ServicesCount} />

            {/* <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                  <div className="icon-md text-primary m-b20">
                    {" "}
                    <Link href={"#"} className="icon-cell text-primary">
                      <i className="ti-desktop"></i>
                    </Link>{" "}
                  </div>
                  <div className="icon-content">
                    <h5 className="dlab-tilte text-uppercase">Elegant / Unique design</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                  <div className="icon-md text-primary m-b20">
                    {" "}
                    <Link href={"#"} className="icon-cell text-primary">
                      <i className="ti-image"></i>
                    </Link>{" "}
                  </div>
                  <div className="icon-content">
                    <h5 className="dlab-tilte text-uppercase">Make it Simple</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 m-b30">
                <div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
                  <div className="icon-md text-primary m-b20">
                    {" "}
                    <Link href={"#"} className="icon-cell text-primary">
                      <i className="ti-cup"></i>
                    </Link>{" "}
                  </div>
                  <div className="icon-content">
                    <h5 className="dlab-tilte text-uppercase">Different Layout Type</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div
          className="section-full content-inner-2 call-to-action overlay-black-dark text-white text-center bg-img-fix"
          style={{ backgroundImage: "url(/images/background/bg4.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="m-b10">Make a Difference with Your Online Resume!</h2>
                <p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <Link href={"/register-2"} className="site-button m-t20 outline outline-2 radius-xl">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
