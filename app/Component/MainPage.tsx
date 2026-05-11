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
  errCount:number;
  setErrCount: Dispatch<SetStateAction<number>>;
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
  setErrCount
}) => {
  let dragging = useRef(false);
  let MaxHeight=491
  const [rowHeight, setRowHeight] = useState<number>(200);
const[isOpen,setIsOpen]=useState(false)



  const startResizing = useCallback(() => {
    dragging.current = true;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);

  }, []);

  const stopResizing = useCallback(() => {
    dragging.current=false
        window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResizing);

    
  }, []);


  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragging.current) {
      setRowHeight((prev) =>{
        const NextHeight=prev+e.movementY
        return Math.min(Math.max(NextHeight,0),MaxHeight)
        });
    }
  }, []);



useEffect(() => {
  if (isOpen) {
    setRowHeight(prev => prev - 100);
  }
}, [isOpen]);



  return (
    <div className=" relative flex flex-col min-h-screen">
      <style>{css}</style>

<div className="flex-none">
   <div className="grid w-full grid-cols-12 gap-1 py-5 mx-auto  bg-black">
        <Header html={html} css={css} javascript={javascript} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div
        className={`grid w-full grid-cols-12 gap-2  relative bg-black`}
        // style={{height:"600px"}}
        style={{ height: `${rowHeight}px`,minHeight:'220px', maxHeight:'491px'}}
      >
        <div className="col-span-4 h-full">
          <CodeEditor editValue={html} setEditValue={setHtml} language="html" />
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



      <div dangerouslySetInnerHTML={{ __html: html || "" }} />
</div>
</div>
  
  </div>   






{/* for console errors */}




      <div className=" fixed bottom-0 w-full grid-cols-12  bg-black ">

<div className="col-span-12 bg-gray-700 flex justify-between">

<a className="text-white font-semibold cursor-pointer" onClick={()=>{
  setIsOpen(!isOpen)
}}>Console 

{errCount>0 && (
<span className="text-white mx-2 px-1 bg-red-500 rounded-2xl">{errCount}</span>
)}


</a>

{isOpen && (
<button className="bg-gray-500 text-white p-1 cursor-pointer" onClick={()=>{
  setConsoleErrors("")
  setErrCount(0)
}}>
  
  Clear
</button>

)}



</div>


      {isOpen && (
      <div className="col-span-12 py-5 text-white bg-black" style={{height:"100px"}}>
          {consoleErrors}
        </div>
      
      ) }
        
      </div>

      <script>{`${javascript}`}</script>
    </div>












  );
};

export default MainPage;
