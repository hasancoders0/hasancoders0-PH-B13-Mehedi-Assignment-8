import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("suncart");

    const result = await db.collection("users").findOneAndUpdate(
      { email: body.email },
      {
        $set: {
          name: body.name,
        },
      },
      { returnDocument: "after" }
    );

    return NextResponse.json({
      success: true,
      user: result.value,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Update failed",
    });
  }
}