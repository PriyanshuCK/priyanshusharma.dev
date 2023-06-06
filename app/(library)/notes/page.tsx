import { Client } from "@notionhq/client";
import ListLayout from "@/ui/list-layout";
import { Metadata } from "next";
import siteMetadata from "@/data/metadata";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_LIBRARY_ID;

export const revalidate = 10;

async function getPosts() {
  const response = await notion.databases.query({
    database_id: databaseId as string,
  });
  return response;
}

export default async function notes() {
  const data = await getPosts();
  const notes = data.results.filter((post: any) => {
    return post.properties.type.select.name === "Notes";
  });
  return (
    <>
      <ListLayout
        posts={notes}
        title="Book Notes"
        typeDescription="Summary and takeaways of the non-fiction books I've read"
      />
    </>
  );
}
export const metadata: Metadata = {
  title: "Book Notes",
  description: "Summary and takeaways of the non-fiction books I've read",
  openGraph: {
    title: "Book Notes",
    description: "Summary and takeaways of the non-fiction books I've read",
    url: siteMetadata.siteUrl + "notes",
    siteName: siteMetadata.title,

    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Notes",
    description: "Summary and takeaways of the non-fiction books I've read",
    site: siteMetadata.twitter,
  },
};
