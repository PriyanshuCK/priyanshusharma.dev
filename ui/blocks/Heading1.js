import { Fragment } from "react";
import Renderblock from "@/ui/render-block";
import Richtext from "@/ui/rich-text";
import Link from "next/link";
export default function Heading1({
  rich_text,
  color,
  toggle,
  childrenBlock,
  id,
}) {
  return (
    <>
      {toggle ? (
        <div className="not-prose my-6">
          <details className="rounded-2xl p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-gray-800 dark:open:shadow-gray-800/30 dark:open:ring-white/10">
            <summary className="mb-3 text-4xl font-bold leading-12 tracking-tight text-gray-900 dark:text-gray-100">
              <Richtext text={rich_text} color={color} id={id} />
            </summary>
            {childrenBlock?.map((block) => (
              <Fragment key={block.id}>
                <Renderblock block={block} />
              </Fragment>
            ))}
          </details>
        </div>
      ) : (
        <h1
          className="border-b border-solid border-gray-200 mt-6 mb-4 pb-2"
          id={id}
        >
          <Link href={`#${id}`} className="!font-semibold text-inherit">
            <Richtext text={rich_text} id={id} color={color} />
          </Link>
        </h1>
      )}
    </>
  );
}
