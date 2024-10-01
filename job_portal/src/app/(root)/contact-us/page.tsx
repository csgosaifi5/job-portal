import React from 'react'
import ContactUs from '@/components/sections/contact-page/ContactUs'
import CommonService from "@/services/CommonService";

export async function generateMetadata() {
  const commServ = new CommonService();
  let response = await commServ.listAll({ type: "contact-us" }, "pages", "POST");
  const contactUsData = (response.content && JSON.parse(response.content)) || {};

  if (contactUsData.meta_title && contactUsData.meta_keywords && contactUsData.meta_description) {
    return {
      title: contactUsData.meta_title,
      keywords: contactUsData.meta_keywords,
      description: contactUsData.meta_description,
    };
  }
}
const page = () => {
  return (
    <ContactUs />
  )
}

export default page