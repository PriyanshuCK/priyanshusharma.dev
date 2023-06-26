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
  const posts = data.results.filter((post: any) => {
    return post.properties.type.select.name != "Essentials";
  });
  return (
    <>
      <ListLayout posts={posts} title="All Posts" />
    </>
  );
}
export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all of the posts at one place",
  openGraph: {
    title: "All Posts",
    description: "Browse all of the posts at one place",
    url: siteMetadata.siteUrl + "posts",
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 600,
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Posts",
    description: "Browse all of the posts at one place",
    site: siteMetadata.twitter,
    images: [{ url: siteMetadata.socialBanner }],
  },
};
