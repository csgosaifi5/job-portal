import { NextResponse } from "next/server";
import Jp_Job from "@/lib/models/jp_jobs";
import JobApply from "@/lib/models/job_apply";

export const POST = async (request: Request) => {
  try {
    const { applicantId, employerId, jobId } = await request.json();

    let result = await JobApply.findOne({
      where: { employer_id: employerId, applicant_id: applicantId, job_id: jobId },
    });
    
    return new NextResponse(JSON.stringify({ data: result ? true : false }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in POST:", error);
    // Return an error response in case of failure
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    const { applicantId, employerId, jobId } = await request.json();

  const data:any = {employer_id: employerId, applicant_id: applicantId, job_id: jobId}

    let result = await JobApply.create(data);
    if(!result){
      return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
    return new NextResponse(JSON.stringify({ data: result, message: "Applied successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in POST:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const { start, perPage,applicantId } = await request.json();
    let result: any = null;
    let whereClause: any = {applicant_id:applicantId};

    let orderBy: any = [["createdAt", "DESC"]];
    const JobIds= await JobApply.findAll({where:whereClause,attributes:['job_id']});
    console.log(JobIds.map((item:any)=>item.job_id));
    

    if (perPage && start != undefined) {
      result = await Jp_Job.findAndCountAll({
        where: { job_id: JobIds.map((item:any)=>item.job_id)},
        offset: start,
        limit: perPage,
        order: orderBy,
      });
    } else {
      result = await Jp_Job.findAndCountAll({
        where: { job_id: JobIds.map((item:any)=>item.job_id)},
        order: orderBy,
      });
    }
    
    
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
