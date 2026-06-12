import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "reels.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const localReels = JSON.parse(jsonData);
    return NextResponse.json(localReels);
  } catch (error) {
    console.error("Failed to read reels data:", error);
    return NextResponse.json(
      { error: "Failed to read reels data." },
      { status: 500 }
    );
  }
}
