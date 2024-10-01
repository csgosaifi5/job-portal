import { NextResponse } from "next/server";
import Applicant from "@/lib/models/applicants";
import Employer from "@/lib/models/employer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { join } from "path";
import { writeFileSync } from "fs";
const profile_image_path = process.env.NEXT_PUBLIC_PROFILE_IMAGE_DESTINATION || "";
const files_path = process.env.NEXT_PUBLIC_FILES_DESTINATION || "";
const upload_path = process.env.NEXT_PUBLIC_UPLOAD_PATH || "";

export const POST = async (request: Request) => {
  try {
    const saltRounds = 10;
    const applicantData = await request.json();

    const dbApplicant = await Applicant.findOne({
      where: { email_id: applicantData.email_id },
    });
    if (dbApplicant && dbApplicant.email_id === applicantData.email) {
      return new NextResponse(JSON.stringify({ error: "Email already registerd" }), { status: 201 });
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(applicantData.password, salt);
    applicantData.password = hash;

    let result = await Applicant.create(applicantData);

    if (result === null) {
      return new NextResponse(JSON.stringify({ error: "something went wrong" }), { status: 201 });
    }

    return new NextResponse(JSON.stringify({ result: result, message: "Registered Successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
export const PUT = async (request: Request) => {
  try {
    let applicantData: any = {};
    const data = await request.formData();
    const fields = [
      "applicant_id",
      "first_name",
      "last_name",
      "email_id",
      "languages",
      "phone",
      "age",
      "country",
      "city",
      "zip_code",
      "full_address",
      "description",
      "designation",
      "current_ctc",
      "expected_ctc",
    ];

    fields.forEach((field) => {
      const value = data.get(field);
      if (value) {
        applicantData[field] = value;
      }
    });

    const profile_image: File | null = data.get("image") as unknown as File;

    if (profile_image && typeof profile_image !== "string") {
      const byteArray = await profile_image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, profile_image_path, profile_image.name);

      writeFileSync(final_path, buffer);
      const final_url = profile_image_path + profile_image.name;
      applicantData.image = final_url;
    }

    const resume: File | null = data.get("resume") as unknown as File;

    if (resume && typeof resume !== "string") {
      const byteArray = await resume.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, files_path, resume.name);

      writeFileSync(final_path, buffer);
      const final_url = files_path + resume.name;
      applicantData.resume_url = final_url;
    }

    let result = await Applicant.update(applicantData, { where: { applicant_id: applicantData.applicant_id } });
    let updatedApplicantData = await Applicant.findOne({ where: { applicant_id: applicantData.applicant_id } });
    return new NextResponse(JSON.stringify({ data: updatedApplicantData, message: "Profile Updated Successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in POST:", error);
    // Return an error response in case of failure
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};


export const PATCH = async (request: Request) => {
  try {
    const saltRounds = 10;
    const { old_password, applicant_id,employer_id,new_password} = await request.json();
    
    let user: any = null;
    let result: any = null;
    const salt = bcrypt.genSaltSync(saltRounds);
    
    if (applicant_id) {
      user = await Applicant.findOne({
        where: { applicant_id: applicant_id }
      });
    }
    
    if (employer_id) {
      user = await Employer.findOne({
        where: { employer_id: employer_id}
      });
    }
    const isMatched = await bcrypt.compare(old_password, user.password);
    if (!isMatched) {
      return NextResponse.json({ error: "Invalid Old Password" }, { status: 200 });
    }


    const newhash = bcrypt.hashSync(new_password, salt);
    
    if (user.applicant_id) {
      result = await Applicant.update({ password: newhash }, { where: { applicant_id: user.applicant_id } });
    }
    if (user.employer_id) {
      result = await Employer.update({ password: newhash }, { where: { employer_id: user.employer_id } });
    }

    if (result === null) {
      return new NextResponse(JSON.stringify({ error: "something went wrong" }), { status: 200 });
    }

    return new NextResponse(JSON.stringify({ result: result, message: "Password Changed Successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
