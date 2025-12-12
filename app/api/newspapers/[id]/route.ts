import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "newspaper_data.json");

const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeData = (data: any) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// UPDATE newspaper
export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const body = await req.json();

  const data = readData();
  if (!data[id])
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  data[id] = { ...data[id], ...body };
  writeData(data);

  return NextResponse.json({ success: true });
}

// DELETE newspaper
export async function DELETE(req: Request, { params }: any) {
  const { id } = params;

  const data = readData();
  if (!data[id])
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  delete data[id];
  writeData(data);

  return NextResponse.json({ success: true });
}
