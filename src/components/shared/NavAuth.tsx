"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
const NavAuth = () => {
  const { data: session } = useSession();

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div
      className="relative h-10 w-10 border rounded-full cursor-pointer"
      onClick={toggleMenu}
      title="Profile"
    >
      <img
        src="/img/head.png"
        alt="head"
        className="absolute	inset-0 rounded-full "
      />
      {menu ? (
        <div className="absolute top-14 -left-56 bg-gray-100 text-black p-2  w-56 cursor-default rounded ">
          {session ? (
            <>
              <button className="mt-4 hover:bg-blue-500 w-full text-left p-2 rounded hover:text-white">
                <Link href="/myprofile">
                  {session?.user?.name?.toUpperCase()}-Нүүр
                </Link>
              </button>

              <button
                className="mt-4 hover:bg-blue-500 w-full text-left p-2 rounded hover:text-white"
                onClick={() => signOut()}
              >
                Гарах
              </button>
            </>
          ) : (
            <div className="flex flex-col ">
              <Link
                href="/login"
                className="w-full hover:bg-blue-500 hover:text-white pl-4 py-2 rounded "
              >
                Нэвтрэх
              </Link>
              <Link
                href="/register"
                className="w-full hover:bg-blue-500 hover:text-white pl-4 py-2 rounded "
              >
                Бүртгүүлэх
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default NavAuth;
