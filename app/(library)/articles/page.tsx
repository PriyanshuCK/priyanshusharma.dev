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
export const metadata: Metadata = {
  title: "Articles",
  description: "Articles delineating some facts, ideas, or thoughts",
  openGraph: {
    title: "Articles",
    description: "Articles delineating some facts, ideas, or thoughts",
    url: siteMetadata.siteUrl + "articles",
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
    title: "Articles",
    description: "Articles delineating some facts, ideas, or thoughts",
    site: siteMetadata.twitter,
    images: [{ url: siteMetadata.socialBanner }],
  },
};
