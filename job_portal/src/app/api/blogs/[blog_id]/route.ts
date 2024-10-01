import { NextResponse } from "next/server";
import Blog from "@/lib/models/blogs";

export const GET = async (request: Request) => {
  const blog_id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    let result;
    if (blog_id) {
      result = await Blog.findOne({ where: { blog_id: blog_id } });
    }
    return result
      ? new NextResponse(JSON.stringify(result), { status: 200 })
      : new NextResponse("Blog not found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  const slug = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    let result;
    if (slug) {
      result = await Blog.findOne({ where: { slug: slug } });
    }
    return result
      ? new NextResponse(JSON.stringify(result), { status: 200 })
      : new NextResponse("Blog not found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const DELETE = async (request: Request) => {
  const blog_id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    let result;
    if (blog_id) {
      result = await Blog.destroy({ where: { blog_id: blog_id } });
    }
    return result
      ? new NextResponse(JSON.stringify({message:"Blog Deleted Successfully"}), { status: 200 })
      : new NextResponse("Blog not found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

