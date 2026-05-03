import clientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    const { slug } = params;

    const client = await clientPromise;
    const db = client.db("suncart");

    const product = await db.collection("products").findOne({ slug });

    return Response.json({
      success: true,
      product,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}