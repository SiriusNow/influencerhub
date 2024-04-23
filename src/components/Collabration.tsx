import Image from "next/image";
import Link from "next/link";
import ProductRating from "./Rating";
import CollabImage from "@/assets/img/team-4-470x470.png";

export default function Collaborations({ collab }: any) {
  return (
    <Link href={`/collaborations/${collab._id}`}>
      <div className="relative h-[400px]   rounded-md group overflow-hidden">
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
            {/* <ProductRating value={collab.rating.rate} /> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
