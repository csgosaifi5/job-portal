import { NextResponse } from "next/server";
import Jp_Job from "@/lib/models/jp_jobs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { join } from "path";
import { writeFileSync } from "fs";
import { Op } from "sequelize";
const profile_image_path = process.env.NEXT_PUBLIC_PROFILE_IMAGE_DESTINATION || "";
const files_path = process.env.NEXT_PUBLIC_FILES_DESTINATION || "";
const upload_path = process.env.NEXT_PUBLIC_UPLOAD_PATH || "";
const image_path = process.env.NEXT_PUBLIC_IMAGE_DESTINATION || "";

export const POST = async (request: Request) => {
  try {
    let jobData: any = {};
    const data = await request.formData();
    const fields = [
      "employer_id",
      "title",
      "description",
      "contact_email",
      "job_type",
      "experience",
      "min_salary",
      "max_salary",
      "region",
      "status",
      "category",
      "job_address",
      "job_requirements",
      "file",
      "tags",
      "image",
    ];
    const jobId: number | undefined = data.get("job_id") ? Number(data.get("job_id")) : undefined;
    fields.forEach((field) => {
      const value = data.get(field);
      if (value) {
        jobData[field] = value;
      }
    });

    const image: File | null = data.get("image") as unknown as File;

    if (image && typeof image !== "string") {
      const byteArray = await image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, image_path, image.name);

      writeFileSync(final_path, buffer);
      const final_url = image_path + image.name;
      jobData.image = final_url;
    }

    const file: File | null = data.get("file") as unknown as File;

    if (file && typeof file !== "string") {
      const byteArray = await file.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, files_path, file.name);

      writeFileSync(final_path, buffer);
      const final_url = files_path + file.name;
      jobData.file = final_url;
    }

    let slug = jobData.title.toLowerCase().replace(/\s+/g, "-");
    slug = slug.replace(/<[^>]*>/g, "-");
    slug = slug.replace(/[,.:;!?()]/g, "-");

    let dbSlug = await Jp_Job.findOne({ where: { slug: slug } });
    while (dbSlug) {
      const randomString = Math.random().toString(36).substring(2, 5);
      slug += `-${randomString}`;
      dbSlug = await Jp_Job.findOne({ where: { slug: slug } });
    }

    jobData.slug = slug;

    let result = jobId ? await Jp_Job.update(jobData, { where: { job_id: jobId } }) : await Jp_Job.create(jobData);
    return new NextResponse(JSON.stringify({ data: result, message: "Job Created Successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    // Return an error response in case of failure
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    const { employerId, start, perPage, filter } = await request.json();

    let result: any = null;
    let whereClause: any = { employer_id: employerId };
    if (!filter.job && filter?.searchText !== "") {
      let words = filter.searchText.split(" ");
      let whereClauseAnd:any = [];
      words.forEach((word:string) => {
        let whereClauseOr = [];
        whereClauseOr.push({ title: { [Op.like]: "%" + word + "%" } });
        whereClauseOr.push({ job_type: { [Op.like]: "%" + word + "%" } });
        whereClauseOr.push({ region: { [Op.like]: "%" + word + "%" } });
        whereClauseOr.push({ job_address: { [Op.like]: "%" + word + "%" } });
        whereClauseAnd.push({ [Op.or]: whereClauseOr });
      });
      whereClause[Op.and] = whereClauseAnd;
    }
    let orderBy: any = [["createdAt", "DESC"]];

    if (perPage && start != undefined) {
      result = await Jp_Job.findAndCountAll({
        where: whereClause,
        offset: start,
        limit: perPage,
        order: orderBy,
      });
    } else if (filter?.job) {
      result = await Jp_Job.findAndCountAll({
        where: whereClause,
        attributes: ["job_id", "title"],
        order: orderBy,
      });
    } else {
      result = await Jp_Job.findAndCountAll({
        where: whereClause,
        order: orderBy,
      });
    }

    return new NextResponse(JSON.stringify({ data: result, message: "Employer jobs" }), {
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
    const { start, perPage } = await request.json();
    let result: any = null;
    let whereClause: any = {};

    let orderBy: any = [["createdAt", "DESC"]];

    if (perPage && start != undefined) {
      result = await Jp_Job.findAndCountAll({
        where: whereClause,
        offset: start,
        limit: perPage,
        order: orderBy,
      });
    } else {
      result = await Jp_Job.findAndCountAll({
        where: whereClause,
        order: orderBy,
      });
    }

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
