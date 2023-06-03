"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import siteMetadata from "@/data/metadata";
import { usePathname, useSearchParams } from "next/navigation";

const Giscus = () => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true);
  const { theme, resolvedTheme } = useTheme();
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ""
      ? theme === "dark" || resolvedTheme === "dark"
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL;

  const COMMENTS_ID = "comments-container";

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false);

    const {
      repo,
      repositoryId,
      category,
      categoryId,
      mapping,
      reactions,
      metadata,
      inputPosition,
      lang,
    } = siteMetadata?.comment?.giscusConfig;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo as string);
    script.setAttribute("data-repo-id", repositoryId as string);
    script.setAttribute("data-category", category as string);
    script.setAttribute("data-category-id", categoryId as string);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-reactions-enabled", reactions);
    script.setAttribute("data-emit-metadata", metadata);
    script.setAttribute("data-input-position", inputPosition);
    script.setAttribute("data-lang", lang);
    script.setAttribute("data-theme", commentsTheme);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, [commentsTheme]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const route = pathname + searchParams.toString();

  useEffect(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    LoadComments();
  }, [LoadComments, route]);

  return (
    <div className="py-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && (
        <button
          className="inline-flex justify-center rounded-full border border-transparent bg-primary-100 px-4 py-2 text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={LoadComments}
        >
          Load Comments
        </button>
      )}
      <div className="giscus min-h-0" id={COMMENTS_ID} />
    </div>
  );
};

export default Giscus;
