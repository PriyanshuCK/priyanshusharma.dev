"use client";
import { ThemeProvider } from "next-themes";
import { useState, useCallback } from "react";
import Header from "@/ui/header";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [color, setColor] = useState("slate");
  const getColor = useCallback((newColor: string) => {
    setColor(newColor);
  }, []);
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className={`${color && `theme-${color}`}`}>
        <Header getColor={getColor} />
        {children}
      </div>
    </ThemeProvider>
  );
}
