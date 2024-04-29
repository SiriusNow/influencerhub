// "use client";

import { TProduct } from "@/types";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Empty from "@/components/Empty";
import Collaboration from "@/components/Collabration";
const url = process.env.API_URL as string;

const getUser = async (id: any): Promise<any> => {
  const response = await fetch(`${url}/api/brands/${id}`, {
    cache: "no-cache",
  });
  return await response.json();
};
const getData = async (id: any) => {
  try {
    const collabsResponse = await fetch(`${url}/api/collaborations/${id}`, {
      cache: "no-store",
    });
    const collabs = await collabsResponse.json();

    if (collabs == null) {
      return null;
    }

    const collabdata = [];

    for (const collab of collabs) {
      const influencerResponse = await fetch(
        `${url}/api/influencers/${collab.influencer_id}`,
        {
          cache: "no-store",
        }
      );
      const influencer = await influencerResponse.json();

      const brandResponse = await fetch(
        `${url}/api/brands/${collab.brand_id}`,
        {
          cache: "no-store",
        }
      );
      const brand = await brandResponse.json();

      collabdata.push({ influencer, brand, collab });
    }

    return collabdata;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null in case of error
  }
};

export default async function Collaborations({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const session = await getServerSession(nextauthOptions);
  if (!session) return redirect("/login");
  const id = session?.user?.id;
  const user = await getUser(id);
  const collabs = await getData(id);

  if (collabs == null || collabs.length == 0) {
    return (
      <section className="py-2 ">
        <Empty />
      </section>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Борлуулагч Тал
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Нөлөөлөгч
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Ажлын мэдээлэл
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Үнийн дүн
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Үе шат
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Үйлдэл
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {collabs?.map((data: any) => (
          <Collaboration data={data} user={user} />
        ))}
      </tbody>
    </table>
  );
}
