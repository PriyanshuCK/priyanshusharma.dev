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

export default async function Blog() {
  const data = await getPosts();
  const blog = data.results.filter((post: any) => {
    return post.properties.type.select.name === "Blog";
  });
  return (
    <>
      <ListLayout
        posts={blog}
        title="Blog"
        typeDescription="A detailed account of my happenings, activities, beliefs, and thoughts"
      />
    </>
  );
}
export const metadata: Metadata = {
  title: "Blog",
  description:
    "A detailed account of my happenings, activities, beliefs, and thoughts",
  openGraph: {
    title: "Blog",
    description:
      "A detailed account of my happenings, activities, beliefs, and thoughts",
    url: siteMetadata.siteUrl + "blog",
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
    title: "Blog",
    description:
      "A detailed account of my happenings, activities, beliefs, and thoughts",
    site: siteMetadata.twitter,
    images: [{ url: siteMetadata.socialBanner }],
  },
};
