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
const CollabChange = ({ data, state }: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [workName, setWorkName] = useState("");
  const [workLink, setWorkLink] = useState("");
  const { col, inf, brand } = data;

  const handleWorkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkName(e.target.value);
  };
  const handleWorkLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkLink(e.target.value);
  };
  let showWorkButton = false;
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
    showWorkButton = true;
    text = "Ажиллаж дууссан";
  }
  if (state == "Review") {
    text = "Шалгаад Шилжүүллээ";
  }
  if (state == "Payment") {
    text = "Ажил дууссан";
  }
  const handleAddWork = async () => {
    let works = col.collab_works;

    works.push({ name: workName, work_link: workLink });

    try {
      const response = await fetch("/api/collaborations/", {
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
          collab_works: works,
          collab_salary: col.collab_salary,
        }),
      });

      if (response.status === 200 && response.ok === true) {
        toast.success("Ажил амжилттай нэмэгдлээ");
      } else {
        const error = await response.json();
        if (error) {
          setError(error);
        }
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    } finally {
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
          collab_works: col.collab_works,
          collab_salary: col.collab_salary,
          payment_id: "",
        }),
      });
      await sendEmail(`${setText} үе шат рүү шилжлээ`, inf.email);
      await sendEmail(`${setText} үе шат рүү шилжлээ`, brand.email);

      if (response.status === 200 && response.ok === true) {
        setLoading(false);
        toast.success("Дараагийн үе шат руу шилжлээ");
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
    <div>
      {showWorkButton ? (
        <div className="grid gap-4 mb-8">
          <span>Хийсэн ажлаа нэмэх</span>
          <div>
            <label
              htmlFor="workName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ажлын тайлбар:
            </label>
            <input
              type="text"
              id="workName"
              name="Ажлын тайлбар"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={handleWorkNameChange}
              value={workName}
            />
          </div>
          <div>
            <label
              htmlFor="workLink"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ажлын линк
            </label>
            <input
              type="text"
              id="workLink"
              name="Ажлын линк"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={handleWorkLinkChange}
              value={workLink}
            />
          </div>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAddWork}
          >
            Нэмэх
          </button>
        </div>
      ) : (
        <></>
      )}
      <button
        className="inline-flex w-full items-center justify-center rounded-md bg-green-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
        onClick={handleClick}
      >
        {loading ? (
          <span className="flex items-center">
            <Spin />
            Илгээж байна...
          </span>
        ) : (
          `${text}`
        )}
      </button>
    </div>
  );
};

export default CollabChange;
