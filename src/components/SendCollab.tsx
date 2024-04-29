"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cartSlice";
import { TProduct } from "@/types";
import { useState } from "react";
import Spin from "./AnimateButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// type ButtonProps = {
// 	pd: TProduct;
// };
const SendCollabButton = ({ influencer, user }: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/collaborations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: "Pending",
          collab_detail: desc,
          influencer_id: influencer._id,
          brand_id: user.id,
          payment_id: "",
        }),
      });
      console.log(response);

      if (response.status === 201 && response.ok === true) {
        setLoading(false);
        toast.success("Collab request sent successfully");
        router.replace("/collaborations");
      } else {
        const error = await response.json();
        if (error) {
          setLoading(false);
          setError(error);
        }
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="py-4">
        <label htmlFor="username" className="text-base font-medium py-4">
          Collaboration details:
        </label>
        <div className="mt-2">
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Collaboration details:"
            id="text"
            name="text"
            onChange={handleChange}
            value={desc}
          />
        </div>
      </div>
      <button
        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
        onClick={handleClick}
      >
        {loading ? (
          <span className="flex items-center">
            <Spin />
            Sending...
          </span>
        ) : (
          "Send Collab Request"
        )}
      </button>
    </>
  );
};

export default SendCollabButton;
