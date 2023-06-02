"use client";
import { useEffect } from "react";
import Prism from "prismjs";

require("prismjs/components/prism-c");
require("prismjs/components/prism-cpp");

const Pre = ({ children, caption }: any) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div
      className={`rounded-b-lg ${
        caption ? "" : "rounded-t-lg"
      } relative bg-gray-800 text-sm font-normal text-gray-200`}
    >
      <div className="overflow-x-auto px-4 py-3">
        <pre className="language-cpp" tabIndex={0}>
          <code className="language-cpp">{children}</code>
        </pre>
      </div>
    </div>
  );
};

export default Pre;
