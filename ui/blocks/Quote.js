import Richtext from "@/ui/rich-text";
export default function Quote({ rich_text, color, id }) {
  return (
    <blockquote>
      <Richtext text={rich_text} id={id} color={color} />
    </blockquote>
  );
}
