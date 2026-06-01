// "use client";

// import {
//   Dispatch,
//   SetStateAction,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import "../globals.css";

// interface FullTabViewProps {
//   html: string | undefined;
//   setHtml: Dispatch<SetStateAction<string | undefined>>;
//   css: string | undefined;
//   setCss: Dispatch<SetStateAction<string | undefined>>;
//   javascript: string | undefined;
//   setJavascript: Dispatch<SetStateAction<string | undefined>>;
//   consoleErrors: any;
//   setConsoleErrors: Dispatch<SetStateAction<any>>;
// }

// const FullTabView: React.FC<FullTabViewProps> = ({
//   html,
//   setHtml,
//   css,
//   setCss,
//   javascript,
//   setJavascript,
//   consoleErrors,
//   setConsoleErrors,
// }) => {
//   return (
//     <>
//       <style>
//         {/* {css} */}
//         {localStorage.getItem("css")}
//       </style>

//       <div
//         className="editor-output"
//         dangerouslySetInnerHTML={{ __html: localStorage.getItem("html") || "" }}
//       />

//       <script>
//         {/* {`${javascript}`} */}
//         {`${localStorage.getItem("javascript")}`}
//       </script>
//     </>
//   );
// };

// export default FullTabView;




"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../globals.css";

interface FullTabViewProps {
  html: string | undefined;
  setHtml: Dispatch<SetStateAction<string | undefined>>;
  css: string | undefined;
  setCss: Dispatch<SetStateAction<string | undefined>>;
  javascript: string | undefined;
  setJavascript: Dispatch<SetStateAction<string | undefined>>;
  consoleErrors: any;
  setConsoleErrors: Dispatch<SetStateAction<any>>;
}

const FullTabView: React.FC<FullTabViewProps> = ({
  html,
  setHtml,
  css,
  setCss,
  javascript,
  setJavascript,
  consoleErrors,
  setConsoleErrors,
}) => {
  // 1. Create states for the browser-only data
  const [mounted, setMounted] = useState(false);
  const [storedHtml, setStoredHtml] = useState("");
  const [storedCss, setStoredCss] = useState("");
  const [storedJs, setStoredJs] = useState("");

  // 2. Run this only once the component mounts in the browser
  useEffect(() => {
    setMounted(true);
    setStoredHtml(localStorage.getItem("html") || "");
    setStoredCss(localStorage.getItem("css") || "");
    setStoredJs(localStorage.getItem("javascript") || "");
  }, []);

  // 3. Prevent rendering until the component is mounted on the client
  if (!mounted) return null;

  return (
    <>
      <style>{storedCss}</style>
      
      <div 
        className="editor-output" 
        dangerouslySetInnerHTML={{ __html: storedHtml }} 
      />
      
      {/* Note: Embedding raw script tags in React can sometimes cause execution issues. 
          If the JS doesn't execute on load, you may need to evaluate it using a 
          ref or an iframe. */}
      <script dangerouslySetInnerHTML={{ __html: storedJs }} />
    </>
  );
};

export default FullTabView;

