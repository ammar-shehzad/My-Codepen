"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "../globals.css"


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


  return (
    <>
      <style>





        {/* {css} */}
        {localStorage.getItem("css")}
      </style>

      <div
        className="editor-output"
        dangerouslySetInnerHTML={{ __html: localStorage.getItem("html") || "" }}
      />

      <script>
        {/* {`${javascript}`} */}
        {`${localStorage.getItem("javascript")}`}
      </script>
    </>
  );
};

export default FullTabView;
