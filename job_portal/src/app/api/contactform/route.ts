import { NextResponse } from "next/server";
import ContactForm from "@/lib/models/contactForm";

export const POST = async (request: Request) => {
  try {
    const contactFormData = await request.json();

    let result = await ContactForm.create(contactFormData);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    // Return an error response in case of failure
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    const { start, perPage } = await request.json();
    let result: any = null;
    let whereClause: any = {};

    let orderBy: any = [["createdAt", "DESC"]]; 

    if (perPage && start != undefined) {
      result = await ContactForm.findAndCountAll({
        where: whereClause,
        offset: start,
        limit: perPage,
        order: orderBy,
      });
    } else {
      result = await ContactForm.findAndCountAll({
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

export const DELETE = async (request: Request) => {
  const id = await request.json();

  try {
    let result;
    if (id) {
      result = await ContactForm.destroy({ where: { id: id } });
    }
    return result
      ? new NextResponse(JSON.stringify({message:"Record Deleted Successfully"}), { status: 200 })
      : new NextResponse("Record not found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
