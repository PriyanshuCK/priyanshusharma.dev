import { Metadata } from "next";
import siteMetadata from "@/data/metadata";
import NewsletterForm, { BlogNewsletterForm } from "@/ui/newsletter-form";
export default async function newsletter() {
  return (
    <>
      <div className="lg:mx-auto lg:w-2/3 xl:divide-y-2 xl:divide-primary-200 xl:dark:divide-primary-400">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                Thursday Thoughts
              </h1>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center py-10 max-w-xl mx-auto">
          <p className="text-center">
            Subscribe to my newsletter where I share my learnings and valuable
            insights from the content I consume.
          </p>
          <div className="my-6">
            <BlogNewsletterForm title="" />
          </div>
          <p className="text-center">
            Each Thursday, you will receive an email from me featuring my
            learnings of the week and progress of the undertaken tasks.
          </p>
        </div>
      </div>
    </>
  );
}
export const metadata: Metadata = {
  title: "Thursday Thoughts",
  description:
    "Subscribe to my newsletter where I share my learnings and valuable insights from the content I consume.",
  openGraph: {
    title: "Thursday Thoughts",
    description:
      "Subscribe to my newsletter where I share my learnings and valuable insights from the content I consume.",
    url: siteMetadata.siteUrl + "newsletter",
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 600,
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thursday Thoughts",
    description:
      "Subscribe to my newsletter where I share my learnings and valuable insights from the content I consume.",
    site: siteMetadata.twitter,
    images: [{ url: siteMetadata.socialBanner }],
  },
};
