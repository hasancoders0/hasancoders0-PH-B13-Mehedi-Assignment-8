import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("suncart");

    const result = await db.command({ ping: 1 });

    return Response.json({
      success: true,
      message: "MongoDB Connected ✅",
      result,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}