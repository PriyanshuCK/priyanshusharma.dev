import { Client } from "@notionhq/client";
import Link from "next/link";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_LIBRARY_ID;

export const revalidate = 10;

async function getTags() {
  const database = await notion.databases.query({
    database_id: databaseId as string,
  });
  const tags = [
    ...new Set(
      database.results
        .map((page: any) => {
          return page.properties.tags.multi_select.map((tag: any) => {
            return tag.name.toLowerCase();
          });
        })
        .flat()
    ),
  ];
  return tags;
}

export default async function tags() {
  const tags = await getTags();
  return (
    <>
      <div className="flex flex-col items-center divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 md:space-y-5">
          <h1 className="px-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-xl flex-wrap">
          <ul>
            {tags.map((tag) => {
              return (
                <li className="mt-2 mb-2" key={tag}>
                  <Link
                    href={`/tag/${tag}`}
                    className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  >
                    {tag[0].toUpperCase() + tag.substring(1)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
