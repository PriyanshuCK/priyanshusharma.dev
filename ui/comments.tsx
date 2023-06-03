import siteMetadata from "@/data/metadata";
import dynamic from "next/dynamic";

const GiscusComponent = dynamic(
  () => {
    return import("@/ui/giscus-component");
  },
  { ssr: false }
);

const Comments = () => {
  const comment = siteMetadata?.comment;
  if (!comment || Object.keys(comment).length === 0) return <></>;
  return (
    <div id="comment">
      {siteMetadata.comment && siteMetadata.comment.provider === "giscus" && (
        <GiscusComponent />
      )}
    </div>
  );
};

export default Comments;
