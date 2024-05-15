"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cartSlice";
import { TProduct } from "@/types";
import { useState } from "react";
import Spin from "./AnimateButton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
const SendCollabButton = ({ influencer, user }: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [salary, setSalary] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value);
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
          collab_salary: salary,
          payment_id: "",
        }),
      });

      await sendEmail(
        `Нөлөөлөгч тань руу хүсэлт ирлээ. ${desc} ажлуудыг ${salary} хөлсөөр хийгдэнэ.`,
        influencer.email
      );

      if (response.status === 201 && response.ok === true) {
        setLoading(false);
        toast.success("Хүсэлт амжилттай илгээгдлээ");
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
      setError("Алдаа rарлаа дахин оролдоно уу");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="py-4">
        <label htmlFor="text" className="text-base font-medium py-4">
          Хийх ажлууд:
        </label>
        <div className="mt-2">
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Энэ хамтралаар ямар ажил хийлгэхээ бичнэ үү?"
            id="text"
            name="text"
            onChange={handleChange}
            value={desc}
          />
        </div>
      </div>
      <div className="py-4">
        <label htmlFor="username" className="text-base font-medium py-4">
          Ажлын хөлс:
        </label>
        <div className="mt-2">
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Нөлөөлөгчид өгөх ажлын хөлсийг оруулна уу"
            id="text"
            name="text"
            onChange={handleChanges}
            value={salary}
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
            Илгээж байна...
          </span>
        ) : (
          "Хамтрах хүсэлт явуулах"
        )}
      </button>
    </>
  );
};

export default SendCollabButton;
