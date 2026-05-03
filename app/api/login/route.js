import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const client = await clientPromise;
    const db = client.db("suncart");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return Response.json({
        success: false,
        error: "User not found",
      });
    }

    if (user.password !== password) {
      return Response.json({
        success: false,
        error: "Invalid password",
      });
    }

    return Response.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}