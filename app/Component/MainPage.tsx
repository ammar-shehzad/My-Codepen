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
}) => {
  let dragging = useRef(false);
  const [rowHeight, setRowHeight] = useState<number>(500);

  const startResizing = useCallback(() => {
    dragging.current = true;

    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragging.current) {
      setRowHeight((prev) => prev + e.movementY);
    }
  }, []);

  return (
    <>
      <style>{css}</style>

      <div className="grid w-full grid-cols-12 gap-1 py-5 mx-auto bg-black">
        <h2 className="text-2xl text-white">{rowHeight}</h2>
        <Header />
      </div>

      <div
        className={`grid w-full grid-cols-12 gap-2  bg-black`}
        style={{ height: `${rowHeight}` }}
      >
        <div className="col-span-4 ">
          <CodeEditor editValue={html} setEditValue={setHtml} language="html" />
        </div>

        <div className="col-span-4">
          <CodeEditor editValue={css} setEditValue={setCss} language="css" />
        </div>

        <div className="col-span-4">
          <CodeEditor
            editValue={javascript}
            setEditValue={setJavascript}
            language="javascript"
          />
        </div>

        <div
          className="col-span-12 h-2 bg-gray-600 cursor-ns-resize hover:bg-sky-400 transition-colors"
          onMouseDown={startResizing}
          onMouseUp={startResizing}
        ></div>
      </div>

      <h1>Preview</h1>

      {/* <iframe
  srcDoc={srcDoc}
  title="output"
  sandbox="allow-scripts"
  frameBorder="0"
  width="100%"
  height="100%"
/> */}

      <div dangerouslySetInnerHTML={{ __html: html || "" }} />

      <div className="grid-cols-12">
        <div className="col-span-12 py-5 text-white bg-black">
          {consoleErrors}
        </div>
      </div>

      <script>{`${javascript}`}</script>
    </>
  );
};

export default MainPage;
