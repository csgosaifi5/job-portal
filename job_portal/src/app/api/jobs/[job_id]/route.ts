import { NextResponse } from "next/server";
import Jp_Job from "@/lib/models/jp_jobs";

// export const GET = async (request: Request) => {
//   const job_id = request.url.slice(request.url.lastIndexOf("/") + 1);

//   try {
//     let result;
//     if (job_id) {
//       result = await Jp_Job.findOne({ where: { job_id: job_id } });
//     }
//     return result
//       ? new NextResponse(JSON.stringify(result), { status: 200 })
//       : new NextResponse("Jp_Job not found", { status: 404 });
//   } catch (error) {
//     console.log(error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

export const PUT = async (request: Request) => {
  const slug = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    let result;
    if (slug) {
      result = await Jp_Job.findOne({ where: { slug: slug } });
    }
    return result
      ? new NextResponse(JSON.stringify(result), { status: 200 })
      : new NextResponse("Job not found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const DELETE = async (request: Request) => {
  const job_id = request.url.slice(request.url.lastIndexOf("/") + 1);

  try {
    let result;
    if (job_id) {
      result = await Jp_Job.destroy({ where: { job_id: job_id } });
    }
    return result
      ? new NextResponse(JSON.stringify({message:"Job Deleted Successfully"}), { status: 200 })
      : new NextResponse("Job not found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

