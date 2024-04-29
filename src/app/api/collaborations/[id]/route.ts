import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// export async function PUT(req: NextRequest, { params }: any) {
//   const { id } = params;
//   const { newTitle: title, newDescription: description } = await request.json();
//   await connectMongoDB();
//   await Topic.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json({ message: "Topic updated" }, { status: 200 });
// }

export async function GET(req: NextRequest, { params }: any) {
  try {
    const client = await clientPromise;
    const { id } = params;
    const db = client.db("hub");

    const collab = await db
      .collection("collaborations")

      .findOne({ _id: new ObjectId(id) });
    // .toArray();
    if (collab != null) {
      return NextResponse.json([collab]);
    }

    const collabs = await db.collection("collaborations").find({}).toArray();

    const reqB = collabs.filter((service: any) => service.brand_id === id);

    const reqA = collabs.filter((service: any) => service.influencer_id === id);

    if (reqA.length == 0) {
      return NextResponse.json(reqB);
    }
    return NextResponse.json(reqA);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
