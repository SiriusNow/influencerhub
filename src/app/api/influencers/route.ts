import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const influencers = await db.collection("influencers").find({}).toArray();

    return NextResponse.json(influencers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Create a new influencer
export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const {
      name,
      email,
      social_link,
      service_id,
      tag_id,
      password,
      password_confirmation,
    } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json("All fields are required", { status: 400 });
    }

    if (password !== password_confirmation) {
      return NextResponse.json("Password does not match", { status: 400 });
    }

    const user = await db.collection("influencers").findOne({ email: email });

    if (user) {
      return NextResponse.json("Email is already taken", { status: 302 });
    }

    // Making hashed password
    const hashedPass = await bcrypt.hash(password, 10);

    const result = await db.collection("influencers").insertOne({
      name,
      email,
      social_link,
      service_id,
      tag_id,
      image:
        "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=",
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
  //   const { name, email, tag_id, social_link, service_id }: any = body;

  //   const result = await db.collection("influencers").insertOne({
  //     name,
  //     email,
  //     tag_id,
  //     social_link,
  //     service_id,
  //   });

  //   return NextResponse.json(result, { status: 201 });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(error, { status: 500 });
  // }
}

// Update an existing influencer
export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id, name, email, tag_id, social_link, service_id }: any = body;

    const result = await db
      .collection("influencers")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, email, tag_id, social_link, service_id } }
      );

    if (result.matchedCount === 1) {
      return NextResponse.json({ message: "Influencer updated successfully" });
    } else {
      return NextResponse.json(
        { message: "Influencer not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// Delete an influencer by ID
export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("hub");
    const body = await req.json();
    const { id }: any = body;

    const result = await db
      .collection("influencers")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Influencer deleted successfully" });
    } else {
      return NextResponse.json(
        { message: "Influencer not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
