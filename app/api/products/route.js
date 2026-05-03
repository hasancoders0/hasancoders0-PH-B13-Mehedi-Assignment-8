import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("suncart");

    const products = await db
      .collection("products")
      .find({})
      .toArray();

    return Response.json({
      success: true,
      products,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}