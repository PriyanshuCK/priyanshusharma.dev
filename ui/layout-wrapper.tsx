"use client";
import { ThemeProvider } from "next-themes";
import { useState, useCallback } from "react";
import Header from "@/ui/header";
import Footer from "@/ui/footer";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [color, setColor] = useState("slate");
  const getColor = useCallback((newColor: string) => {
    setColor(newColor);
  }, []);
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className={`${color && `theme-${color}`}`}>
        <Header getColor={getColor} />
        <div className="mt-20 sm:mt-[100px] mx-auto max-w-full px-4 sm:px-6">
          {children}
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
export default LayoutWrapper;
