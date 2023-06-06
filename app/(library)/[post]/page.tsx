import {
  retrieveDatabase,
  retrievePage,
  retrieveBlocks,
  retrieveId,
} from "@/data/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import siteMetadata from "@/data/metadata";
import { Fragment } from "react";
import Renderblock from "@/ui/render-block";
import PageTitle from "@/ui/page-title";
import Richtext from "@/ui/rich-text";
import Comments from "@/ui/comments";

export const revalidate = 10;

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Kolkata",
};
const postTimeTemplate: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  timeZone: "Asia/Kolkata",
};

export async function generateStaticParams() {
  const database = await retrieveDatabase();
  return database.map((page: any) => {
    {
      id: page.properties.slug.rich_text[0].plain_text;
    }
  });
}

export default async function Post({ params }: { params: { post: string } }) {
  const id = params.post;
  const newId = await retrieveId(id);
  let page: any;
  let blocks: any;
  if (newId == null) {
    notFound();
  } else {
    page = await getPage(id);
    blocks = await getBlocks(id);
  }
  return (
    <>
      <article>
        <div className="lg:mx-auto lg:w-2/3 xl:divide-y-2 xl:divide-primary-200 xl:dark:divide-primary-400">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={page.created_time}>
                      {new Date(page.created_time).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>
                  {<Richtext text={page.properties.name.title} key={page.id} />}
                </PageTitle>
              </div>
            </div>
          </header>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                {blocks.map((block: any) => (
                  <Fragment key={block.id}>
                    <>
                      <Renderblock block={block} />
                    </>
                  </Fragment>
                ))}
              </div>
              <div className="flex flex-col pt-8 text-center">
                <span className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  Published:&nbsp;
                  <time dateTime={page.created_time}>
                    {new Date(page.created_time).toLocaleString(
                      "en-IN",
                      postTimeTemplate
                    )}
                  </time>
                </span>
                <span className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  Last edited:&nbsp;
                  <time dateTime={page.last_edited_time}>
                    {new Date(page.last_edited_time).toLocaleString(
                      "en-IN",
                      postTimeTemplate
                    )}
                  </time>
                </span>
                {page.properties.type.select.name != "Essentials" && (
                  <>
                    <Comments />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

async function getPage(id: string) {
  const newId = await retrieveId(id);
  const page = await retrievePage(newId);
  return page;
}
async function getBlocks(id: string) {
  const newId = await retrieveId(id);
  const blocks = await retrieveBlocks(newId);
  const childBlocks = await Promise.all(
    blocks
      .filter((block: any) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await retrieveBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block: any) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });
  return blocksWithChildren;
}

export async function generateMetadata(params: {
  params: { post: string };
}): Promise<Metadata> {
  const id = params.params.post;
  const newId = await retrieveId(id);
  let title: string = "Page Not Found";
  let description: string = "Sorry! the page doesn't exist.";
  let created_time: string = "";
  let modified_time: string = "";
  if (newId != null) {
    const page = (await getPage(id)) as any;
    title =
      page.properties.name.title[0].text.content +
      " | " +
      page.properties.type.select.name;
    description = page.properties.description.rich_text[0].text.content;
    created_time = page.created_time;
    modified_time = page.last_edited_time;
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: siteMetadata.siteUrl + id,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      site: siteMetadata.twitter,
    },
    other: {
      published_time: created_time,
      modified_time: modified_time,
    },
  };
}
