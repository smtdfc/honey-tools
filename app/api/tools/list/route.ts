import { NextResponse } from "next/server";
import { ToolService } from "@/services/tool";

export async function GET() {
  try {
    const tools = await ToolService.getAllTools();
    return NextResponse.json(tools);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch tool" },
      { status: 500 }
    );
  }
}
