import React from "react";
import Link from "next/link";
import BannerTitle from "@/components/shared/BannerTitle";
import GoogleMaps from "@/components/shared/GoogleMaps";
import CommonService from "@/services/CommonService";
import ContactForm from "@/components/forms/ContactForm";

const ContactUs = async () => {
  const commServ = new CommonService();
  let response = await commServ.listAll({ type: "contact-us" }, "pages", "POST");
  const contactUsData = (response.content && JSON.parse(response.content)) || {};

  return (
    <div className="page-content bg-white">
      <BannerTitle motherName="Home" activeName="Contact Us" imageUrl={contactUsData.banner_image} />
      <div className="section-full content-inner bg-white contact-style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 d-lg-flex d-md-flex">
              <div className="p-a30 border m-b30 contact-area border-1 align-self-stretch radius-sm">
                <h4 className="m-b10">Contact Details.</h4>
                <ul className="no-margin">
                  <li className="icon-bx-wraper left m-b30">
                    <div className="icon-bx-xs border-1">
                      {" "}
                      <Link href={"#"} className="icon-cell">
                        <i className="ti-location-pin"></i>
                      </Link>{" "}
                    </div>
                    <div className="icon-content">
                      <h6 className="text-uppercase m-tb0 dez-tilte">Address:</h6>
                      <p>{contactUsData.address}</p>
                    </div>
                  </li>
                  <li className="icon-bx-wraper left  m-b30">
                    <div className="icon-bx-xs border-1">
                   
                      <Link href={"#"} className="icon-cell">
                        <i className="ti-email"></i>
                      </Link>
                    </div>
                    <div className="icon-content">
                      <h6 className="text-uppercase m-tb0 dez-tilte">Email:</h6>
                      <p>{contactUsData.email_id}</p>
                    </div>
                  </li>
                  <li className="icon-bx-wraper left">
                    <div className="icon-bx-xs border-1">
                      {" "}
                      <Link href={"#"} className="icon-cell">
                        <i className="ti-mobile"></i>
                      </Link>{" "}
                    </div>
                    <div className="icon-content">
                      <h6 className="text-uppercase m-tb0 dez-tilte">PHONE</h6>
                      <p>{contactUsData.phone_number}</p>
                    </div>
                  </li>
                </ul>
                <div className="m-t20">
                  <ul className="dez-social-icon dez-social-icon-lg">
                    {contactUsData.facebook_link && (
                      <li>
                        <Link href={contactUsData.facebook_link} className="fa fa-facebook bg-primary mr-1"></Link>
                      </li>
                    )}
                    {contactUsData.twitter_link && (
                      <li>
                        <Link href={contactUsData.twitter_link} className="fa fa-twitter bg-primary mr-1"></Link>
                      </li>
                    )}
                    {contactUsData.linkedin_link && (
                      <li>
                        <Link href={contactUsData.linkedin_link} className="fa fa-linkedin bg-primary mr-1"></Link>
                      </li>
                    )}
                    {contactUsData.instagram_link && (
                      <li>
                        <Link href={contactUsData.instagram_link} className="fa fa-instagram bg-primary mr-1"></Link>
                      </li>
                    )}
                    {contactUsData.pinterest_link && (
                      <li>
                        <Link href={contactUsData.pinterest_link} className="fa fa-pinterest bg-primary mr-1"></Link>
                      </li>
                    )}
                    {contactUsData.google_plus && (
                      <li>
                        <Link href={contactUsData.google_plus} className="fa fa-google-plus bg-primary"></Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="p-a30 m-b30 radius-sm bg-gray clearfix">
                <h4>Send Message Us</h4>
                <div className="dzFormMsg"></div>

                <ContactForm />
              </div>
            </div>
            <div className="col-lg-4 col-md-12 d-lg-flex m-b30">
              <GoogleMaps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
