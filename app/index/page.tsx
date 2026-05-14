"use client"
import { useEffect, useState } from "react"
import BookCard from "../Component/BooksCard"
import HomeNavbar from "../Component/HomeNavbar"
import { supabase } from "@/utills/supabase/client"



interface HomeProps{


}





const IndexPage:React.FC<HomeProps>=()=>{

const [publicFile,setPublicFile]=useState<{id:number;BookName:string;Html:string;Css:string;Javascript:string;Role:string;User_Id:number,userName:string}[]>([])


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

if(localStorage.getItem("user")){

  const { data, error } = await supabase
              .from("NoteBooks")
              .select("*")
              .eq("Role", "private")
              .eq("User_Id",localStorage.getItem("user"))

}else{
  console.log("No User Found")
  return
}
}



useEffect(()=>{
fetchPublicData()
fetchPrivateData()
},[])



return(
<>

<div className="container">
<div className="grid grid-cols-12">
  <div className="col-span-12">
<HomeNavbar/>

  </div>
</div>
</div>


<div className="container mx-auto mt-20">
  <div className="grid grid-cols-12">
{
  publicFile.map((code)=>{
    return(
  <div className="col-span-3">
<BookCard publicFile={code}/>

  </div>
    )
  })
}


</div>
</div>




</>

)

}


export default IndexPage