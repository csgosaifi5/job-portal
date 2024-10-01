import { NextResponse } from "next/server";
import Blog from "@/lib/models/blogs";
import { writeFileSync } from "fs";
import { join } from "path";
const image_path = process.env.NEXT_PUBLIC_IMAGE_DESTINATION || "";
const upload_path = process.env.NEXT_PUBLIC_UPLOAD_PATH || "";

export const PATCH = async (request: Request) => {
  try {
    const { start, perPage } = await request.json();
    let result: any = null;
    let whereClause: any = {};

    let orderBy: any = [["createdAt", "DESC"]];

    if (perPage && start != undefined) {
      result = await Blog.findAndCountAll({
        where: whereClause,
        offset: start,
        limit: perPage,
        order: orderBy,
      });
    } else {
      result = await Blog.findAndCountAll({
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
export const POST = async (request: Request) => {
  try {
    let blogData: any = {};
    const data = await request.formData();
    blogData = {
      title: data.get("title"),
      description: data.get("description"),
      banner_title: data.get("banner_title"),
      meta_title: data.get("meta_title"),
      meta_description: data.get("meta_description"),
      meta_keywords: data.get("meta_keywords"),
      tags: data.get("tags"),
    };

    const image: File | null = data.get("image") as unknown as File;
    const banner_image: File | null = data.get("banner_image") as unknown as File;

    if (image) {
      const byteArray = await image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, image_path, image.name);

      const final_url = image_path + image.name;
      writeFileSync(final_path, buffer);
      blogData.image = final_url;
    }
    if (banner_image) {
      const byteArray = await banner_image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, image_path, banner_image.name);

      const final_url = image_path + banner_image.name;
      writeFileSync(final_path, buffer);
      blogData.banner_image = final_url;
    }
    let slug = blogData.title.toLowerCase().replace(/\s+/g, "-");
    slug = slug.replace(/<[^>]*>/g, "-");
    slug = slug.replace(/[,.:;!?()]/g, "-");

    let dbSlug = await Blog.findOne({ where: { slug: slug } });
    while (dbSlug) {
      const randomString = Math.random().toString(36).substring(2, 5);
      slug += `-${randomString}`;
      dbSlug = await Blog.findOne({ where: { slug: slug } });
    }

    blogData.slug = slug;

    let result = await Blog.create(blogData);
    return new NextResponse(JSON.stringify({ data: result, message: "Blog Created Successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    // Return an error response in case of failure
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    let blogData: any = {};
    const data = await request.formData();
    blogData = {
      blog_id: data.get("blog_id"),
      title: data.get("title"),
      description: data.get("description"),
      banner_title: data.get("banner_title"),
      meta_title: data.get("meta_title"),
      meta_description: data.get("meta_description"),
      meta_keywords: data.get("meta_keywords"),
      tags: data.get("tags"),
    };

    const image: File | null = data.get("image") as unknown as File;
    const banner_image: File | null = data.get("banner_image") as unknown as File;

    if (image && typeof image !== "string") {
      const byteArray = await image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, image_path, image.name);

      writeFileSync(final_path, buffer);
      const final_url = image_path + image.name;
      blogData.image = final_url;
    }
    if (banner_image && typeof banner_image !== "string") {
      const byteArray = await banner_image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, image_path, banner_image.name);
      writeFileSync(final_path, buffer);

      const final_url = image_path + banner_image.name;
      blogData.banner_image = final_url;
    }

    const dbBlog: any = await Blog.findOne({ where: { blog_id: blogData.blog_id } });
    let slug = dbBlog.slug;

    if (blogData.title !== dbBlog.title) {
      slug = blogData.title.toLowerCase().replace(/\s+/g, "-");
      slug = slug.replace(/<[^>]*>/g, "-");
      slug = slug.replace(/[,.:;!?()]/g, "-");
      let dbSlug = await Blog.findOne({ where: { slug: slug } });
      while (dbSlug) {
        const randomString = Math.random().toString(36).substring(2, 5);
        slug += `-${randomString}`;
        dbSlug = await Blog.findOne({ where: { slug: slug } });
      }
    }

    blogData.slug = slug;

    let result = await Blog.update(blogData, { where: { blog_id: blogData.blog_id } });
    return new NextResponse(JSON.stringify({ data: result, message: "Blog Updated Successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    // Return an error response in case of failure
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
