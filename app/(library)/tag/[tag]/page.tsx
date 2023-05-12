import { retrieveDatabase } from "@/data/api";
import ListLayout from "@/ui/list-layout";

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
