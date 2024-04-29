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
          <h1>My profile</h1>
          {/* <div className="flex justify-center mt-4">
            <Link href={"/registerBrand"}>
              <button className="mx-2 px-4 py-2 rounded-full bg-black text-white">
                Login as Brand
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}
