import Link from "next/link";
import CommonService from "@/services/CommonService";

const Footer = async () => {
  const commServ = new CommonService();
  let contactUsData: any = {};
  try {
    let response = await commServ.listAll({ type: "contact-us" }, "pages", "POST");

    if (response.error) {
      console.error(response.error);
      return;
    }

    contactUsData = response && response.content ? JSON.parse(response.content) : {};
    // Now you can use contactUsData safely
  } catch (error) {
    console.error("Error fetching contact-us data:", error);
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
              <div className="widget">
                <img src={"/images/logo.svg"} width="180" className="m-b15" alt="" />
                <p className="text-capitalize m-b20">{contactUsData.address}</p>
                <div className="subscribe-form m-b20">
                  <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                    <div className="dzSubscribeMsg"></div>
                    <div className="input-group">
                      <input name="dzEmail" className="form-control" placeholder="Your Email Address" type="email" />
                      <span className="input-group-btn">
                        <button name="submit" value="Submit" type="submit" className="site-button radius-xl">
                          Subscribe
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <ul className="list-inline m-a0">
                  {contactUsData.facebook_link && (
                    <li>
                      <Link href={contactUsData.facebook_link} className="site-button white facebook circle ">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                  )}
                  {contactUsData.twitter_link && (
                    <li>
                      <Link href={contactUsData.twitter_link} className="site-button white twitter circle ">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                  )}
                  {contactUsData.linkedin_link && (
                    <li>
                      <Link href={contactUsData.linkedin_link} className="site-button white linkedin circle ">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                  )}
                  {contactUsData.instagram_link && (
                    <li>
                      <Link href={contactUsData.instagram_link} className="site-button white instagram circle ">
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </li>
                  )}
                  {contactUsData.pinterest_link && (
                    <li>
                      <Link href={contactUsData.pinterest_link} className="fa fa-pinterest bg-primary mr-1"></Link>
                    </li>
                  )}
                  {contactUsData.google_plus && (
                    <li>
                      <li>
                        <Link href={contactUsData.google_plus} className="site-button white google-plus circle ">
                          <i className="fa fa-google-plus"></i>
                        </Link>
                      </li>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-8 col-sm-8 col-12">
              <div className="widget border-0">
                <h5 className="m-b30 text-white">Frequently Asked Questions</h5>
                <ul className="list-2 list-line">
                  <li>
                    <Link href={""}>Privacy & Seurty</Link>
                  </li>
                  <li>
                    <Link href={""}>Terms of Serice</Link>
                  </li>
                  <li>
                    <Link href={""}>Communications</Link>
                  </li>
                  <li>
                    <Link href={""}>Referral Terms</Link>
                  </li>
                  <li>
                    <Link href={""}>Lending Licnses</Link>
                  </li>
                  <li>
                    <Link href={""}>Support</Link>
                  </li>
                  <li>
                    <Link href={""}>How It Works</Link>
                  </li>
                  <li>
                    <Link href={""}>For Employers</Link>
                  </li>
                  <li>
                    <Link href={""}>Underwriting</Link>
                  </li>
                  <li>
                    <Link href={"/contact-us"}>Contact Us</Link>
                  </li>
                  <li>
                    <Link href={""}>Lending Licnses</Link>
                  </li>
                  <li>
                    <Link href={""}>Support</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-12">
              <div className="widget border-0">
                <h5 className="m-b30 text-white">Find Jobs</h5>
                <ul className="list-2 w10 list-line">
                  <li>
                    <Link href={""}>US Jobs</Link>
                  </li>
                  <li>
                    <Link href={""}>Canada Jobs</Link>
                  </li>
                  <li>
                    <Link href={""}>UK Jobs</Link>
                  </li>
                  <li>
                    <Link href={""}>Emplois en Fnce</Link>
                  </li>
                  <li>
                    <Link href={""}>Jobs in Deuts</Link>
                  </li>
                  <li>
                    <Link href={""}>Vacatures China</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <span> © Copyright by Drive, 2024. &nbsp; All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
