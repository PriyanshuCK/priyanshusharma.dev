/* eslint-disable */
import Paragraph from "@/ui/blocks/Paragraph";
import Heading1 from "@/ui/blocks/Heading1";
import Heading2 from "@/ui/blocks/Heading2";
import Heading3 from "@/ui/blocks/Heading3";
import Callout from "@/ui/blocks/Callout";
import Quote from "@/ui/blocks/Quote";
import ListItem from "@/ui/blocks/ListItem";
import Todo from "@/ui/blocks/Todo";
import Toggle from "@/ui/blocks/Toggle";
import Code from "@/ui/blocks/Code";
import ImageBlock from "@/ui/blocks/Image";
import Divider from "@/ui/blocks/Divider";

export default function Renderblock(props: any): JSX.Element {
  const { type, id } = props.block;
  const value = props.block[type];
  switch (type) {
    case "paragraph":
      return (
        <>
          <Paragraph rich_text={value.rich_text} color={value.color} id={id} />
        </>
      );
    case "heading_1":
      return (
        <>
          <Heading1
            rich_text={value.rich_text}
            color={value.color}
            id={id}
            childrenBlock={value.children}
            toggle={value.is_toggleable}
          />
        </>
      );
    case "heading_2":
      return (
        <>
          <Heading2
            rich_text={value.rich_text}
            color={value.color}
            id={id}
            childrenBlock={value.children}
            toggle={value.is_toggleable}
          />
        </>
      );
    case "heading_3":
      return (
        <>
          <Heading3
            rich_text={value.rich_text}
            color={value.color}
            id={id}
            childrenBlock={value.children}
            toggle={value.is_toggleable}
          />
        </>
      );
    case "callout":
      return (
        <>
          <Callout
            emoji={value.icon.emoji}
            rich_text={value.rich_text}
            color={value.color}
            id={id}
          />
        </>
      );
    case "quote":
      return <Quote rich_text={value.rich_text} color={value.color} id={id} />;
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <>
          <ListItem rich_text={value.rich_text} color={value.color} id={id} />
        </>
      );
    case "to_do":
      return (
        <>
          <Todo
            rich_text={value.rich_text}
            color={value.color}
            checked={value.checked}
            id={id}
          />
        </>
      );
    case "toggle":
      return (
        <>
          <Toggle
            rich_text={value.rich_text}
            color={value.color}
            childrenBlock={value.children}
            id={id}
          />
        </>
      );
    case "code":
      const captionCode = value.caption[0] ? value.caption[0].plain_text : "";
      return (
        <>
          <Code
            rich_text={value.rich_text}
            language={value.language}
            caption={captionCode}
          />
        </>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const ImageCaption = value.caption[0] ? value.caption[0].plain_text : "";
      return <ImageBlock src={src} caption={ImageCaption} />;
    case "eqation":
      return <div>{value.expression}</div>;
    case "divider":
      return <Divider />;
    default:
      return (
        <>
          `Unsupported block ($
          {type === "unsupported" ? "unsupported by Notion API" : type})`;
        </>
      );
  }
}
