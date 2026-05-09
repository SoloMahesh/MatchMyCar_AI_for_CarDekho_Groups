import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid IDs array" }, { status: 400 });
    }

    const cars = await prisma.car.findMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Compare API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch comparison data" },
      { status: 500 }
    );
  }
}
