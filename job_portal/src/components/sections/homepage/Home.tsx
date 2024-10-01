import Link from "next/link";
import JobSection from "./JobSection";
import Testimonials from "./Testimonials";
import LatestBlogs from "./LatestBlogs";

const Home = () => {
  return (
    <div className="page-content">
      <div
        className="dez-bnr-inr dez-bnr-inr-md overlay-black-dark"
        style={{ backgroundImage: "url(/images/main-slider/slide1.jpg)" }}
      >
        <div className="container">
          <div className="dez-bnr-inr-entry align-m text-white">
            <div className=" job-search-form">
              <h2 className="text-center">The Easiest Way to Get Your New Job</h2>
              <h3>Find Jobs, Employment & Career Opportunities</h3>
              <form>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Job Title, Keywords Or Company Name" />
                  <input type="text" className="form-control" placeholder="City, Province Or Region" />
                  <div className="input-group-prepend">
                    <button className="site-button">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* job Categories */}
      <div className="section-full job-categories content-inner-2 bg-white">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="m-b5">Popular Categories</h2>
            <h5 className="fw4">20+ Catetories work wating for you</h5>
          </div>

          <div className="row sp20">
			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="icon-bx-wraper">
					<div className="icon-content">
						<div className="icon-md text-primary m-b20"><i className="ti-location-pin"></i></div>
						<Link href={"/company-manage-job"} className="dez-tilte">Design, Art & Multimedia</Link>
						<p className="m-a0">198 Open Positions</p>
						<div className="rotate-icon"><i className="ti-location-pin"></i></div> 
					</div>
				</div>				
			</div>
			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="icon-bx-wraper">
					<div className="icon-content">
						<div className="icon-md text-primary m-b20"><i className="ti-wand"></i></div>
						<Link href={"/company-manage-job"} className="dez-tilte">Education Training</Link>
						<p className="m-a0">198 Open Positions</p>
						<div className="rotate-icon"><i className="ti-wand"></i></div> 
					</div>
				</div>
			</div>
			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="icon-bx-wraper">
					<div className="icon-content">
						<div className="icon-md text-primary m-b20"><i className="ti-wallet"></i></div>
						<Link href={"/company-manage-job"} className="dez-tilte">Accounting / Finance</Link>
						<p className="m-a0">198 Open Positions</p>
						<div className="rotate-icon"><i className="ti-wallet"></i></div> 
					</div>
				</div>
			</div>
			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="icon-bx-wraper">
					<div className="icon-content">
						<div className="icon-md text-primary m-b20"><i className="ti-cloud-up"></i></div>
						<Link href={"/company-manage-job"} className="dez-tilte">Human Resource</Link>
						<p className="m-a0">198 Open Positions</p>
						<div className="rotate-icon"><i className="ti-cloud-up"></i></div> 
					</div>
				</div>
			</div>
			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="icon-bx-wraper">
					<div className="icon-content">
						<div className="icon-md text-primary m-b20"><i className="ti-bar-chart"></i></div>
						<Link href={"/company-manage-job"} className="dez-tilte">Telecommunications</Link>
						<p className="m-a0">198 Open Positions</p>
						<div className="rotate-icon"><i className="ti-bar-chart"></i></div> 
					</div>
				</div>
			</div>
			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="icon-bx-wraper">
					<div className="icon-content">
						<div className="icon-md text-primary m-b20"><i className="ti-tablet"></i></div>
						<Link href={"/company-manage-job"} className="dez-tilte">Restaurant / Food Service</Link>
						<p className="m-a0">198 Open Positions</p>
						<div className="rotate-icon"><i className="ti-tablet"></i></div> 
					</div>
				</div>
			</div>
			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="icon-bx-wraper">
					<div className="icon-content">
						<div className="icon-md text-primary m-b20"><i className="ti-camera"></i></div>
						<Link href={"/company-manage-job"} className="dez-tilte">Construction / Facilities</Link>
						<p className="m-a0">198 Open Positions</p>
						<div className="rotate-icon"><i className="ti-camera"></i></div> 
					</div>
				</div>
			</div>
			<div className="col-lg-3 col-md-6 col-sm-6">
				<div className="icon-bx-wraper">
					<div className="icon-content">
						<div className="icon-md text-primary m-b20"><i className="ti-panel"></i></div>
						<Link href={"/company-manage-job"} className="dez-tilte">Health</Link>
						<p className="m-a0">198 Open Positions</p>
						<div className="rotate-icon"><i className="ti-panel"></i></div> 
					</div>
				</div>
			</div>
			<div className="col-lg-12 text-center m-t30">
				<button className="site-button radius-xl">All Categories</button>
			</div>
		</div>
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
              <p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
              <Link href={"/register-2"} className="site-button m-t20 outline outline-2 radius-xl">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <JobSection />
      <div
        className="section-full p-tb70 overlay-black-dark text-white text-center bg-img-fix"
        style={{ backgroundImage: "url(/images/background/bg3.jpg)" }}
      >
        <div className="container">
          <div className="section-head text-center text-white">
            <h2 className="m-b5">Testimonials</h2>
            <h5 className="fw4">Few words from candidates</h5>
          </div>
          <Testimonials />
        </div>
      </div>
      <div className="section-full content-inner-2 overlay-white-middle">
        <div className="container">
          <div className="section-head text-black text-center">
            <h2 className="text-uppercase m-b0">Our Latest Blog</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy.
            </p>
          </div>
          <LatestBlogs />
        </div>
      </div>
    </div>
  );
};

export default Home;
