import { Fragment } from "react";
import Renderblock from "@/ui/render-block";
import Richtext from "@/ui/rich-text";
export default function Toggle({ rich_text, color, childrenBlock, id }) {
  return (
    <div className="not-prose">
      <details className="rounded-2xl p-6 transition-all duration-300 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-gray-800 dark:open:shadow-gray-800/30 dark:open:ring-white/10 open:sm:mx-auto open:sm:w-4/5">
        <summary className="font-semibold">
          <Richtext text={rich_text} color={color} id={id} />
        </summary>
        {childrenBlock?.map((block) => (
          <Fragment key={block.id}>
            <Renderblock block={block} />
          </Fragment>
        ))}
      </details>
    </div>
  );
}
