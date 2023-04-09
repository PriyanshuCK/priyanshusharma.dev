import { Client } from "@notionhq/client";
import Listposts from "@/components/list-posts";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_LIBRARY_ID;

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
    return post.properties.type.select.name != "Essentials";
  });
  const indexPosts = posts.slice(0, 3);
  const types = [indexPosts, articles, blog, notes];
  return (
    <>
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
