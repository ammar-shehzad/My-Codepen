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
// import CodeEditor from "./CodeEditor";
// import Header from "./Header";

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
  const [css, setCss] = useState<string | undefined>("/* Enter Css Here */");

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

  const [publicView,setPublicView]=useState<boolean>(false)
  let orignalLogRef = useRef(console.log);

  let errCountRef = useRef(0);

  const noteBookId = Number(id);

  useEffect(() => {
    if (noteBookId) {
      const fetchNotebook = async () => {
        const { data, error } = await supabase
          .from("NoteBooks")
          .select("*")
          .eq("id", noteBookId);

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

            setPublicView(true)
          }
        }
      };

      fetchNotebook();
    }
  },[]);

  useEffect(() => {
    setLogs([]);
    setConsoleErrors([]);
    // setErrCount([0])
    try {
      new Function(javascript || "")();
      // alert("javascript working")
    } catch (err: any) {
      //  errCountRef.current +=1
      setErrCount((prev) => prev + 1);
      setConsoleErrors(err.message || "Unknown Error");
      // console.error("Error executing JS", err);
      setIsError(true);
    }
  }, [javascript]);

  useEffect(() => {
    let orignalConsoleError = console.error;

    console.error = (...args) => {
      // setErrCount((prev) => prev + 1);

      setConsoleErrors(args.map((arg) => arg.toString()));

      orignalConsoleError.apply(console, args);
    };

    return () => {
      console.error = orignalConsoleError;
    };
  }, []);

  useEffect(() => {
    console.log = (...args) => {
      const consoleLogMessage = args.map((a) => String(a)).join(" ");

      setLogs((prev) => [...prev, consoleLogMessage]);
      orignalLogRef.current.apply(console, args);
    };

    return () => {
      console.log = orignalLogRef.current;
    };
  }, [isOpen]);

  // ================================

  const runCode = (e: any) => {
    const combinedCode = `
      <html>
  <head>
  <style>
    ${css} 
  </style>
</head>
        <body>
          ${html}
          <script>
            try {
              ${javascript}
            } catch (err) {
              console.error(err);
            }
          </script>

                  <span style="display:none">${Date.now()}</span>


        </body>
      </html>
    `;

    setFinalOutput(combinedCode);
  };

  // const runCode1 = useCallback(() => {
  //   const combinedCode = `
  //     <html>
  //       <body>
  //         ${html}
  //         <script>
  //           try {
  //             ${javascript}
  //           } catch (err) {
  //             console.error("Iframe Error:", err);
  //           }
  //         </script>
  //       </body>
  //     </html>
  //   `;
  //   setFinalOutput(combinedCode);
  // }, [html, javascript]);

  let dragging = useRef(false);
  let MaxHeight = 491;
  const [rowHeight, setRowHeight] = useState<number>(200);
  // const [isOpen, setIsOpen] = useState(false);
  const [consoleErr2, setConsoleErr2] = useState<any>();

  const startResizing = useCallback(() => {
    dragging.current = true;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
  }, []);

  const stopResizing = useCallback(() => {
    dragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragging.current) {
      setRowHeight((prev) => {
        const NextHeight = prev + e.movementY;
        return Math.min(Math.max(NextHeight, 0), MaxHeight);
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      console.log(javascript);
      setRowHeight((prev) => prev - 100);
      setConsoleErr2(consoleErrors);
      // setJavascript(javascript)
    }
  }, [isOpen]);

  return (
    <div className=" relative flex flex-col min-h-screen">
      {/* <style>{css}</style> */}

      <div className="flex-none">
        <div className="grid w-full grid-cols-12 gap-1 py-5 mx-auto  bg-black">
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

        <div
          className={`grid w-full grid-cols-12 gap-2  relative bg-black`}
          // style={{height:"600px"}}
          style={{
            height: `${rowHeight}px`,
            minHeight: "220px",
            maxHeight: "491px",
          }}
        >
          <div className="col-span-4 h-full">
            <CodeEditor
              editValue={html}
              setEditValue={setHtml}
              language="html"
            />
          </div>

          <div className="col-span-4 h-full">
            <CodeEditor editValue={css} setEditValue={setCss} language="css" />
          </div>

          <div className="col-span-4 h-full">
            <CodeEditor
              editValue={javascript}
              setEditValue={setJavascript}
              language="javascript"
            />
          </div>

          <div
            className="col-span-12 absolute  bottom-0 left-0 w-full h-5 bg-gray-600 cursor-ns-resize hover:bg-sky-400 transition-colors"
            // onClick={startResizing}
            onMouseDown={startResizing}
            // onMouseUp={startResizing}
          ></div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="grid w-full grid-cols-12 gap-1 py-5 mx-auto ">
          <div className="col-span-12">
            {/* 
      <div
      className="editor-output"
      dangerouslySetInnerHTML={{ __html: html || "" }} /> */}

            <button
              className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
              onClick={runCode}
            >
              Run Code
            </button>

            <iframe
              key={finalOutput}
              srcDoc={finalOutput}
              title="output"
              sandbox="allow-scripts allow-modals allow-same-origin"
              width="100%"
              height="300px"
            />
          </div>
        </div>
      </div>

      {/* for console errors */}

      <div className=" fixed bottom-0 w-full grid-cols-12  bg-black ">
        <div className="col-span-12 bg-gray-700 flex justify-between">
          <a
            className="text-white font-semibold cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Console
            {/* {errCount > 0 && ( */}
            <span className="text-white mx-2 px-1 bg-red-500 rounded-2xl">
              {errCount}
            </span>
            {/* )} */}
          </a>

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

      {/* <script>{`${javascript}`}</script> */}
    </div>
  );
};

export default MainPage;
