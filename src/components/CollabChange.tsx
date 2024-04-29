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
const CollabChange = ({ col, state }: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  let states = [
    "Pending",
    "Collaboration",
    "Working",
    "Review",
    "Payment",
    "Done",
  ];
  let setText = states[states.indexOf(state) + 1];
  let text = "";
  if (state == "Pending") {
    text = "Accept Request";
  }
  if (state == "Collaboration") {
    text = "Start Working";
  }
  if (state == "Working") {
    text = "Done Working";
  }
  if (state == "Review") {
    text = "Done Review & Pay";
  }

  const paymentClick = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/payment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: col._id,
          state: setText,
          collab_detail: col.collab_detail,
          influencer_id: col.influencer_id,
          brand_id: col.brand_id,
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
  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/collaborations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: col._id,
          state: setText,
          collab_detail: col.collab_detail,
          influencer_id: col.influencer_id,
          brand_id: col.brand_id,
          payment_id: "",
        }),
      });
      console.log(response);

      if (response.status === 200 && response.ok === true) {
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
      className="inline-flex w-full items-center justify-center rounded-md bg-green-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
      onClick={state == "Review" ? paymentClick : handleClick}
    >
      {loading ? (
        <span className="flex items-center">
          <Spin />
          Sending...
        </span>
      ) : (
        `${text}`
      )}
    </button>
  );
};

export default CollabChange;
