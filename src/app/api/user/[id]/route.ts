import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ name: "John Doe" }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: "User delete" }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ message: "User update" }, { status: 201 });
}
