import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust import path
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(
  req: Request,
  { params }: { params: { reference: string } }
) {
  try {
    console.log(req.headers.get("content-type"));
    // ✅ Parse multipart form data (must come as FormData)
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const amount = formData.get("amount") as string | null;
    const referenceNumber = params.reference;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File is missing" },
        { status: 400 }
      );
    }

    // ✅ Save file locally
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filename = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // ✅ Update advertisement status
    await prisma.advertisements.update({
      where: { reference_number: referenceNumber },
      data: { status: "PaymentPending" },
    });

    // ✅ Add record to payment_ads
    const payment = await prisma.payment_ads.create({
      data: {
        reference_number: referenceNumber,
        file_path: `/uploads/${filename}`,
        original_filename: file.name,
        amount: amount ? parseFloat(amount) : null,
      },
    });

    return NextResponse.json({ success: true, payment });
  } catch (err: any) {
    console.error("Error submitting payment:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
