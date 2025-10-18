import { NextResponse } from "next/server";
import { ToolService } from "@/services/tool";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params;

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
