import Image from "next/image";
import Link from "next/link";
import ProductRating from "./Rating";
import CollabImage from "@/assets/img/team-4-470x470.png";
import InfluencerImage from "@/assets/img/team-2-800x800.jpg";
const defaultImage =
  "https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=";

export default function Collaborations({ collab }: any) {
  return (
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
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg flex-1 mx-2"
            // src="/docs/images/people/profile-picture-3.jpg"
            // src={influencer.image ? influencer.image : defaultImage}
            src={defaultImage}
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
  );
}
