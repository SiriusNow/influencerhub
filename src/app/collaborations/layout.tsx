import SideNavbar from "@/components/SideNavbar";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const url = process.env.API_URL as string;

export const metadata = {
  title: "Collaborations | InfluencerHUB",
  description: "Collab page. shows all products and also categorised products",
};
const getTags = async (id: any): Promise<any> => {
  const response = await fetch(`${url}/api/tags`, {
    cache: "no-cache",
  });
  // const res = await response.json();
  return await response.json();
};
export default async function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(nextauthOptions);
  // if (!session) redirect("/login");
  const tags = await getTags("");
  return (
    <main className="flex flex-col md:flex-row gap-4">
      <aside className="w-full md:w-[220px] shrink-0">
        <SideNavbar tags={tags} />
      </aside>
      <section className="flex-1">{children}</section>
    </main>
  );
}
