// pages/api/brands/index.ts
import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const brands = await db
      .collection("tags")
      .find({})
      //   .sort({ metacritic: -1 })
      //   .limit(10)
      .toArray();
    return NextResponse.json(brands);
  } catch (e) {
    console.error(e);
  }
}

// Create a new service
export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { name, description }: any = body;

    const result = await db.collection("tags").insertOne({
      name,
      description,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Update an existing service
export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id, name, description }: any = body;

    const result = await db
      .collection("tags")
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, description } });

    if (result.matchedCount === 1) {
      return NextResponse.json({ message: "tag updated successfully" });
    } else {
      return NextResponse.json({ message: "tag not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Delete a service by ID
export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id }: any = body;

    const result = await db
      .collection("tags")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "tag deleted successfully" });
    } else {
      return NextResponse.json({ message: "tag not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
