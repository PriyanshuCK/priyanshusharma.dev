import siteMetadata from "@/data/metadata";

const formatDate = (date: any) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as any;
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options);

  return now;
};

export default formatDate;
