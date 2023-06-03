import { Metadata } from "next";
export default async function Offline() {
  return (
    <>
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
            Oops...
          </h1>
        </div>
        <div className="max-w-md">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            Connect to the internet
          </p>
          <p className="mb-8">
            You&apos;re offline. Kindly check your connection.
          </p>
        </div>
      </div>
    </>
  );
}
export const metadata: Metadata = {
  title: "You're offline!",
  description: "You're offline. Please check your connection.",
};
