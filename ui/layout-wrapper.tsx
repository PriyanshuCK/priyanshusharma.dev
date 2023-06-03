"use client";
import { ThemeProvider } from "next-themes";
import { useState, useCallback, useEffect } from "react";
import Header from "@/ui/header";
import ScrollButtons from "@/ui/scroll-buttons";
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
  const [themeClassName, setThemeClassName] = useState("");

  useEffect(() => {
    const themeDiv: any = document.getElementById("theme");
    const themeClassName = themeDiv.className;
    setThemeClassName(themeClassName);

    document.body.classList.add(themeClassName);

    return () => {
      document.body.classList.remove(themeClassName);
    };
  }, [color]);
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className={`${color && `theme-${color}`}`} id="theme">
        <Header getColor={getColor} posts={posts} />
        <div className="mt-20 sm:mt-[100px] mx-auto max-w-full px-4 sm:px-6">
          {children}
        </div>
        <ScrollButtons />
        <Footer />
      </div>
    </ThemeProvider>
  );
};
export default LayoutWrapper;
