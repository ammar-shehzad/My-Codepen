import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Bold } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const SHEET_SIDES = ["bottom"] as const

interface SheetSideProps{
    consoleErrors: string[];
  setConsoleErrors: Dispatch<SetStateAction<string[]>>;
    logs: string[];
  setLogs: Dispatch<SetStateAction<string[]>>;
     errCount: number;
  setErrCount: Dispatch<SetStateAction<number>>;
}


export function SheetSide({consoleErrors,setConsoleErrors,logs,setLogs,errCount,setErrCount}:SheetSideProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button  className="capitalize">
              {side}
              <span style={{color:"red",fontWeight:"bold"}}>
              {errCount }

              </span>

            </Button>
          </SheetTrigger>
          <SheetContent
            side={side}
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>Console Box <span style={{color:"red",fontWeight:"bold"}}>{errCount}</span></SheetTitle>
              <SheetDescription>
<Button onClick={()=>{
  setConsoleErrors([])
  setLogs([])
  setErrCount(0)
}}>Clear Console</Button>
              </SheetDescription>
            </SheetHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
             
             <p style={{color:"red"}}>{consoleErrors}</p>
 
                {logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
             
            </div>
            <SheetFooter>
            
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
