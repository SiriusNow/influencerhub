// import CartList from "../components/CartList";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Cart | InfluencerHUB",
  description:
    "It shows all the item that you added into your cart to buy products",
};
export default async function Cart() {
  const session = await getServerSession(nextauthOptions);
  console.log(session);

  return session ? <h1>Successs</h1> : redirect("/login");
}
