import Image from "next/image";
import Link from "next/link";
import ProductRating from "./Rating";
import CollabImage from "@/assets/img/team-4-470x470.png";
import InfluencerImage from "@/assets/img/team-2-800x800.jpg";

export default function CollabAsInfluencer({ collab }: any) {
  return (
    <>
      {/* <Link href={`/collaborations/${collab._id}`}> */}
      {/* <div className="relative h-[400px]   rounded-md group overflow-hidden">
        <Image
          src={CollabImage}
          alt="product-image"
          className="z-0 h-full w-full  object-fill object-center rounded-md  group-hover:scale-110 duration-200 transition-all overflow-hidden "
          width={300}
          height={400}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-md"></div>
        <div className="absolute bottom-4 left-0 px-3 w-full">
          <h3 className="text-white">{collab.state}</h3>

          <div className="flex justify-between mt-2">
            <h4 className="text-blue-400">${collab.details}</h4>
            <ProductRating value={collab.rating.rate} />
          </div>
        </div>
      </div>   */}
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <div className="flex space-around">
            <Image
              className="w-24 h-24 mb-3 rounded-full shadow-lg flex-1 mx-2"
              // src="/docs/images/people/profile-picture-3.jpg"
              src={CollabImage}
              alt="Bonnie image"
            />
            <Image
              className="w-24 h-24 mb-3 rounded-full shadow-lg flex-1 mx-2"
              // src="/docs/images/people/profile-picture-3.jpg"
              src="	https://scontent.cdninstagram.com/v/t51.2885-19/12…EaW7iC0fBCtJ24BsRxcfag&oe=6631B899&_nc_sid=10d13b"
              alt="Bonnie image"
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {collab.state}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {collab.details}
          </span>
          <div className="flex mt-4 md:mt-6">
            <Link
              href={`/collaborations/${collab._id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Дэлгэрэнгүй
            </Link>
            {/* <a
              href="#" 
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Дэлгэрэнгүй
            </a> */}
          </div>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}
