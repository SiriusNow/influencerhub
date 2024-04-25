import Link from "next/link";
import ToggleTheme from "../ToggleTheme";
import NavCart from "./NavCart";
import NavAuth from "./NavAuth";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextauthOptions } from "@/app/api/auth/[...nextauth]/route";
const url = process.env.API_URL as string;

const getUser = async (id: any): Promise<any> => {
  const response = await fetch(`${url}/api/brands/${id}`, {
    cache: "no-cache",
  });
  // const res = await response.json();
  return await response.json();
};

export default async function Navbar() {
  const session = await getServerSession(nextauthOptions);
  let user = null;
  if (session) {
    user = await getUser(session.user?.id);
  }
  return (
    <header className="bg-gray-50 dark:bg-gray-800 py-4 sticky top-0 left-0 shadow-sm z-50 mb-8 ">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-x-4">
          <div className="">
            <Link href={"/"} className="flex items-center space-x-2">
              <Image
                src="/img/ivengo.svg"
                width={150}
                height={10}
                alt="logo"
                className="w-10 md:w-8 inline"
              />
              <div className="pt-3">
                <span className="justify-end text-3xl font-bold ">
                  nfluencerHUB
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-2 md:space-x-8">
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
                <li>
                  <a
                    href="/"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                {session ? (
                  <li>
                    <Link
                      href="/collaborations"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Collaborations
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
                {user ? (
                  <li>
                    <Link
                      href="/influencers"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Influencers
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
                <li>
                  <Link
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* <NavCart /> */}

            <NavAuth />
            <div className="mt-2">
              <ToggleTheme />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
