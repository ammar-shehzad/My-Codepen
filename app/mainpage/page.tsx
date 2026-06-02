"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "../Component/Header";
import CodeEditor from "../Component/CodeEditor";
import { supabase } from "@/utills/supabase/client";
import toast from "react-hot-toast";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SheetSide } from "@/components/bottom-console";

// import CodeEditor from "./CodeEditor";
// import Header from "./Header";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';


interface MainPageProps {
  // html: string | undefined;
  // setHtml: Dispatch<SetStateAction<string | undefined>>;
  // css: string | undefined;
  // setCss: Dispatch<SetStateAction<string | undefined>>;
  // javascript: string | undefined;
  // setJavascript: Dispatch<SetStateAction<string | undefined>>;
  // consoleErrors: any;
  // setConsoleErrors: Dispatch<SetStateAction<any>>;
  // errCount: number;
  // setErrCount: Dispatch<SetStateAction<number>>;
  // logs:string[]
  // setLogs:Dispatch<SetStateAction<string[]>>;
  // isOpen:boolean;
  // setIsOpen:Dispatch<SetStateAction<boolean>>;
  // fileName:string;
  // setFileName:Dispatch<SetStateAction<string>>
  // role:string
  // setRole:Dispatch<SetStateAction<string>>
  id: string;
}

