import Link from "next/link";
import RegisterFormAsInfluencer from "./RegisterAsInf";
import LoginForm from "../login/LoginForm";
const url = process.env.API_URL!;

export const metadata = {
  title: "Register As Influencer | InfluencerHUB",
  description: "Registration page. Create your account",
};
const getServices = async (slug: string): Promise<any> => {
  const response = await fetch(`${url}/api/services`, {
    cache: "no-store",
  });

  return await response.json();
};
const getTags = async (slug: string): Promise<any> => {
  const response = await fetch(`${url}/api/tags`, {
    cache: "no-store",
  });

  return await response.json();
};
const RegisterPage = ({ services, tags }: any) => {
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="w-full sm:max-w-lg md:max-w-xl">
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-200 ">
            Already have an account?
            <Link
              href="/login"
              className="font-bold text-black dark:text-emerald-500 transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <div className="flex justify-center mt-4">
            <Link href={"/registerBrand"}>
              <button className="mx-2 px-4 py-2 rounded-full bg-black text-white">
                Sign up as Brand
              </button>
            </Link>
          </div>
          <RegisterFormAsInfluencer services={services} tags={tags} />
        </div>
      </div>
    </section>
  );
};

export default async function Login() {
  const services = await getServices("s");
  const tags = await getTags("s");
  return <RegisterPage services={services} tags={tags} />;
}
