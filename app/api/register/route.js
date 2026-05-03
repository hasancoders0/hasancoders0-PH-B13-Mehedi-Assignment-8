import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, photo, password } = body;

    if (!name || !email || !password) {
      return Response.json({
        success: false,
        error: "All required fields missing",
      });
    }

    const client = await clientPromise;
    const db = client.db("suncart");

    // check existing user
    const existing = await db
      .collection("users")
      .findOne({ email });

    if (existing) {
      return Response.json({
        success: false,
        error: "User already exists",
      });
    }

    await db.collection("users").insertOne({
      name,
      email,
      photo,
      password, // (we will hash later)
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      message: "User registered",
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}