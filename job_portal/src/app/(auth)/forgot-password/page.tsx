import Link from "next/link"
import Image from "next/image";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="page-wraper">
    <div
      className="page-content bg-white login-style2"
      style={{ backgroundImage: "url(/images/background/bg6.jpg)", backgroundSize: "cover" }}
    >
      <div className="section-full">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="text-white max-w400 align-self-center">
                <div className="logo">
                  <Link href={"/"}>
                    {" "}
                    <Image src={"/images/logo-white2.png"} width={180} height={38.8} alt="logo" />
                  </Link>
                </div>
                <h2 className="m-b10">Login To You Now</h2>
                <p className="m-b30">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry.
                </p>
                <ul className="list-inline m-a0">
                  <li>
                    <Link href={"/"} className="m-r10 text-white ">
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="m-r10 text-white ">
                      <i className="fa fa-google-plus"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="m-r10 text-white ">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="m-r10 text-white ">
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="m-r10 text-white">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="login-2 submit-resume p-a30 seth">
                <ForgotPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <span className="float-left">
                © Copyright by <i className="fa fa-heart m-lr5 text-red heart"></i>
                <Link href={"#"}>DexignZone </Link>{" "}
              </span>
              <span className="float-right">All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  )
}

export default ForgotPassword