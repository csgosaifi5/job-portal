import { NextResponse } from "next/server";
import Employer from "@/lib/models/employer";
import Applicant from "@/lib/models/applicants";
import Jp_Job from "@/lib/models/jp_jobs";
import JobApply from "@/lib/models/job_apply";
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
    const employerData = await request.json();

    const dbEmployer = await Employer.findOne({
      where: { email_id: employerData.email_id },
    });
    if (dbEmployer && dbEmployer.email_id === employerData.email) {
      return new NextResponse(JSON.stringify({ error: "Email already registerd" }), { status: 201 });
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(employerData.password, salt);
    employerData.password = hash;

    let result = await Employer.create(employerData);

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
    let employerData: any = {};
    const data = await request.formData();
    const fields = [
      "employer_id",
      "first_name",
      "last_name",
      "company_name",
      "website_link",
      "description",
      "phone",
      "email_id",
      "country",
      "city",
      "zip_code",
      "full_address",
      "designation",
      "company_email",
      "founded_date",
      "category",
      "location",
      "facebook_link",
      "twitter_link",
      "instagram_link",
      "linkedin_link",
    ];

    fields.forEach((field) => {
      const value = data.get(field);
      if (value) {
        employerData[field] = value;
      }
    });

    const profile_image: File | null = data.get("image") as unknown as File;

    if (profile_image && typeof profile_image !== "string") {
      const byteArray = await profile_image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, profile_image_path, profile_image.name);

      writeFileSync(final_path, buffer);
      const final_url = profile_image_path + profile_image.name;
      employerData.image = final_url;
    }

    let result = await Employer.update(employerData, { where: { employer_id: employerData.employer_id } });
    let updatedEmployerData = await Employer.findOne({ where: { employer_id: employerData.employer_id } });
    return new NextResponse(JSON.stringify({ data: updatedEmployerData, message: "Profile Updated Successfully" }), {
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
    const { start, perPage, employerId,filter } = await request.json();
    
    let result: any = null;
    let whereClause: any = { employer_id: employerId };
    if(filter.job_id != ""){
      whereClause = { ...whereClause, job_id: filter.job_id };
    }

    let orderBy: any = [["createdAt", "DESC"]];

    if (perPage && start != undefined) {
      result = await JobApply.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Applicant,
            attributes: ["first_name", "last_name","designation","resume_url"],
          },
          {
            model: Jp_Job,
            attributes: ["job_address", "region","tags","min_salary","max_salary"],
          },
        ],
        offset: start,
        limit: perPage,
        order: orderBy,
      });
    } else {
      result = await Jp_Job.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Applicant,
            attributes: ["first_name", "last_name","designation","resume_url"],
          },
          {
            model: Jp_Job,
            attributes: ["job_address", "region","tags","min_salary","max_salary"],
          },
        ],
        order: orderBy,
      });
    }

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
