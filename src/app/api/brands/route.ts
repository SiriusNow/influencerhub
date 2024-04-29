// pages/api/brands/index.ts
import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const brands = await db.collection("brands").find({}).toArray();
    return NextResponse.json(brands);
  } catch (e) {
    console.error(e);
  }
}

// Define the POST method
export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const { name, email, tag_id, password, password_confirmation } =
      await req.json();

    if (!name || !email || !password) {
      return NextResponse.json("All fields are required", { status: 400 });
    }

    if (password !== password_confirmation) {
      return NextResponse.json("Password does not match", { status: 400 });
    }

    const user = await db.collection("brands").findOne({ email: email });

    if (user) {
      return NextResponse.json("Email is already taken", { status: 302 });
    }

    // Making hashed password
    const hashedPass = await bcrypt.hash(password, 10);

    const result = await db.collection("brands").insertOne({
      name,
      email,
      tag_id,
      password: hashedPass,
    });

    const response = {
      result,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
  // try {
  //   const client = await clientPromise;
  //   const db = client.db("hub");
  //   const body = await req.json();
  //   const { name, email, tag_id }: any = body;
  //   // Insert new brand
  //   const result = await db.collection("brands").insertOne({
  //     name,
  //     email,
  //     tag_id,
  //   });

  //   return NextResponse.json(result, { status: 201 });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(error, { status: 500 });
  // }
}

// Define the DELETE method
export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id }: any = body;

    // Delete brand by ID
    const result = await db
      .collection("brands")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Brand deleted successfully" });
    } else {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Define the PUT method (for update)
export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id, name, email, tag_id }: any = body;
    // Update brand by ID
    const result = await db
      .collection("brands")
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, email, tag_id } });

    if (result.matchedCount === 1) {
      return NextResponse.json({ message: "Brand updated successfully" });
    } else {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
