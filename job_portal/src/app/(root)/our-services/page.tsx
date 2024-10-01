import CommonService from "@/services/CommonService";
import OurServices from "@/components/sections/our-services/OurServices";

export async function generateMetadata() {
  const commServ = new CommonService();
  let response = await commServ.listAll({ type: "services" }, "pages", "POST");
  const aboutUsData = (response.content && JSON.parse(response.content)) || {};

  if (aboutUsData.meta_title && aboutUsData.meta_keywords && aboutUsData.meta_description) {
    return {
      title: aboutUsData.meta_title,
      keywords: aboutUsData.meta_keywords,
      description: aboutUsData.meta_description,
    };
  }
}
const page = () => {
  return (
   <OurServices />
  )
}

export default page