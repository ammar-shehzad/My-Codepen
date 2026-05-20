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

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"


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
  const [activeTab, setActiveTab] = useState(2);

  const buttons = [
    { id: 1, label: "Create",link:"/mainpage" },
    { id: 2, label: "Pens" ,link:"#"},
    { id: 3, label: "Collections" ,link:"#"},
    { id: 4, label: "Deleted",link:"#" },
  ];



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
              .eq("User_Id",Number(localStorage.getItem("userId")));
              
            
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
  .eq('OwnerId',Number(localStorage.getItem("userId")))

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
          <div className="flex w-full items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
    
<div className="flex w-full items-center justify-between px-4">

<ul className="flex space-x-0.5">
  <li className="bg-[#1E1F26] w-20 h-10 py-1 rounded-l-sm text-center " style={{fontSize:"17px",lineHeight:"25px"}}>  <Link href="/mainpage">Pen </Link></li>

   <li className="bg-[#444857] w-20 h-10 py-1  text-center " style={{fontSize:"17px",lineHeight:"25px"}}> <Link href={"#"} onClick={()=>{
              setIspublic(true)
              }}>Public</Link></li>
  


{
  localStorage.getItem("userId") && (

 <li className="bg-[#1E1F26] w-30 h-10 py-1  text-center " style={{fontSize:"17px",lineHeight:"25px"}}>    <Link href={"#"} onClick={()=>{
              setIspublic(false)
              }}>Your Work</Link></li>

  )
}


     <li className="bg-[#1E1F26] w-20 h-10 py-1  rounded-r-sm text-center " style={{fontSize:"17px",lineHeight:"25px"}}>  <Link href="/mainpage">Trending </Link></li>
  


</ul>




{/* <NavigationMenuDemo isPublic={isPublic} setIsPublic={setIspublic}/> */}
<InputInline/>
<div className="flex">


<SheetDemo requests={requests} setRequests={setRequests} fetchRequests={fetchRequests}/>


  <div className="flex-1 mx-1" /> 
  
 <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-0"><i className="fa-solid fa-user" style={{color: "rgb(243, 245, 248)"}}></i></Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Profile</PopoverTitle>
          <PopoverDescription>

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


          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>

</div>

</div>


{/* {
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


} */}


          </div>
        </header>


          <div className="grid grid-cols-12   auto-rows-min gap-4 md:grid-cols-3 bg-[#131417]">

            <div className="col-span-12 py-4 ml-0 md:ml-3 lg:ml-3">
       <div className="flex gap-2 p-4 space-x-3">
      {buttons.map((btn) => (
        <Link href={btn.link}
          key={btn.id}
          onClick={() => setActiveTab(btn.id)}
          className={`${
            activeTab === btn.id
              ? "text-white  underline decoration-2 underline-offset-4" // Active styles
              : "text-[#444857]" // Inactive styles
          }`}
style={{fontSize:"17px",fontWeight:"700",lineHeight:"25px"}}

        >
          {btn.label}
        </Link>
      ))}
    </div>
            </div>
      
</div>


        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#131417]">
          
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 ml-0 md:ml-3 lg:ml-3">

    


{


isPublic?
  publicFile.map((publicFiles)=>{
    return(
      <div className="aspect-video rounded-xl bg-muted/50 ">
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