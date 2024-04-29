"use client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
Spin;
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spin from "@/components/AnimateButton";

export default function RegisterForm({ tags }: any) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    tag_id: "",
    password: "",
    password_confirmation: "",
  });
  const optionChnage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTagId = e.target.value;
    setAuthState({ ...authState, tag_id: selectedTagId });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthState({ ...authState, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authState),
    });

    if (response.status === 201 && response.ok === true) {
      setLoading(false);
      toast.success("Борлуулагч амжилттай бүртгэгдлээ");
      router.replace("/login");
    } else {
      const error = await response.json();
      if (error) {
        setLoading(false);
        setError(error);
      }
    }
  };
  return (
    <form className="mt-8" onSubmit={handleRegister}>
      <div className="space-y-5">
        <div>
          <label htmlFor="username" className="text-base font-medium ">
            Таны нэр
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Та нэрээ оруулна уу"
              id="name"
              name="name"
              onChange={handleChange}
              value={authState.name}
            ></input>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-base font-medium ">
            И-мэйл хаяг
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={handleChange}
              value={authState.email}
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="tag_id" className="text-base font-medium">
            Таны хаяг аль бүлэгт хамаарах вэ
          </label>
          <div className="mt-2">
            <select
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              id="tag_id"
              name="tag_id"
              onChange={optionChnage}
              value={authState.tag_id}
            >
              <option className="text-base font-medium" value="">
                бүлэг сонгох
              </option>
              {tags.map((tag: any) => (
                <option
                  className="text-base font-medium"
                  key={tag._id}
                  value={tag._id}
                >
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-base font-medium ">
              Нууц үг
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={handleChange}
              value={authState.password}
            ></input>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="confirmPass" className="text-base font-medium ">
              Нууц үг дахин оруулах
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Confirm password"
              id="password_confirmation"
              name="password_confirmation"
              onChange={handleChange}
              value={authState.password_confirmation}
            ></input>
            {error ? (
              <p className="mt-2 text-red-600 text-center font-semibold">
                {error}
              </p>
            ) : null}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
          >
            {loading ? (
              <span className="flex items-center">
                <Spin />
                Бүртгэж байна...
              </span>
            ) : (
              "Шинэ Борлуулагч болох"
            )}
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
