// "use client";
import Collaboration from "@/components/Collabration";
import { TProduct } from "@/types";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Empty from "@/components/Empty";
const url = process.env.API_URL as string;

const getUser = async (id: any): Promise<any> => {
  const response = await fetch(`${url}/api/brands/${id}`, {
    cache: "no-cache",
  });
  return await response.json();
};
const getCollabs = async (id: any) => {
  const response = await fetch(`${url}/api/collaborations/${id}`, {
    cache: "no-store",
  });

  return await response.json();
};

export default async function Collaborations({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const session = await getServerSession(nextauthOptions);
  const id = session?.user?.id;
  const collabs = await getCollabs(id);
  // const user = await getUser(id);

  //uurt hamaaraltai collabuudiig haruulah heregtei

  if (!session) return redirect("/login");
  if (collabs.length === 0) {
    return (
      <section className="py-2 ">
        <h2 className="capitalize mb-8">{searchParams.category}</h2>
        <Empty />
      </section>
    );
  }

  return (
    <section className="py-2 ">
      <h2 className="capitalize mb-8">{searchParams.category}</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 gap-2">
        {collabs?.map((collab: any) => (
          <Collaboration collab={collab} key={collab._id} />
        ))}
      </section>
    </section>
  );
}
