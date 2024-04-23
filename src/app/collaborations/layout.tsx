import SideNavbar from "@/components/SideNavbar";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Collaborations | InfluencerHUB",
  description: "Collab page. shows all products and also categorised products",
};
export default async function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(nextauthOptions);
  // if (!session) redirect("/login");
  return (
    <main className="flex flex-col md:flex-row gap-4">
      <aside className="w-full md:w-[220px] shrink-0">
        <SideNavbar />
      </aside>
      <section className="flex-1">{children}</section>
    </main>
  );
}
