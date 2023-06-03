import LayoutWrapper from "@/ui/layout-wrapper";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_LIBRARY_ID;

export const revalidate = 10;

async function getPosts() {
  const response = await notion.databases.query({
    database_id: databaseId as string,
  });
  return response;
}

export default async function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getPosts();
  const posts = data.results.filter((post: any) => {
    return post.properties.type.select.name != "Essentials";
  });
  return (
    <>
      <LayoutWrapper posts={posts}>{children}</LayoutWrapper>
    </>
  );
}
