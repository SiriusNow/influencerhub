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
import axios from "axios";
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
const getInsta = async (username: string): Promise<any> => {
  // const turl = `https://graph.instagram.com/%7Buser-id%7D/followers?fields=Id,username&access_token=${process.env.INSTAGRAM_TOKEN}`;
  // const url = `https://graph.instagram.com/${username}/fields?metric=follower_count&access_token=${process.env.INSTAGRAM_TOKEN}`;
  // const furl = `https://www.instagram.com/${username}/?__a=1&__d=1`;
  // const response = await fetch(furl, {
  //   cache: "no-store",
  // });
  // const followersCount = response;
  // console.log(response);

  // return await followersCount.json();
  // let res: any = { data: "" };
  // const url = `https://www.instagram.com/${username}`;
  // axios
  //   .get(url)
  //   .then((response) => {
  //     if (response.data.includes('meta property="og:description" content="')) {
  //       const followersCount = response.data
  //         .split('meta property="og:description" content="')[1]
  //         .split("Followers")[0];
  //       // console.log("followers:", followersCount);
  //       res.data = followersCount;
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  // console.log(res);
  // return res;
  let res: any = { data: "" };
  try {
    axios
      .get(url)
      .then((response) => {
        if (
          response.data.includes('meta property="og:description" content="')
        ) {
          const followersCount = response.data
            .split('meta property="og:description" content="')[1]
            .split("Followers")[0];
          // console.log("followers:", followersCount);
          res.data = followersCount;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error:", error);
    return null;
  } finally {
    return res;
  }
};

const InfluencerDetails = ({ influencer, user }: any) => {
  return (
    <section className=" pt-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-4 lg:gap-8">
        <div className="border rounded-md w-full h-[440px]">
          <Image
            src={InfluencerImage}
            layout="responsive"
            width={200}
            height={380}
            alt="product"
            className="w-auto h-400 rounded-md object-center"
          />
        </div>
        <div className="space-y-5 flex flex-col justify-center">
          <h1>{influencer.name}</h1>
          <div className="flex justify-between">
            <h2 className="text-blue-500">Total Followers: 22K</h2>
            <h2 className="text-blue-500">{influencer.email}</h2>
            {/* <ProductRating value={Influencer.rating.rate!} /> */}
          </div>
          <div className="pb-6">
            <h4>Influencer's service: </h4>
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
  // const data = await getInsta("bay_odon");

  return (
    <InfluencerDetails
      influencer={influencer}
      user={session?.user}
      // follower={data}
    />
  );
}
