import LoginForm from "./LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login | InfluencerHUB",
  description: "Login page. Login to your account",
};

export default function LoginPage() {
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-16 sm:px-6 sm:py-8 lg:px-8 lg:py-16">
        <div className="w-full sm:max-w-lg md:max-w-xl">
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-200">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-black dark:text-emerald-500 transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <div className="flex justify-center mt-4">
            <Link href={"/registerBrand"}>
              <button className="mx-2 px-4 py-2 rounded-full bg-black text-white">
                Login as Brand
              </button>
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
