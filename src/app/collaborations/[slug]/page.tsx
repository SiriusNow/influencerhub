import CartButton from "@/components/CartButton";
import ProductRating from "@/components/Rating";
import { TProduct } from "@/types";
import Image from "next/image";
import CollabImage from "@/assets/img/team-4-470x470.png";

const url = process.env.API_URL!;

// type Props = {
// 	product: TProduct;
// };

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

const CollabDetails = ({ data }: any) => {
  const { col, inf, brand } = data;
  console.log(col, inf, brand);

  return (
    <section className=" pt-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-4 lg:gap-8">
        <div className="border rounded-md w-full h-[440px]">
          <Image
            src={CollabImage}
            width={300}
            height={400}
            alt="product"
            className="w-full h-[440px] rounded-md object-center object-fill"
          />
        </div>
        <div className="space-y-5 flex flex-col justify-center">
          <h1>{col.state}</h1>
          <div className="flex justify-between">
            <h2 className="text-blue-500">${col.collab_detail}</h2>
            {/* <ProductRating value={collab.rating.rate!} /> */}
          </div>
          <CartButton pd={col} />
          <div className="pb-6">
            <h4>Product influencer_id: </h4>
            <p>{col.influencer_id}</p>
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

  return <CollabDetails data={data} />;
}
