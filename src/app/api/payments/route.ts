// pages/api/brands/index.ts
import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

// Retrieve all payments
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const payments = await db.collection("payments").find({}).toArray();

    return NextResponse.json(payments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Create a new payment
export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { amount, payment_method, payment_date }: any = body;

    // Insert new payment
    const result = await db.collection("payments").insertOne({
      amount,
      payment_method,
      payment_date: new Date(payment_date),
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Update an existing payment
export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id, amount, payment_method, payment_date }: any = body;

    // Update payment by ID
    const result = await db.collection("payments").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          amount,
          payment_method,
          payment_date: new Date(payment_date),
        },
      }
    );

    if (result.matchedCount === 1) {
      return NextResponse.json({ message: "Payment updated successfully" });
    } else {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Delete an existing payment
export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id }: any = body;

    // Delete payment by ID
    const result = await db
      .collection("payments")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Payment deleted successfully" });
    } else {
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