const MainPage: React.FC<MainPageProps> = ({
  // html,
  // setHtml,
  // css,
  // setCss,
  // javascript,
  // setJavascript,
  // consoleErrors,
  // setConsoleErrors,
  // errCount,
  // setErrCount,
  // logs,
  // setLogs,
  // isOpen,
  // setIsOpen,
  // fileName,
  // setFileName,
  // role,
  // setRole
  id,
}) => {
  const [finalOutput, setFinalOutput] = useState("");
  const [runCodeButton, setRunCodeButton] = useState<any>();

  // ===================================

  const [html, setHtml] = useState<string | undefined>("");
  const [css, setCss] = useState<string | undefined>("");

  const [javascript, setJavascript] = useState<string | undefined>("");
  const [consoleErrors, setConsoleErrors] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  // const isHijacked=useRef(false)

  const [isOpen, setIsOpen] = useState(false);
  const [errCount, setErrCount] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("Untitled");
  const [role, setRole] = useState<string>("private");
  const [selectedFile, setSelectedFile] = useState<{
    id: number;
    BookName: string;
    Html: string;
    Css: string;
    Javascript: string;
    Role: string;
    User_Id: number;
    userName: string;
  }>();

  const [publicView, setPublicView] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  let orignalLogRef = useRef(console.log);

  let errCountRef = useRef(0);

  const noteBookId = Number(id);

  const [hIcon, setHIcon] = useState<{ class: string; style: string }>({
    class: "/images/html.png",
    style: "red",
  });

  const [cIcon, setCIcon] = useState<{ class: string; style: string }>({
    class: "/images/css.webp",
    style: "skyblue",
  });

  const [jIcon, setJIcon] = useState<{ class: string; style: string }>({
    class: "/images/javascript.webp",
    style: "yellow",
  });

  useEffect(() => {
    if (noteBookId) {
      const fetchNotebook = async () => {
        const { data, error } = await supabase
          .from("NoteBooks")
          .select("*")
          .eq("id", Number(noteBookId));

        if (error) {
          toast.error(error.message);
          console.log(error.message);
        } else {
          if (data.length) {
            setHtml(data[0].Html);
            setCss(data[0].Css);
            setJavascript(data[0].Javascript);
            setFileName(data[0].BookName);
            setRole(data[0].Role);
            localStorage.setItem("ownerId", data[0].User_Id);
            localStorage.setItem("fileName", data[0].BookName);
            localStorage.setItem("BookId", data[0].id);

            setPublicView(true);
          }
        }
      };

      setTimeout(() => {
        fetchNotebook();
      }, 2000);
    }
  }, [noteBookId]);

  //   useEffect(() => {
  //     setLogs([]);
  //     setConsoleErrors([]);
  //     try {

  //       if(javascript){
  //         new Function(javascript || "")();

  //       }
  //     } catch (err: any) {
  //       //  errCountRef.current +=1
  //       setErrCount((prev) => prev + 1);
  //       setConsoleErrors(err.message || "Unknown Error");
  //       setIsError(true);
  //       return
  //     }

  //     const combinedCode = `
  //       <html>
  //   <head>
  //   <style>
  //     ${css || ""}
  //   </style>
  // </head>
  //         <body>
  //           ${html || ""}
  //           <script>
  //             try {
  //               ${javascript || ""}
  //             } catch (err) {
  //               console.error(err);
  //             }
  //           </script>

  //                   <span style="display:none">${Date.now()}</span>

  //         </body>
  //       </html>
  //     `;

  //     setFinalOutput(combinedCode);

  //   }, [html,css,javascript]);

  useEffect(() => {
    setLogs([]);
    setConsoleErrors([]);
    setIsError(false);

    const timeoutId = setTimeout(() => {
      try {
        if (javascript) {
          new Function(javascript)();
        }

        const combinedCode = `
        <html>
          <head><style>${css || ""}</style></head>
          <body>
            ${html || ""}
            <script>
               ${javascript || ""}  
            </script>
          </body>
        </html>
      `;
        setFinalOutput(combinedCode);
      } catch (err: any) {
        setErrCount((prev) => prev + 1);
        setConsoleErrors(err.message || "Syntax Error");
        setIsError(true);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [html, css, javascript]);

  useEffect(() => {
    setHasMounted(true);

    let orignalConsoleError = console.error;

    console.error = (...args) => {
      // setErrCount((prev) => prev + 1);

      // setConsoleErrors(args.map((arg) => arg.toString()));

      const consoleerrMessage = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");

      setConsoleErrors((prev) => [...prev, consoleerrMessage]);

      //      setConsoleErrors((prev) => [
      //   ...prev,
      //   args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ')
      // ]);

      orignalConsoleError.apply(console, args);
    };

    return () => {
      console.error = orignalConsoleError;
    };
  }, []);

  useEffect(() => {
    orignalLogRef.current = console.log;

    console.log = (...args) => {
      const consoleLogMessage = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");

      // args.map((a) => String(a)).join(" ");

      setLogs((prev) => [...prev, consoleLogMessage]);

      orignalLogRef.current.apply(console, args);
    };

    return () => {
      console.log = orignalLogRef.current;
    };
  }, []);

  // ================================

  //   const runCode = (e: any) => {
  //     const combinedCode = `
  //       <html>
  //   <head>
  //   <style>
  //     ${css}
  //   </style>
  // </head>
  //         <body>
  //           ${html}
  //           <script>
  //             try {
  //               ${javascript}
  //             } catch (err) {
  //               console.error(err);
  //             }
  //           </script>

  //                   <span style="display:none">${Date.now()}</span>

  //         </body>
  //       </html>
  //     `;

  //     setFinalOutput(combinedCode);
  //   };

  let dragging = useRef(false);
  let MaxHeight = 491;
  const [rowHeight, setRowHeight] = useState<number>(200);
  // const [isOpen, setIsOpen] = useState(false);
  const [consoleErr2, setConsoleErr2] = useState<any>();

  // const startResizing = useCallback(() => {
  //   dragging.current = true;

  

  // const stopResizing = useCallback(() => {
  //   dragging.current = false;
  //   window.removeEventListener("mousemove", handleMouseMove);
  //   window.removeEventListener("mouseup", stopResizing);
  // }, []);

  // const handleMouseMove = useCallback((e: MouseEvent) => {
  //   if (dragging.current) {
  //     setRowHeight((prev) => {
  //       const NextHeight = prev + e.movementY;
  //       return Math.min(Math.max(NextHeight, 0), MaxHeight);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (isOpen) {
      console.log(javascript);
      setRowHeight((prev) => prev - 100);
      setConsoleErr2(consoleErrors);
      // setJavascript(javascript)
    }
  }, [isOpen]);

  // ===================================strating changes=======================
  if (!hasMounted) return null;

  return (
    <div className="overflow-y-auto">
      {/* ========================================================== */}

      <div className="grid grid-cols-12 ">
        <div className="col-span-12   bg-black">
          <Header
            html={html}
            css={css}
            javascript={javascript}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            fileName={fileName}
            setFileName={setFileName}
            role={role}
            setRole={setRole}
            publicView={publicView}
            setPublicView={setPublicView}
          />
        </div>

        {/* ====================================resizable content======================== */}
        <div className="col-span-12 p-0 h-screen">
          <ResizablePanelGroup
            orientation="vertical"
            className=" h-full w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={80}>
              <div className="flex h-full items-center justify-center">
                <div className="grid grid-cols-12 w-full h-full">
                  <div className="col-span-4 h-full">
                    <CodeEditor
                      editValue={html}
                      setEditValue={setHtml}
                      icon={hIcon}
                      language="html"
                    />
                  </div>
                  <div className="col-span-4 h-full">
                    <CodeEditor
                      editValue={css}
                      setEditValue={setCss}
                      icon={cIcon}
                      language="css"
                    />
                  </div>
                  <div className="col-span-4 h-full">
                    <CodeEditor
                      editValue={javascript}
                      setEditValue={setJavascript}
                      icon={jIcon}
                      language="javascript"
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full">
                <div className="flex h-auto w-full ">
                  <div className="grid grid-cols-12 w-full h-full">
                    <div className="col-span-12">
                      {/* 
      <div
      className="editor-output"
      dangerouslySetInnerHTML={{ __html: html || "" }} /> */}

                      {/* <button
                        className="text-white bg-[#5A5F73] my-2 box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
                        onClick={runCode}
                      >
                        Run Code
                      </button> */}

                      <iframe
                        key={finalOutput}
                        srcDoc={finalOutput}
                        title="output"
                        sandbox="allow-scripts allow-modals allow-same-origin"
                        width="100%"
                        height="auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* ====================================resizable content======================== */}

        <div className=" fixed bottom-0 w-full grid-cols-12  bg-black ">
          <div className="col-span-12 bg-gray-700 flex justify-between">
            <div className="flex">
              <SheetSide
                consoleErrors={consoleErrors}
                setConsoleErrors={setConsoleErrors}
                logs={logs}
                setLogs={setLogs}
                errCount={errCount}
                setErrCount={setErrCount}
              />
            </div>

            {/* <a
              className="text-white font-semibold cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Console
              <span className="text-white mx-2 px-1 bg-red-500 rounded-2xl">
                {errCount}
              </span>
              
            </a> */}

            {isOpen && (
              <button
                className="bg-gray-500 text-white p-1 cursor-pointer"
                onClick={() => {
                  setConsoleErrors([]);
                  setErrCount(0);
                  setJavascript(javascript);
                }}
              >
                Clear
              </button>
            )}
          </div>

          {isOpen && (
            <div
              className="col-span-12 py-5 text-white bg-black"
              style={{ height: "100px", overflowY: "auto" }}
            >
              {/* <p>

{logs}
</p> */}
              {/* <br> */}
              {consoleErrors}

              {logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}

              <br />
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
    </div>
  );
};

export default MainPage;
