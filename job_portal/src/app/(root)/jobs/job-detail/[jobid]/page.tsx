import React from 'react'
import JobDetails from '@/components/sections/jobs/JobDetails'
import CommonService from "@/services/CommonService";


// export async function generateMetadata({ params }:any) {
//   const commserv = new CommonService();
//   let result = await commserv.getDetailsBySlug(params.jobid, "jobs");
  
//   if (result.meta_title && result.meta_keywords && result.meta_description) {
//     return {
//       title: result.meta_title,
//       keywords: result.meta_keywords,
//       description: result.meta_description,
//     };
//   }

  
// }

const Page = async({ params }:any) => {
  const commserv = new CommonService();
  let result = await commserv.getDetailsBySlug(params.jobid, "jobs");
  return (
    <>
    <JobDetails jobData={result}/>
    </>
  )
}

export default Page