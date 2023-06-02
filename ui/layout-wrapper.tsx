"use client";
import { ThemeProvider } from "next-themes";
import { useState, useCallback } from "react";
import Header from "@/ui/header";
import Footer from "@/ui/footer";

type IntrinsicAttributesAndPosts = {
  children: React.ReactNode;
  posts: any;
};

const LayoutWrapper: React.FC<IntrinsicAttributesAndPosts> = (props) => {
  const { posts, children } = props;
  const [color, setColor] = useState("slate");
  const getColor = useCallback((newColor: string) => {
    setColor(newColor);
  }, []);
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <body
        className={`selection:bg-primary-200 selection:text-primary-900 antialiased text-slate-700 dark:text-slate-400 bg-white dark:bg-slate-900 ${
          color && `theme-${color}`
        }`}
      >
        <Header getColor={getColor} posts={posts} />
        <div className="mt-20 sm:mt-[100px] mx-auto max-w-full px-4 sm:px-6">
          {children}
        </div>
        <Footer />
      </body>
    </ThemeProvider>
  );
};
export default LayoutWrapper;
