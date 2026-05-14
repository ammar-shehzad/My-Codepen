import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CodeEditor from "./CodeEditor";
import Header from "./Header";


interface MainPageProps {
  html: string | undefined;
  setHtml: Dispatch<SetStateAction<string | undefined>>;
  css: string | undefined;
  setCss: Dispatch<SetStateAction<string | undefined>>;
  javascript: string | undefined;
  setJavascript: Dispatch<SetStateAction<string | undefined>>;
  consoleErrors: any;
  setConsoleErrors: Dispatch<SetStateAction<any>>;
  errCount: number;
  setErrCount: Dispatch<SetStateAction<number>>;
  logs:string[]
  setLogs:Dispatch<SetStateAction<string[]>>;
  isOpen:boolean;
  setIsOpen:Dispatch<SetStateAction<boolean>>;
  fileName:string;
  setFileName:Dispatch<SetStateAction<string>>
  role:string
  setRole:Dispatch<SetStateAction<string>>
}

const MainPage: React.FC<MainPageProps> = ({
  html,
  setHtml,
  css,
  setCss,
  javascript,
  setJavascript,
  consoleErrors,
  setConsoleErrors,
  errCount,
  setErrCount,
  logs,
  setLogs,
  isOpen,
  setIsOpen,
  fileName,
  setFileName,
  role,
  setRole

}) => {
  const [finalOutput, setFinalOutput] = useState("");
  const [runCodeButton, setRunCodeButton] = useState<any>();

  const runCode = (e:any) => {
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
                setConsoleErrors("");
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
            style={{ height: "100px",overflowY:"auto" }}
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
