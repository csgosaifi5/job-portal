import React from 'react'
import BlogDetails from '@/components/sections/blogs/BlogDetails'
import CommonService from "@/services/CommonService";


export async function generateMetadata({ params }:any) {
  const commserv = new CommonService();
  let result = await commserv.getDetailsBySlug(params.blogid, "blogs");
  
  if (result.meta_title && result.meta_keywords && result.meta_description) {
    return {
      title: result.meta_title,
      keywords: result.meta_keywords,
      description: result.meta_description,
    };
  }

  
}

const page = async({ params }:any) => {
  const commserv = new CommonService();
  let result = await commserv.getDetailsBySlug(params.blogid, "blogs");
  
  return (
   <BlogDetails blogData={result}/>
  )
}

export default page