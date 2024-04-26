// "use client";
import Collaboration from "@/components/Collabration";
import { TProduct } from "@/types";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const url = process.env.API_URL as string;

//fetch product by category

// type ServerResponse = {
//   data: TProduct[];
//   total: number;
// };
const getCollabs = async () => {
  const response = await fetch(`${url}/api/collaborations`, {
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

  const collabs = await getCollabs();

  //uurt hamaaraltai collabuudiig haruulah heregtei

  if (!session) return redirect("/login");

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
