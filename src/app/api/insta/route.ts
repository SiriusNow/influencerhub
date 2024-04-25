// an example to get cookie using getCookie function
import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import {
  getCookie,
  igApi,
  isIgPostUrl,
  shortcodeFormatter,
} from "insta-fetcher";

// const Insta = require("scraper-instagram");
// const InstaClient = new Insta();

export async function GET(req: NextRequest) {
  //   // some example working with axios proxy
  //   InstaClient.authBySessionId(
  //     "5879721270%3AGJpgMXW26Fvaba%3A4%3AAYds1Yr79reny-qN1M154up2zHtUmXJgCYRP0jj4WA"
  //   )
  //     .then((account: any) => console.log(account))
  //     .catch((err: any) => console.error(err));
  //   InstaClient.getProfile("bay_odon")
  //     .then((profile: any) => console.log(profile))
  //     .catch((err: any) => console.error(err));
  try {
    const influencers = "";

    return NextResponse.json(influencers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
