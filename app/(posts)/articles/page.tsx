import { Client } from "@notionhq/client";
import ListLayout from "@/ui/list-layout";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_LIBRARY_ID;

async function getPosts() {
  const response = await notion.databases.query({
    database_id: databaseId as string,
  });
  return response;
}

export default async function Articles() {
  const data = await getPosts();
  const articles = data.results.filter((post: any) => {
    return post.properties.type.select.name === "Articles";
  });
  return (
    <>
      <ListLayout
        posts={articles}
        title="Articles"
        typeDescription="Articles delineating some facts, ideas, or thoughts"
      />
    </>
  );
}
