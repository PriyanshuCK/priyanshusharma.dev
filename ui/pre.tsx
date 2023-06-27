"use client";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

require("prismjs/components/prism-c");
require("prismjs/components/prism-cpp");

const Pre = ({ children, caption }: any) => {
  useEffect(() => {
    Prism.highlightAll();
    const lineNums = document.querySelectorAll(".line-numbers-rows");
    lineNums.forEach((line) => {
      line.classList.add("!-top-1", "!border-r-0");
    });
  }, []);
  return (
    <div className="children:my-0 children:!shadow-none children:bg-transparent line-numbers">
      <pre className="language-cpp" style={{ marginTop: 0, marginBottom: 0 }}>
        <code className="language-cpp">{children}</code>
      </pre>
    </div>
  );
};

export default Pre;
