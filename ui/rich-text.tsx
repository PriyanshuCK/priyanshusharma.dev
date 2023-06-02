import Link from "next/link";

const Richtext = (props: any) => {
  const text = props.text;
  const id = props.id;
  if (!text) {
    return null;
  }
  return text.map((value: any) => {
    const {
      annotations: { bold, italic, strikethrough, underline, code },
      text,
    } = value;
    return (
      <span
        key={id + Math.floor(Math.random() * 100) + text.content}
        className={[
          bold ? "font-bold" : "",
          code
            ? "rounded-md bg-gray-100 px-1 py-1 font-mono text-primary-500 dark:bg-gray-700"
            : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline decoration-primary-500" : "",
        ].join(" ")}
      >
        {text.link ? (
          <Link
            href={text.link.url}
            className="text-primary-500 hover:text-primary-600"
          >
            {text.content}
          </Link>
        ) : (
          text.content
        )}
      </span>
    );
  });
};

export default Richtext;
