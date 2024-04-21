import Link from "next/link";
import ToggleTheme from "../ToggleTheme";
import NavCart from "./NavCart";
import NavAuth from "./NavAuth";
import Image from "next/image";

export default function Navbar() {
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
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Collaborations
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact
                  </a>
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
