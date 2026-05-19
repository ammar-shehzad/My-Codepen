"use client"
import { useEffect, useState } from "react"
import BookCard from "../Component/BooksCard"
import HomeNavbar from "../Component/HomeNavbar"
import { supabase } from "@/utills/supabase/client"
import toast from "react-hot-toast"

import { AppSidebar } from "@/components/app-sidebar"
import { CardImage } from "@/components/code-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TabsDemo } from "@/components/header-tabs"

import { Button, buttonVariants } from "@/components/ui/button"
// import { Link } from "lucide-react"
import { NavigationMenuDemo } from "@/components/navigation-menu"
import { InputInline } from "@/components/search-input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SheetDemo } from "@/components/notification-sheet"

interface HomeProps{


}


interface RequestItem {
  id: number;
  userId: number;
  userName:string;
  OwnerId:number;
  status:string
  // add other fields from your database table
}



const IndexPage:React.FC<HomeProps>=()=>{

const [publicFile,setPublicFile]=useState<{id:number;BookName:string;Html:string;Css:string;Javascript:string;Role:string;User_Id:number,userName:string}[]>([])



const [privateFile,setPrivateFile]=useState<{id:number;BookName:string;Html:string;Css:string;Javascript:string;Role:string;User_Id:number,userName:string}[]>([])

  const [isPublic,setIspublic]=useState<boolean>(true)
const[requests,setRequests]=useState<RequestItem[]>([])
const router=useRouter()
const fetchPublicData=async()=>{
  
  const { data, error } = await supabase
              .from("NoteBooks")
              .select("*")
              .eq("Role", "public");
            
if(error){
  console.log(error)
}

if(data?.length){
  setPublicFile(data)
}




              





}






const fetchPrivateData=async()=>{
  


  const { data, error } = await supabase
              .from("NoteBooks")
              .select("*")
              .eq("Role", "private")
              .eq("User_Id",(localStorage.getItem("userId")));
              
            
if(error){
  console.log(error)
}

if(data?.length){
  setPrivateFile(data)
}




              





}




const fetchRequests=async()=>{

const { data, error } = await supabase
  .from('Requests')
  .select()
  .eq('OwnerId',localStorage.getItem("userId"))

if(error){
  toast.error(error.message)
}
if(data?.length){
  setRequests(data)
  // setReqStatus(data[0].status)
}else{
console.log("No Notifications")
}


}




useEffect(()=>{
  fetchPrivateData()
fetchPublicData()
fetchRequests()
},[])



return(
<>







    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
    

<NavigationMenuDemo isPublic={isPublic} setIsPublic={setIspublic}/>
<SheetDemo requests={requests} setRequests={setRequests} fetchRequests={fetchRequests}/>

<InputInline/>

  <div className="flex-1" /> 
  


{
  localStorage.getItem("userId")?
<Button className="justify-end" onClick={()=>{
  localStorage.clear()
  setTimeout(() => {
    router.push("/")
  }, 2000);
}
}>Logout</Button>
:
<Button className="justify-end" > <Link href="/login"> LogIn</Link></Button>


}


          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">

{


isPublic?
  publicFile.map((publicFiles)=>{
    return(
      <div className="aspect-video rounded-xl bg-muted/50">
{/* <BookCard myFile={publicFiles}/> */}
            <CardImage myFile={publicFiles}/>

            </div>
    )
  })

:

privateFile.map((privateFiles)=>{
    return(
      <div className="aspect-video rounded-xl bg-muted/50">
{/* <BookCard myFile={publicFiles}/> */}
            <CardImage myFile={privateFiles}/>

            </div>
    )
  })

}

            {/* <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" /> */}
          </div>
          {/* <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>





</>

)

}


export default IndexPage