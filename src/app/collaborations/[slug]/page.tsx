import CartButton from "@/components/CartButton";
import ProductRating from "@/components/Rating";
import { TProduct } from "@/types";
import Image from "next/image";
import CollabImage from "@/assets/img/team-4-470x470.png";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/route";
import States from "@/components/States";
import CollabChange from "@/components/CollabChange";

const url = process.env.API_URL!;

// type Props = {
// 	product: TProduct;
// };
const getUser = async (id: any): Promise<any> => {
  const response = await fetch(`${url}/api/brands/${id}`, {
    cache: "no-cache",
  });
  return await response.json();
};
const getSingleCollab = async (slug: string): Promise<any> => {
  const response = await fetch(`${url}/api/collaborations/${slug}`, {
    cache: "no-store",
  });

  return await response.json();
};
const getInfluencer = async (id: string): Promise<any> => {
  const response = await fetch(`${url}/api/influencers/${id}`, {
    cache: "no-store",
  });
  return await response.json();
};
const getBrand = async (id: string): Promise<any> => {
  const response = await fetch(`${url}/api/brands/${id}`, {
    cache: "no-store",
  });
  return await response.json();
};

const CollabDetailsBrand = ({ data }: any) => {
  const { col, inf, brand } = data;
  let showButton = true;
  if (col.state == "Pending" || col.state == "Working" || col.state == "Done") {
    showButton = false;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <h1>Brand</h1>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <States state={col.state} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Борлуулагч : {brand.name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              Нөлөөлөгч : {inf.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 ml-3">4 Саналтай</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">Хийх ажлууд: {col.collab_detail}</p>
            <div className="flex mb-4">
              <span className="title-font font-medium text-2xl text-gray-900 mb-2">
                Үнийн дүн : {col.collab_salary}
              </span>
            </div>
            <div className="mt-4">
              Хийгдсэн ажлууд:
              <ul className="divide-y divide-gray-200">
                {col.collab_works?.map((work: any, index: any) => (
                  <li key={index} className="py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-800 font-medium">
                          {work.name}
                        </h3>
                        <p className="text-gray-500">{work.work_link}</p>
                      </div>
                      {/* Add any action buttons here */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {showButton ? <CollabChange col={col} state={col.state} /> : <></>}
          </div>
        </div>
      </div>
    </section>
  );
};

const CollabDetailsInfluencer = ({ data }: any) => {
  const { col, inf, brand } = data;
  let showButton = true;
  if (
    col.state == "Collaboration" ||
    col.state == "Review" ||
    col.state == "Done"
  ) {
    showButton = false;
  }
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <h1>influencer</h1>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* <ol className="space-y-4 w-72">
            <li>
              <div
                className="w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
                role="alert"
              >
                <div className="flex items-center justify-between">
                  <span className="sr-only">User info</span>
                  <h3 className="font-medium">1. Request Sent</h3>
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </div>
              </div>
            </li>
            <li>
              <div
                className="w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
                role="alert"
              >
                <div className="flex items-center justify-between">
                  <span className="sr-only">Account info</span>
                  <h3 className="font-medium">2. Collaboration</h3>
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </div>
              </div>
            </li>
            <li>
              <div
                className="w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400"
                role="alert"
              >
                <div className="flex items-center justify-between">
                  <span className="sr-only">Social accounts</span>
                  <h3 className="font-medium">3. Working</h3>
                  <svg
                    className="rtl:rotate-180 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </div>
              </div>
            </li>
            <li>
              <div
                className="w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                role="alert"
              >
                <div className="flex items-center justify-between">
                  <span className="sr-only">Review</span>
                  <h3 className="font-medium">4. Review</h3>
                </div>
              </div>
            </li>
            <li>
              <div
                className="w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                role="alert"
              >
                <div className="flex items-center justify-between">
                  <span className="sr-only">Confirmation</span>
                  <h3 className="font-medium">5. Payment</h3>
                </div>
              </div>
            </li>
          </ol> */}
          <States state={col.state} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Нөлөөлөгч : {inf.name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              Борлуулагч: {brand.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 ml-3">4 Саналтай</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">Хийх ажлууд: {col.collab_detail}</p>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Үнийн дүн : {col.collab_salary}
              </span>
            </div>
            <div className="mt-4">
              Хийгдсэн ажлууд:
              <ul className="divide-y divide-gray-200">
                {col.collab_works?.map((work: any, index: any) => (
                  <li key={index} className="py-2">
                    <div className=" items-center justify-between">
                      <div>
                        <h3 className="text-gray-800 font-medium">
                          {work.name}
                        </h3>
                        <p className="text-gray-500">{work.work_link}</p>
                      </div>
                      {/* Add any action buttons here */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {showButton ? <CollabChange col={col} state={col.state} /> : <></>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default async function SingleCollab({
  params,
}: {
  params: { slug: string };
}) {
  const collab = await getSingleCollab(params.slug);
  const col = collab ? collab[0] : null;
  const inf = await getInfluencer(col.influencer_id);
  const brand = await getBrand(col.brand_id);
  const data = { col, inf, brand };
  const session = await getServerSession(nextauthOptions);
  const id = session?.user?.id;
  const user = await getUser(id);

  if (user) {
    return <CollabDetailsBrand data={data} />;
  }
  return <CollabDetailsInfluencer data={data} />;
}
