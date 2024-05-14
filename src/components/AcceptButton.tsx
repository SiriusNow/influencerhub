"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cartSlice";
import { TProduct } from "@/types";
import { useState } from "react";
import Spin from "./AnimateButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

// type ButtonProps = {
// 	pd: TProduct;
// };
const AcceptButton = ({ col, user }: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const state = col.state;
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
    text = "Хүсэлтийг хүлээн авах";
  }
  if (state == "Collaboration") {
    text = "Ажлыг эхлүүлэх";
  }
  if (state == "Working") {
    text = "Ажиллаж дууссан";
  }
  if (state == "Review") {
    text = "Шалгаад Шилжүүллээ";
  }

  const sendEmail = async (message: any, email: any) => {
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Influencer HUB",
          email: email,
          message: message,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClick = async () => {
    setLoadingAccept(true);

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
          collab_salary: col.collab_salary,
          collab_works: col.collab_works,
          payment_id: "",
        }),
      });
      sendEmail("", email);

      if (response.status === 200 && response.ok === true) {
        setLoadingAccept(false);
        toast.success("Дараагийн үе шат руу шилжлээ");
        router.replace("/collaborations");
      } else {
        const error = await response.json();
        if (error) {
          setLoadingAccept(false);
          setError(error);
        }
      }
    } catch (error) {
      console.error(error);
      setLoadingAccept(false);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoadingAccept(false);
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/collaborations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: col._id,
          state: setText,
          collab_detail: col.collab_detail,
          influencer_id: col.influencer_id,
          brand_id: col.brand_id,
          collab_works: col.collab_works,
          payment_id: "",
        }),
      });

      if (response.status === 200 && response.ok === true) {
        setLoading(false);
        toast.success("Амжилттай устгалаа");
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
  if (user == null && state == "Pending") {
    return (
      <>
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleClick}
        >
          {loadingAccept ? (
            <span className="flex items-center">
              <Spin />
              Илгээж байна...
            </span>
          ) : (
            "Хүсэлтийг хүлээн авах"
          )}
        </button>
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleDelete}
        >
          {loading ? (
            <span className="flex items-center">
              <Spin />
              Устгаж байна...
            </span>
          ) : (
            "Устгах"
          )}
        </button>
      </>
    );
  }

  return (
    <Link
      href={`/collaborations/${col._id}`}
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Дэлгэрэнгүй
    </Link>
  );
};

export default AcceptButton;
