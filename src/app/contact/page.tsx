"use client";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Contact() {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Influencer HUB",
          email: "munhodg@gmail.com",
          message: "test messages shuuu",
        }),
      });

      if (response.status === 201 && response.ok === true) {
        toast.success("Хүсэлт амжилттай илгээгдлээ");
      } else {
        const error = await response.json();
        if (error) {
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative flex place-items-center p-5 bg-white text-black">
        <Link href="/">Home</Link>
      </div>

      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleClick}
      >
        send
      </button>
    </main>
  );
}
