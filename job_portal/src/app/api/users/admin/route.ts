import { NextResponse } from "next/server";
import User from "../../../../lib/models/admin_user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Applicant from "@/lib/models/applicants";
import Employer from "@/lib/models/employer";
const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY || "";

export const PUT = async (request: Request): Promise<Response> => {
  try {
    const data = await request.json();

    const { id }: any = jwt.verify(data.token, JWT_KEY);
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return NextResponse.json({ error: "User Verification failed" }, { status: 401 });
    }

    if (user) {
      return NextResponse.json({ status: "active", userData: user }, { status: 200 });
    } else {
      return NextResponse.json({ status: "notactive" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ status: "failed" }, { status: 500 });
  }
};
export const POST = async (request: Request) => {
  const origin = request.headers.get("origin");
  try {
    const { email_id, password, logintype } = await request.json();

    let result: any = null;
    let token: any = null;
    let user: any = null;
    user = await User.findOne({
      where: { email_id: email_id },
      attributes: { include: ["password"] },
    });

    if (!user) {
      return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    }

    if (logintype === "jp_admin_panel") {
      if (user.role !== "admin") {
        return NextResponse.json({ error: "Permission Denied." }, { status: 403 });
      }
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    }
    user.password = undefined;

    token = jwt.sign({ email: user.email_id, id: user.id }, JWT_KEY);
    result = {
      user,
      token,
      message: "Login successful",
    };

    return new NextResponse(JSON.stringify(result), {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const saltRounds = 10;
    const { email_id, password, otp} = await request.json();
    let user: any = null;
    let result: any = null;

    user = await Applicant.findOne({
      where: { email_id: email_id, reset_password_token: otp }
    });

    if (!user) {
      user = await Employer.findOne({
        where: { email_id: email_id, reset_password_token: otp}
      });
    }

    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    if (user.applicant_id) {
      result = await Applicant.update({ password: hash }, { where: { applicant_id: user.applicant_id } });
    }
    if (user.employer_id) {
      result = await Employer.update({ password: hash }, { where: { employer_id: user.employer_id } });
    }

    if (result === null) {
      return new NextResponse(JSON.stringify({ error: "something went wrong" }), { status: 201 });
    }

    return new NextResponse(JSON.stringify({ result: result, message: "Password Changed Successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
