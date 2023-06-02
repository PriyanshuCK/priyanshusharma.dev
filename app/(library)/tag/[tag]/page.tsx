import { retrieveDatabase } from "@/data/api";
import ListLayout from "@/ui/list-layout";
import { Metadata } from "next";
import siteMetadata from "@/data/metadata";

export const revalidate = 10;

export async function generateStaticParams() {
  const database = await retrieveDatabase();
  const tags = [
    ...new Set(
      database
        .map((page: any) => {
          return page.properties.tags.multi_select.map((tag: any) => {
            return tag.name.toLowerCase();
          });
        })
        .flat()
    ),
  ];
  return tags.map((tag: any) => {
    {
      id: tag;
    }
  });
}

export default async function Tag({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const database = await retrieveDatabase();
  const posts = database.filter((page: any) =>
    page.properties.tags.multi_select
      .map((tag: any) => tag.name.toLowerCase())
      .includes(tag)
  );
  return (
    <>
      <ListLayout posts={posts} title={`Tag: ${tag}`} typeDescription="" />
    </>
  );
}

export async function generateMetadata(params: {
  params: { tag: string };
}): Promise<Metadata> {
  const tag = params.params.tag;
  const title: string = "Tag: " + tag;
  const description: string = "All the posts corresponding to the Tag: " + tag;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: siteMetadata.siteUrl + "tag/" + tag,
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
      title: title,
      description: description,
      site: siteMetadata.twitter,
      images: [{ url: siteMetadata.socialBanner }],
    },
  };
}
