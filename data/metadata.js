const siteMetadata = {
  title: "Priyanshu Sharma",
  author: "Priyanshu Sharma",
  description:
    "Namaste! I'm Priyanshu Sharma. This website is a platform to share my learnings, happenings, beliefs, and thoughts with the world.",
  language: "en-us",
  theme: "system",
  siteUrl: "https://priyanshusharma.dev/",
  siteRepo: "https://github.com/PriyanshuCK/priyanshusharma.dev",
  siteLogo: "/static/images/logo.png",
  image: "/static/images/avatar.png",
  socialBanner: "/static/images/twitter-card.png",
  email: "priyanshu@priyanshusharma.dev",
  github: "https://github.com/PriyanshuCK",
  twitter: "https://twitter.com/PriyanshuCK",
  linkedin: "https://www.linkedin.com/in/PriyanshuCK",
  locale: "en-IN",
  analytics: {
    googleAnalyticsId: "G-ZX0NW47J11",
  },
  comment: {
    provider: "giscus",
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "pathname",
      reactions: "1",
      metadata: "0",
      theme: "light",
      inputPosition: "top",
      lang: "en",
      darkTheme: "transparent_dark",
      themeURL: "",
    },
  },
  newsletter: {
    provider: "convertkit",
  },
};

module.exports = siteMetadata;
