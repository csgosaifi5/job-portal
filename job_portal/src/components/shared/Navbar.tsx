import Link from "next/link";
import NavClient from "./NavClient";

const Navbar = () => {
  return (
    <>
      <header className="site-header mo-left header fullwidth">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
            <div className="container clearfix">
              <div className="logo-header mostion">
                <Link href={"/"}>
                  <img src={"/images/logo.svg"} className="logo" alt="img" />
                </Link>
              </div>
              <NavClient />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
