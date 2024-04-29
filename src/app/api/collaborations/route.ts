import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

// pages/api/collaborations/index.ts
// Retrieve all collaborations
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");

    const collaborations = await db
      .collection("collaborations")
      .find({})
      .toArray();

    return NextResponse.json(collaborations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Create a new collaboration
export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const {
      state,
      collab_detail,
      influencer_id,
      brand_id,
      collab_salary,
      payment_id,
      collab_works,
    }: any = body;

    // Insert new collaboration

    const result = await db.collection("collaborations").insertOne({
      state: state,
      collab_detail: collab_detail,
      influencer_id: influencer_id,
      brand_id: brand_id,
      collab_salary: collab_salary,
      payment_id: payment_id,
      collab_works: [],
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Update an existing collaboration
export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const {
      id,
      state,
      collab_detail,
      influencer_id,
      brand_id,
      collab_salary,
      payment_id,
      collab_works,
    }: any = body;

    // Update collaboration by ID
    const result = await db.collection("collaborations").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          state,
          collab_detail,
          influencer_id,
          brand_id,
          collab_salary,
          payment_id,
          collab_works,
        },
      }
    );

    if (result.matchedCount === 1) {
      return NextResponse.json({
        message: "Collaboration updated successfully",
      });
    } else {
      return NextResponse.json(
        { message: "Collaboration not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Delete an existing collaboration
export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id }: any = body;

    // Delete collaboration by ID
    const result = await db
      .collection("collaborations")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({
        message: "Collaboration deleted successfully",
      });
    } else {
      return NextResponse.json(
        { message: "Collaboration not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
