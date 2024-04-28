import Influencers from "@/components/Influencer";
import SideNavbar from "@/components/SideNavbar";
import { TComments, TProduct } from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { nextauthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const url = process.env.API_URL as string;

const getTags = async (slug: string): Promise<any> => {
  const response = await fetch(`${url}/api/tags`, {
    cache: "no-store",
  });

  return await response.json();
};
const getComments = async (page: number): Promise<any> => {
  const response = await fetch(`${url}/api/influencers`, {
    cache: "no-cache",
  });
  return await response.json();
};
const getUser = async (id: any): Promise<any> => {
  const response = await fetch(`${url}/api/influencers/${id}`, {
    cache: "no-cache",
  });
  return await response.json();
};
const getService = async (): Promise<any> => {
  const response = await fetch(`${url}/api/services`, {
    cache: "no-store",
  });

  return await response.json();
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const pageNumber = Number(searchParams.page);
  const session = await getServerSession(nextauthOptions);

  if (!session) {
    redirect("/login");
  }
  const comm = await getComments(pageNumber);
  const user = await getUser(session.user?.id);
  const tags = await getTags("");
  const services = await getService();

  if (user !== null) {
    //influencer bol influencers page haragdah ystgui
    redirect("/collaborations");
  }

  //   const productCount = products.total;
  const productCount = comm.length;

  //defalut static limit
  const limit = 6;

  const pageCount = Math.ceil(productCount / limit);

  const pages = Array(pageCount)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <section className="flex flex-col md:flex-row gap-2">
      <aside className="w-full md:w-[220px] shrink-0">
        <SideNavbar tags={tags} />
      </aside>
      <div className="flex-1 py-2">
        <h2 className="capitalize mb-8">All Influencers</h2>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {/* {products.data.map((product) => ( */}
          {comm.map((influencer: any) => (
            <Influencers
              influencer={influencer}
              key={influencer.id}
              services={services}
            />
          ))}
        </div>
        <div className="h-16 mt-6 py-4 flex items-center justify-center space-x-2">
          {pageNumber > 1 && (
            <Link href={`?page=${pageNumber - 1}`} className="px-4 py-2 ">
              {"<<<"}
            </Link>
          )}
          {pages.map((page) => (
            <Link
              href={`?page=${page}`}
              className={` px-4 py-2 border border-gray-300 flex-row ${
                page === pageNumber ? "bg-blue-700 text-white" : ""
              }`}
              key={page}
            >
              {page}
            </Link>
          ))}
          {pageNumber < pageCount && (
            <Link href={`?page=${pageNumber + 1}`} className="px-4 py-2">
              {">>>"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
