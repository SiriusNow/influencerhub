import nodemailer from "nodemailer";

const email = process.env.NEXT_PUBLIC_BURNER_USERNAME;
const pass = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
const tomail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: tomail,
};
