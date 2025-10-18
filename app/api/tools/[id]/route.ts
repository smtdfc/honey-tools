import { NextRequest, NextResponse } from "next/server";
import { ToolService } from "@/services/tool";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const tool = await ToolService.getToolById(id);
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    return NextResponse.json(tool);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch tool" },
      { status: 500 }
    );
  }
}
