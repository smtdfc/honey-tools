import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const tools = await prisma.tools.findMany();
  return NextResponse.json(tools);
}
