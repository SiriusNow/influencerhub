import Influencers from "@/components/Influencer";
import SideNavbar from "@/components/SideNavbar";
import { TComments, TProduct } from "@/types";
import Link from "next/link";

const url = process.env.API_URL as string;

// type ServerResponse = {
//   data: TComments[];
//   total: number;
// };

//fetch product by category
const getComments = async (page: number): Promise<any> => {
  const response = await fetch(`${url}/api/influencers`, {
    cache: "no-cache",
  });
  return await response.json();
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const pageNumber = Number(searchParams.page);
  const comm = await getComments(pageNumber);
  console.log(comm);

  const products = [
    {
      id: "1",
      title: "Gremix",
      price: 0,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "YouTuber",
      image: "	https://news.mn/wp-content/uploads/2020/01/gremix-2.jpg",
      rating: {
        rate: 4.5,
        count: 50,
      },
    },
    {
      id: "2",
      title: "Ganaa",
      price: 0,
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Meme maker",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mol_ganaa.jpg/480px-Mol_ganaa.jpg",
      rating: {
        rate: 4.0,
        count: 30,
      },
    },
    {
      id: "3",
      title: "Javkhlan",
      price: 0,
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Singer",
      image:
        "https://cdns-images.dzcdn.net/images/cover/c4b16122ae94c055d2562d42e809be99/264x264.jpg",
      rating: {
        rate: 4.0,
        count: 30,
      },
    },
    {
      id: "4",
      title: "RokitBay",
      price: 0,
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: "Rapper",
      image:
        "	https://api.daavkatunes.mn/uploads/artist/5ad60172340d9146137903a2.jpg",
      rating: {
        rate: 4.0,
        count: 30,
      },
    },
  ];

  //   const productCount = products.total;
  const productCount = products.length;

  //defalut static limit
  const limit = 6;

  const pageCount = Math.ceil(productCount / limit);

  const pages = Array(pageCount)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <section className="flex flex-col md:flex-row gap-2">
      <aside className="w-full md:w-[220px] shrink-0">
        <SideNavbar />
      </aside>
      <div className="flex-1 py-2">
        <h2 className="capitalize mb-8">All Influencers</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
          {/* {products.data.map((product) => ( */}
          {comm.map((influencer: any) => (
            <Influencers influencer={influencer} key={influencer.id} />
          ))}
        </section>
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
