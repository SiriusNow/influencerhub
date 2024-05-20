import { NextResponse, NextRequest } from "next/server";
import { mailOptions, transporter } from "../../../lib/nodemailer";
const nodemailer = require("nodemailer");
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Handles POST requests to /api

export async function POST(request: NextRequest) {
  const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
  const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  console.log("dealing with request");
  //   const formData = await request.formData();
  // const data = await request.json();
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    await transporter.sendMail({
      from: username,
      to: myEmail,
      // to: email,
      subject: `InfluencerHUB мэдэгдэл`,
      html: `
        <p>Email: ${email} </p>
        <p>Message: ${message} </p>
        `,
    });

    logger.info(`Sending mail to - ${email}`);
    // transporter.sendMail(mailOptions, (error: any, info: any) => {
    //   if (error) {
    //     logger.error(error);
    //   } else {
    //     logger.info("Email sent: " + info.response);
    //   }
    // });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "COULD NOT SEND MESSAGE" },
      { status: 500 }
    );
  }
}
