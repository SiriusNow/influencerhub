// import CartList from "../components/CartList";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Cart | InfluencerHUB",
  description: "Description",
};
export default async function Cart() {
  const session = await getServerSession(nextauthOptions);

  return session ? <h1>Successs</h1> : redirect("/login");
}
