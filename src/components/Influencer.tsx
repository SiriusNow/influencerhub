import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ProductRating from "./Rating";
import InfluencerImage from "@/assets/img/team-2-800x800.jpg";
// type Props = {
// 	influencer: TInfluencer;
// };
export default function Influencers({ influencer }: any) {
  return (
    <Link href={`/influencers/${influencer._id}`}>
      <div className="relative h-[400px]   rounded-md group overflow-hidden">
        <Image
          src={InfluencerImage}
          alt="product-image"
          className="z-0 h-full w-full  object-fill object-center rounded-md  group-hover:scale-110 duration-200 transition-all overflow-hidden "
          width={300}
          height={400}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-md"></div>
        <div className="absolute bottom-4 left-0 px-3 w-full">
          <h3 className="text-white">{influencer.name}</h3>

          <div className="flex justify-between mt-2">
            <h4 className="text-blue-400">${influencer.email}</h4>
            {/* <ProductRating value={influencer.rating.rate} /> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
