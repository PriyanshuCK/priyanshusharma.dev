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

export default async function Journal() {
  const data = await getPosts();
  const journal = data.results.filter((post: any) => {
    return post.properties.type.select.name === "Journal";
  });
  return (
    <>
      <ListLayout
        posts={journal}
        title="Journal"
        typeDescription="An informal catalog of what I learn, do & observe everyday"
      />
    </>
  );
}
