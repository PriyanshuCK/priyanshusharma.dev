import { Fragment } from "react";
import Link from "next/link";
import Renderblock from "@/ui/render-block";
import Richtext from "@/ui/rich-text";
export default function Heading2({
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
            <summary className=" mb-1 text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
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
        <h2
          className="border-b border-solid border-gray-200 mt-6 mb-4 pb-1"
          id={id}
        >
          <Link href={`#${id}`} className="!font-semibold text-inherit">
            <Richtext text={rich_text} id={id} color={color} />
          </Link>
        </h2>
      )}
    </>
  );
}
