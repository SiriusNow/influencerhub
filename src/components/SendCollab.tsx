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

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/collaborations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: "pending",
          collab_detail: "",
          influencer_id: influencer._id,
          brand_id: user.id,
          payment_id: "",
        }),
      });

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
  );
};

export default SendCollabButton;
