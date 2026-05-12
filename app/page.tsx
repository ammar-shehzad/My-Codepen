"use client";

import { useEffect, useState } from "react";
import CodeEditor from "./Component/CodeEditor";
import MainPage from "./Component/MainPage";

export default function Home() {
  const [html, setHtml] = useState<string | undefined>("");
  const [css, setCss] = useState<string | undefined>("/* Enter Css Here */");

  const [javascript, setJavascript] = useState<string | undefined>(
    "// Edit Javascript Here",
  );
  const [consoleErrors, setConsoleErrors] = useState<any>();
  const [errCount, setErrCount] = useState<number>(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    try {
      new Function(javascript || "")();
      // alert("javascript working")
    } catch (err: any) {
      setConsoleErrors(err);
      console.error("Error executing JS", err);
      setIsError(true);
    }


    
  }, [javascript]);

  useEffect(() => {
    

    let orignalConsoleError = console.error;

    console.error = (...args) => {
      setErrCount((prev) => prev + 1);
      setConsoleErrors(args.map((arg) => arg.toString()).join(" "));

      orignalConsoleError.apply(console, args);
    };

    return () => {
      console.error = orignalConsoleError;
    };
  }, []);

  return (
    <MainPage
      html={html}
      css={css}
      javascript={javascript}
      setHtml={setHtml}
      setCss={setCss}
      setJavascript={setJavascript}
      consoleErrors={consoleErrors}
      setConsoleErrors={setConsoleErrors}
      errCount={errCount}
      setErrCount={setErrCount}
    />
  );
}
