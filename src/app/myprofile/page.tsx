import Link from "next/link";
import Profile from "@/components/Profile";
import ProfileBrand from "@/components/ProfileBrand";
import { nextauthOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile | InfluencerHUB",
  description: "Profile, your account",
};
const url = process.env.API_URL!;

const getUser = async (id: any): Promise<any> => {
  const response = await fetch(`${url}/api/brands/${id}`, {
    cache: "no-cache",
  });
  return await response.json();
};
const getServices = async (slug: string): Promise<any> => {
  const response = await fetch(`${url}/api/services`, {
    cache: "no-store",
  });
};
const getTags = async (): Promise<any> => {
  const response = await fetch(`${url}/api/tags`, {
    cache: "no-store",
  });
};

export default async function LoginPage() {
  const session = await getServerSession(nextauthOptions);
  if (!session) {
    redirect("/login");
  }
  const id = session?.user?.id;
  const user = await getUser(id);
  // const services = await getServices("s");
  // const tags = await getTags();

  if (!id) {
    return <h1>Not found</h1>;
  }

  if (user && id) {
    return <ProfileBrand brandId={id} />;
  }
  return <Profile userId={id} />;
}
