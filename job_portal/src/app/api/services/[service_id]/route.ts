import { NextResponse } from "next/server";
import Service from "@/lib/models/services";

export const GET = async (request: Request) => {
  const service_id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    let result;
    if (service_id) {
      result = await Service.findOne({ where: { service_id: service_id } });
    }
    return result
      ? new NextResponse(JSON.stringify(result), { status: 200 })
      : new NextResponse("Service not found", { status: 404 });
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
      result = await Service.findOne({ where: { slug: slug } });
    }
    return result
      ? new NextResponse(JSON.stringify(result), { status: 200 })
      : new NextResponse("Service not found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const DELETE = async (request: Request) => {
  const service_id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    let result;
    if (service_id) {
      result = await Service.destroy({ where: { service_id: service_id } });
    }
    return result
      ? new NextResponse(JSON.stringify({message:"Service Deleted Successfully"}), { status: 200 })
      : new NextResponse("Service not found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

