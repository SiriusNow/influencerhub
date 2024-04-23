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

    const collabs = await db
      .collection("collaborations")
      .find({
        $or: [
          { _id: new ObjectId(id) },
          { brand_id: new ObjectId(id) },
          { influencer_id: new ObjectId(id) },
        ],
      })
      .toArray();
    return NextResponse.json(collabs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// export async function GET(request, { params }) {
//   const { id } = params;
//   await connectMongoDB();
//   const topic = await Topic.findOne({ _id: id });
//   return NextResponse.json({ topic }, { status: 200 });
// }
