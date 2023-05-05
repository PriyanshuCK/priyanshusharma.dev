import {
  retrieveDatabase,
  retrievePage,
  retrieveBlocks,
  retrieveId,
} from "@/data/api";
import { notFound } from "next/navigation";
import siteMetadata from "@/data/metadata";
import { Fragment } from "react";
import Renderblock from "@/ui/render-block";
import PageTitle from "@/ui/page-title";
import Richtext from "@/ui/rich-text";

export const revalidate = 10;

const postDateTemplate = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as any;
const postTimeTemplate = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
} as any;

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
  const page = (await getPage(id)) as any;
  if (!page) {
    notFound();
  }
  const blocks = (await getBlocks(id)) as any;
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
                      siteMetadata.locale,
                      postTimeTemplate
                    )}
                  </time>
                </span>
                <span className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  Last edited:&nbsp;
                  <time dateTime={page.last_edited_time}>
                    {new Date(page.last_edited_time).toLocaleString(
                      siteMetadata.locale,
                      postTimeTemplate
                    )}
                  </time>
                </span>
                {/* <Comments /> */}
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
