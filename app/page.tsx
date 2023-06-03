import { Client } from "@notionhq/client";
import Listposts from "@/ui/list-posts";
import Link from "next/link";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_LIBRARY_ID;

export const revalidate = 10;

async function getPosts() {
  const response = await notion.databases.query({
    database_id: databaseId as string,
  });
  return response;
}

export default async function Home() {
  const data = await getPosts();
  const articles = data.results.filter((post: any) => {
    return post.properties.type.select.name === "Articles";
  });
  const blog = data.results.filter((post: any) => {
    return post.properties.type.select.name === "Blog";
  });
  const notes = data.results.filter((post: any) => {
    return post.properties.type.select.name === "Notes";
  });
  const posts = data.results.filter((post: any) => {
    return (
      post.properties.type.select.name != "Essentials" &&
      post.properties.type.select.name != "Journal"
    );
  });
  const indexPosts = posts.slice(0, 3);
  const types = [indexPosts, articles, blog, notes];
  return (
    <>
      <section className="my-6 sm:my-14">
        <h1 className="mt-2 mb-4 text-center text-4xl font-bold capitalize leading-8 tracking-tight text-gray-900 underline decoration-primary-500 decoration-double decoration-1 underline-offset-[6px] dark:text-gray-100 dark:decoration-primary-400 sm:mt-8 sm:text-5xl">
          Now
        </h1>
        <p className="text-center lg:mx-auto lg:w-1/3">
          I&apos;m committed to learn Data Structures & Algorithms in the next
          100 days as part of the{" "}
          <Link href="https://www.100daysofcode.com/">#100DaysOfCode</Link>{" "}
          challenge and sharing my journey daily on this site.
        </p>
        <div className="flex flex-row justify-center gap-8 my-4">
          <Link
            href="https://github.com/PriyanshuCK/100DaysOfCode"
            className="inline-flex justify-center rounded-full border border-transparent bg-primary-100 px-4 py-2 text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Progress »
          </Link>
          <Link
            href="/tag/100doc"
            className="inline-flex justify-center rounded-full border border-transparent bg-primary-100 px-4 py-2 text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Journey »
          </Link>
        </div>
        <div className="flex flex-row justify-center">
          <Link
            href="/now"
            className="text-primary-800 hover:text-primary-900 dark:hover:text-gray-300 hover:font-medium focus:outline-none dark:text-gray-400"
          >
            Know more →
          </Link>
        </div>
      </section>
      <section className="my-4 sm:my-10">
        {types.map((type) => {
          let typeStr = "";
          {
            type === indexPosts
              ? (typeStr = "Recent Posts")
              : type === articles
              ? (typeStr = "Articles")
              : type === blog
              ? (typeStr = "Blog")
              : (typeStr = "Notes");
          }
          return (
            <div key={typeStr}>
              <h1 className="mt-2 text-center text-4xl font-bold capitalize leading-8 tracking-tight text-gray-900 underline decoration-primary-500 decoration-double decoration-1 underline-offset-[6px] dark:text-gray-100 dark:decoration-primary-400 sm:mt-8 sm:text-5xl">
                {typeStr}
              </h1>
              <Listposts posts={type} />
            </div>
          );
        })}
      </section>
    </>
  );
}
