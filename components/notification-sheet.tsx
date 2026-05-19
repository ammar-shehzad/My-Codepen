import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { supabase } from "@/utills/supabase/client";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface RequestItem {
  id: number;
  userId: number;
  userName:string;
  OwnerId:number;
  status:string
  // add other fields from your database table
}


export interface FetchProps {
  fetchRequests: () => void; 
}

interface SheetProps{
  requests:RequestItem[];
  setRequests:Dispatch<SetStateAction<RequestItem[]>>
  fetchRequests:() => void

}










export function SheetDemo({requests,setRequests,fetchRequests}:SheetProps) {

const editRequestStatus=async(reqId:number)=>{

const { error } = await supabase
  .from('Requests')
  .update({ status: 'approved' })
  .eq('id', reqId)

if(error){
  toast.error(error.message)
}else{
toast.success("Request Accepted")
setTimeout(() => {
  fetchRequests()
}, 2000);
}



}


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Notifications</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        {/* <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div> */}

{requests.map((r: any) => {
  return (
    <div key={r.id}>

    <div   className="h-[50px] p-1 flex rounded-xl bg-muted/50" key={r.id || r.userName}>
      <p>You Have Received a Request By {String(r.userName)} to edit file " {r.fileName} "</p>

{
r.status!='approved' &&(
  <>
      <Button onClick={()=>editRequestStatus(r.id)}>Accept</Button>
      <Button variant="destructive">Delete</Button>
  </>
)
}



    </div>
    </div>
  )
})}


        <SheetFooter>
          {/* <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
