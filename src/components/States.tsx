"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cartSlice";
import { TProduct } from "@/types";

type ButtonProps = {
  pd: TProduct;
};

const States = ({ state }: any) => {
  //   let state = "Working";
  let normal = "text-gray-900 bg-gray-100 border border-gray-300";
  let selected = "text-blue-700 bg-blue-100 border border-blue-300";
  let done = "text-green-700 border border-green-300  bg-green-50";

  let data = [
    {
      name: "Pending",
      style: "",
      svg: 0,
    },
    {
      name: "Collaboration",
      style: "",
      svg: 0,
    },
    {
      name: "Working",
      style: "",
      svg: 0,
    },
    {
      name: "Review",
      style: "",
      svg: 0,
    },
    {
      name: "Payment",
      style: "",
      svg: 0,
    },
  ];
  for (let i = 0; i < data.length; i++) {
    if (state == data[i].name) {
      data[i].style = selected;
      data[i].svg = 1;
      for (let j = i + 1; j < data.length; j++) {
        data[j].style = normal;
        data[j].svg = 2;
      }
      break;
    } else {
      data[i].style = done;
    }
  }

  // const addProduct = (product: TProduct) => {
  // 	dispatch(addToCart(product));
  // };
  return (
    <ol className="space-y-4 w-72">
      {data.map((item: any) => (
        <li>
          <div
            className={`w-full p-4 ${item.style} rounded-lg dark:bg-gray-800 dark:border-green-800 dark:text-green-400`}
            role="alert"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium"> {item.name}</h3>
              {item.svg == 0 ? (
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              ) : (
                <></>
              )}
              {item.svg == 1 ? (
                <svg
                  className="rtl:rotate-180 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              ) : (
                <></>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default States;
