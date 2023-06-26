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
export const metadata: Metadata = {
  title: "Journal",
  description: "An informal catalog of what I learn, do & observe everyday",
  openGraph: {
    title: "Journal",
    description: "An informal catalog of what I learn, do & observe everyday",
    url: siteMetadata.siteUrl + "journal",
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
    title: "Journal",
    description: "An informal catalog of what I learn, do & observe everyday",
    site: siteMetadata.twitter,
    images: [{ url: siteMetadata.socialBanner }],
  },
};
