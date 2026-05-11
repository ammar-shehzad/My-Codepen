"use client"

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";


interface FullTabViewProps{
  html: string | undefined;
  setHtml: Dispatch<SetStateAction<string | undefined>>;
    css: string | undefined;
  setCss: Dispatch<SetStateAction<string | undefined>>;
    javascript: string | undefined;
  setJavascript: Dispatch<SetStateAction<string | undefined>>;
  consoleErrors:any;
  setConsoleErrors:Dispatch<SetStateAction<any>>;


}


const FullTabView:React.FC<FullTabViewProps>=({html,setHtml,css,setCss,javascript,setJavascript,consoleErrors,setConsoleErrors})=>{

  let dragging=useRef(false)
const [rowHeight,setRowHeight]=useState<number>(500)



const startResizing=useCallback(
  ()=>{
dragging.current=true

window.addEventListener('mousemove',handleMouseMove)


},[]
)


const handleMouseMove=useCallback(
  (e:MouseEvent)=>{

    
    if(dragging.current){
setRowHeight(prev=>prev+e.movementY)

}

},[]
)

return(

<>

<style>
  {/* {css} */}
  {localStorage.getItem("css")}
</style>













   <div
          dangerouslySetInnerHTML={{ __html:localStorage.getItem("html")  || ""}}
        />







<script>
  {/* {`${javascript}`} */}
  {`${localStorage.getItem("javascript")}`}

</script>
   </>


)


}

export default FullTabView