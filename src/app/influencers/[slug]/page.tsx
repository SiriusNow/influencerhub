// "use client";
import SendCollabButton from "@/components/SendCollab";
import ProductRating from "@/components/Rating";
import { TProduct } from "@/types";
import Image from "next/image";
import InfluencerImage from "@/assets/img/team-2-800x800.jpg";
import { useState } from "react";
import { toast } from "react-toastify";
import Spin from "@/components/AnimateButton";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/route";

const url = process.env.API_URL!;

// type Props = {
// 	product: TProduct;
// };

const getInfluencerCollab = async (slug: string): Promise<any> => {
  const response = await fetch(`${url}/api/influencers/${slug}`, {
    cache: "no-store",
  });

  return await response.json();
};

const InfluencerDetails = ({ influencer, user }: any) => {
  console.log(user);

  return (
    <section className=" pt-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-4 lg:gap-8">
        <div className="border rounded-md w-full h-[440px]">
          <Image
            src={InfluencerImage}
            width={300}
            height={400}
            alt="product"
            className="w-full h-[440px] rounded-md object-center object-fill"
          />
        </div>
        <div className="space-y-5 flex flex-col justify-center">
          <h1>{influencer.name}</h1>
          <div className="flex justify-between">
            <h2 className="text-blue-500">${influencer.email}</h2>
            {/* <ProductRating value={Influencer.rating.rate!} /> */}
          </div>

          <div className="pb-6">
            <h4>Product Description: </h4>
            <p>{influencer.social_link}</p>
          </div>
          <SendCollabButton influencer={influencer} user={user} />
        </div>
      </div>
    </section>
  );
};

export default async function SingleInfluencer({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(nextauthOptions);
  const influencer = await getInfluencerCollab(params.slug);

  return <InfluencerDetails influencer={influencer} user={session?.user} />;
}
