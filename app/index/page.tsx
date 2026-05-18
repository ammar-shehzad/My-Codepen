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

import { buttonVariants } from "@/components/ui/button"
import { Link } from "lucide-react"
import { NavigationMenuDemo } from "@/components/navigation-menu"
import { InputInline } from "@/components/search-input"

interface HomeProps{


}





const IndexPage:React.FC<HomeProps>=()=>{

const [publicFile,setPublicFile]=useState<{id:number;BookName:string;Html:string;Css:string;Javascript:string;Role:string;User_Id:number,userName:string}[]>([])



const [privateFile,setPrivateFile]=useState<{id:number;BookName:string;Html:string;Css:string;Javascript:string;Role:string;User_Id:number,userName:string}[]>([])

  const [isPublic,setIspublic]=useState<boolean>(true)


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
  
// let userId=parseInt(localStorage.getItem("userId")||"")
// console.log(typeof userId)

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


// const fetchPrivateData=async()=>{

//   console.log("working"+ localStorage.getItem('userId'))
// if(localStorage.getItem('userId')){

//   const { data, error } = await supabase
//               .from("NoteBooks")
//               .select("*")
//               .eq("Role", "private")
//               .eq("User_Id",Number(localStorage.getItem('userId')))

// if(error){
//   toast.error(error.message)
//   console.log(error)
// }

// if(data?.length){
//   setPrivateFile(data)
// }


// }else{
//   console.log("No User Found")
  
// }
// }



useEffect(()=>{
  fetchPrivateData()
fetchPublicData()
},[])



return(
<>

{/* <div className="grid grid-cols-12">
  <div className="col-span-12">
<HomeNavbar/>

  </div>
</div> */}


{/* ===================old work============ */}

{/* <div className="w-full grid grid-cols-12 ">

<div className="col-span-1  ">

 <aside className="w-40 bg-[#1E1F26] text-white sticky top-0 h-screen p-4">
  </aside>

</div>

<div className="col-span-10">

<div className="container  ml-11 ">
  <div className="grid w-full grid-cols-12 ">

<div className="col-span-12  bg-black py-2 fixed w-full">
<div className="grid grid-cols-12">
<div className="col-span-3">
<div className="flex justify-center items-center">
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        
      
        <input
          type="search"
          
          className="block w-full p-4 pl-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 outline-none transition"
          placeholder="Search Pens, Projects, Posts..."
        />
      </div>
    </div>
</div>


</div>




</div>
<div className="col-span-12">

<div className="grid w-full grid-cols-12 ml-5 gap-4">

{
  publicFile.map((publicFiles)=>{
    return(
  <div className="col-span-3">
<BookCard myFile={publicFiles}/>

  </div>
    )
  })
}
</div>

</div>




</div>

  <div className="grid w-full grid-cols-12 ml-5 gap-4 my-16">
    <div className="col-span-12">
      <h1>Private Files</h1>
    </div>
{
  privateFile.map((privateFiles)=>{
    return(
  <div className="col-span-3">
<BookCard myFile={privateFiles}/>

  </div>
    )
  })
}


</div>

</div>

</div>


</div> */}

{/* ===================old work============ */}





    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
    

<NavigationMenuDemo isPublic={isPublic} setIsPublic={setIspublic}/>

<InputInline/>


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