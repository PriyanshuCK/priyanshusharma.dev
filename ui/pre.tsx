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
    <div className="children:my-0 children:!shadow-none children:bg-transparent">
      <pre className="language-cpp" style={{ marginTop: 0, marginBottom: 0 }}>
        <code className="language-cpp">{children}</code>
      </pre>
    </div>
  );
};

export default Pre;
