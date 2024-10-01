import { NextResponse } from "next/server";
import Pages from "@/lib/models/pages";
import { writeFileSync } from "fs";
import { join } from "path";
const image_path = process.env.NEXT_PUBLIC_IMAGE_DESTINATION || "";
const upload_path = process.env.NEXT_PUBLIC_UPLOAD_PATH || "";

export const POST = async (request: Request) => {
  try {
    const { type } = await request.json();

    let result = await Pages.findOne({ where: { pagefor: type } });
    if (!result) {
      result = await Pages.create({ pagefor: type, content: "" });
    }

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error:any) {
    console.error("Error in POST:", error);
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    let contactData: any = {};
    const data = await request.formData();
    contactData = {
      type: data.get("type"),
      screen_content: data.get("screen_content") as string,
    };

    let content = JSON.parse(contactData.screen_content);
   
    const image: File | null = data.get("image") as unknown as File;
    const banner_image: File | null = data.get("banner_image") as unknown as File;

    if (image && typeof image !== "string") {
      const byteArray = await image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, image_path, image.name);

      writeFileSync(final_path, buffer);
      const final_url = image_path + image.name;
      content.image = final_url;
    }
    if (banner_image && typeof banner_image !== "string") {
      const byteArray = await banner_image.arrayBuffer();
      const buffer = Buffer.from(byteArray);
      const final_path = join(upload_path, image_path, banner_image.name);
      writeFileSync(final_path, buffer);

      const final_url = image_path + banner_image.name;
      content.banner_image = final_url;
    }

    let result = await Pages.update({content:JSON.stringify(content)}, { where: { pagefor: contactData.type } });
    return new NextResponse(JSON.stringify({ data: result, message: "Pages Updated Successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    // Return an error response in case of failure
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
