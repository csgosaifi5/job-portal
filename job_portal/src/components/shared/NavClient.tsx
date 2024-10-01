"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavClient = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    }
  }, [pathname]);

  useEffect(() => {
    // Function to toggle the 'show' class
    const toggleClass = () => {
      const element = document.querySelector(".myNavbar");
      if (element) {
        element.classList.toggle("show");
      }
    };

    // Set up the event listener
    const Navicon = document.querySelector(".navicon");
    if (Navicon) {
      Navicon.addEventListener("click", toggleClass);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (Navicon) {
        Navicon.removeEventListener("click", toggleClass);
      }
    };
  }, []);

  return (
    <>
      <button
        className="navbar-toggler collapsed navicon  justify-content-end"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="extra-nav">
        <div className="extra-cell">
          {user ? (
            user.applicant_id ? (
              <Link href={"/applicant-profile"} className="site-button">
                <i className="fa fa-user"></i> My Profile
              </Link>
            ) : user.employer_id ? (
              <Link href={"/company-profile"} className="site-button">
                <i className="fa fa-user"></i> My Profile
              </Link>
            ) : (
              <Link href={"/register"} className="site-button">
                <i className="fa fa-user"></i> Sign Up
              </Link>
            )
          ) : (
            <Link href={"/register"} className="site-button">
              <i className="fa fa-user"></i> Sign Up
            </Link>
          )}
        </div>
      </div>

      <div className="header-nav navbar-collapse collapse myNavbar justify-content-start" id="navbarNavDropdown">
        <div className="logo-header mostion d-md-block d-lg-none">
          <Link href={"/"} className="dez-page">
            <img src={"/images/logo.png"} alt="" />
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link href={"/jobs"}>Jobs</Link>
          </li>
          <li>
            <Link href={"/our-services"}>Services</Link>
          </li>
          <li>
            <Link href={"/#"}>Advices </Link>
          </li>
          <li>
            <Link href={"/blogs"}>Blogs</Link>
          </li>
          <li>
            <Link href={"/#"}>Careers </Link>
          </li>
          <li>
            <Link href={"/about-us"}>About Us</Link>
          </li>
          <li>
            <Link href={"/contact-us"}>Contact Us</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavClient;
