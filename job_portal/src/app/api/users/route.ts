import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Applicant from "@/lib/models/applicants";
import Employer from "@/lib/models/employer";
import nodemailer from "nodemailer";
const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY || "";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.NEXT_PUBLIC_LOGIN_BREVO, 
    pass: process.env.NEXT_PUBLIC_PASS_BREVO, 
  },
});

export const POST = async (request: Request) => {
  try {
    const { email_id, password, loginType } = await request.json();

    let result: any = null;
    let token: any = null;
    let user: any = null;
    if (loginType === "applicant") {
      user = await Applicant.findOne({
        where: { email_id: email_id },
        attributes: { include: ["password"] },
      });
    } else if (loginType === "employer") {
      user = await Employer.findOne({
        where: { email_id: email_id },
        attributes: { include: ["password"] },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "Email or password is incorrect." }, { status: 200 });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return NextResponse.json({ error: "Email or password is incorrect." }, { status: 200 });
    }
    user.password = undefined;

    token = jwt.sign(
      { email: user.email_id, id: loginType === "employer" ? user.employer_id : user.applicant_id },
      JWT_KEY
    );
    result = {
      user,
      token,
      message: "Login successful",
    };

    return new NextResponse(JSON.stringify(result));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    const { loginType, token } = await request.json();

    let user: any = null;
    const { id, email }: any = jwt.verify(token, JWT_KEY);
    if (loginType === "applicant") {
      user = await Applicant.findOne({
        where: { email_id: email, applicant_id: id },
        attributes: { include: ["password"] },
      });
    } else if (loginType === "employer") {
      user = await Employer.findOne({
        where: { email_id: email, employer_id: id },
        attributes: { include: ["password"] },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "User Verification failed", status: "noactive" }, { status: 200 });
    }

    return NextResponse.json({ status: "active", userData: user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
export const PATCH = async (request: Request) => {
  try {
    const { email_id } = await request.json();

    let user: any = null;

    user = await Applicant.findOne({
      where: { email_id: email_id },
      attributes: { include: ["password"] },
    });

    if (!user) {
      user = await Employer.findOne({
        where: { email_id: email_id },
        attributes: { include: ["password"] },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "Email Address not found" }, { status: 200 });
    } else {
      let otp = Math.floor(100000 + Math.random() * 900000).toString();

      if (user.applicant_id) {
        await Applicant.update({ reset_password_token: otp }, { where: { applicant_id: user.applicant_id } });
      }
      if (user.employer_id) {
        await Employer.update({ reset_password_token: otp }, { where: { employer_id: user.employer_id } });
      }

      let newSub = "ATS Job portal - Password Reset OTP";
      let text = `\n<br/>You are receiving this because you (or someone else) have requested the reset of the password for your account.
      \n<br/><br/>Please use below mentioned OTP, or paste this into your browser to complete the process:
      \n<br/><br/>${otp}
      \n<br/><br/>If you did not request this, please ignore this email and your password will remain unchanged.
      \n<br/><br/><br/>Kind Regards, 
      \n<br/><br/>ATS Job portal Team`;

      const info = await transporter.sendMail({
        from: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        to: user.email_id,
        subject: newSub,
        text: text,
      });

      console.log("Message sent: %s", info.messageId);

      return NextResponse.json(
        { result: true, message: "OTP sent successfully, please check your inbox or spam folder" },
        { status: 200 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
