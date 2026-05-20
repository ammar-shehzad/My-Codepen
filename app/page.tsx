"use client";

import { useEffect, useRef, useState } from "react";
import CodeEditor from "./Component/CodeEditor";
import MainPage from "./Component/MainPage";
import ProductPage from "./product/[id]/page";
import Link from "next/link";
import IndexPage from "./index/page";
import Page from "./dashboard/page";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Home() {
  const [html, setHtml] = useState<string | undefined>("");
  const [css, setCss] = useState<string | undefined>("/* Enter Css Here */");

  const [javascript, setJavascript] = useState<string | undefined>(
    "",
  );
  const [consoleErrors, setConsoleErrors] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [logs,setLogs]=useState<string[]>([])
  // const isHijacked=useRef(false)
  
  const [isOpen, setIsOpen] = useState(false);
  const [errCount, setErrCount] = useState<number>(0);
  const [fileName,setFileName]=useState<string>("Untitled")
  const [role,setRole]=useState<string>("private")
  
  let orignalLogRef=useRef(console.log)


  let errCountRef=useRef(0)
  
//   useEffect(() => {
// setLogs([])
// setConsoleErrors([])
// // setErrCount([0])
//     try {
//       new Function(javascript || "")();
//       // alert("javascript working")
//     } catch (err: any) {
//           //  errCountRef.current +=1
//           setErrCount((prev)=>prev+1); 
//       setConsoleErrors(err.message || "Unknown Error");
//       // console.error("Error executing JS", err);
//       setIsError(true);
//     }


    
//   }, [javascript]);






  // useEffect(() => {
    

  //   let orignalConsoleError = console.error;

  //   console.error = (...args) => {
  //     // setErrCount((prev) => prev + 1);
 

  //     setConsoleErrors(args.map((arg) => arg.toString()));

  //     orignalConsoleError.apply(console, args);
  //   };

  //   return () => {
  //     console.error = orignalConsoleError;
  //   };
  // },[]);






//   useEffect(()=>{


// console.log=(...args)=>{

// const consoleLogMessage=args.map(a => String(a)).join(" ")

//       setLogs((prev) => [...prev, consoleLogMessage]);
//       orignalLogRef.current.apply(console,args)
// }


// return ()=>{
//   console.log=orignalLogRef.current
// }


//   },[isOpen])




  return (
    <>
    {/* <h1>Hello world</h1>
        <Link href="/MainPage" className="text-black">
  <button className="border-2 px-7 py-4 bg-amber-400 text-black rounded">
          View
      </button>
        </Link> */}


        {/* <MainPage
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
      logs={logs}
      setLogs={setLogs}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      fileName={fileName}
      setFileName={setFileName}
      role={role}
      setRole={setRole}
    /> */}


{/* <Page/> */}


     <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >


        <TooltipProvider>

<IndexPage/>



      
        </TooltipProvider>
          </ThemeProvider>



</>


  );
}
