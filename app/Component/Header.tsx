import { ButtonSecondary } from "@/components/button-secondary"
import { Button } from "@/components/ui/button"
import { supabase } from "@/utills/supabase/client"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import toast from "react-hot-toast"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"


interface HeaderProps{
html: string | undefined
css: string | undefined
javascript: string | undefined
isOpen:boolean
setIsOpen:Dispatch<SetStateAction<boolean>>
fileName:string
setFileName:Dispatch<SetStateAction<string>>
  role:string,
  setRole:Dispatch<SetStateAction<string>>,
  publicView:boolean,
  setPublicView:Dispatch<SetStateAction<boolean>>

}

const Header:React.FC<HeaderProps>=({html,css,javascript,fileName,setFileName,role,setRole,publicView,setPublicView})=>{

const [isChangeName,setIsChangeName]=useState<boolean>(false)
const[reqStatus,setReqStatus]=useState<string>("")

// ===================all localstorage work================
const[userId,setUserId]=useState<any>("")
const[userName,setUserName]=useState<string>()
const[bookId,setBookId]=useState<any>()
const [ownerId,setOwnerId]=useState<number>()

const  router=useRouter()


const handleView=()=>{
localStorage.setItem("html",html??"")
localStorage.setItem("css",css??"")
localStorage.setItem("javascript",javascript??"")


window.open('/fulltabview','_blank')

// alert("Preview")

}





const handleFileSubmit=async()=>{
if(html!=""){
  
const { data, error } = await supabase
  .from('NoteBooks')
  .select('*')
  .eq('User_Id',userId)
// ===============starting changes==================
if(error){
  toast.error(error.message)
  console.log(error.message)

}else{
 console.log( data[0])
  
 
 if(data.length>0){
//  if(data[0].BookName==fileName){
//     toast.error("File Already Exist With This Name")
//     return
//   }
 }



    const { error:InsertError } = await supabase
  .from('NoteBooks')
  .insert({ 
    BookName: fileName,
    Html: html,
    Css : css,
    Javascript: javascript || "",
    Role: role,
    User_Id:userId,
    userName:userName
   })



if(InsertError){
  console.log(InsertError.message)
  toast.error(InsertError.message)
}else{
  toast.success("NoteBook Saved SuccessFully")
}

  
}


}else{
  toast.error("Html Is Empty")
}


 
  
}


const handleRequestSubmit=async()=>{

if(userId){
  const { error } = await supabase
  .from('Requests')
  .insert({ 
userId:userId,
userName:userName,
OwnerId:ownerId,
status:"pending",
fileName:fileName,
bookId:bookId


   })





if(error){
  toast.error(error.message)
}else{
  toast.success("Request Send !")
}

}else{
  router.push("/login")
}





}



const fetchReqstatus=async()=>{




  console.log("UserId",localStorage.getItem("userId"))
  
const { data, error } = await supabase
  .from('Requests')
  .select()
  .eq('userId',Number(localStorage.getItem("userId")))
  .eq('bookId',Number(localStorage.getItem("BookId")))

if(error){
  toast.error(error.message)
}
if(data?.length){
  alert("This Is Status"+data[0].status)
  setReqStatus(data[0].status)
}else{
console.log("No Book")
}





}

// starting changes again




const handleFileEditByOtherUser=async(bookId:any)=>{
  


    const { error:updateError } = await supabase
  .from('NoteBooks')
  .update({ 
    
    Html: html,
    Css : css,
    Javascript: javascript || "",
    
   })
   .eq('id',bookId)

if(updateError){
  console.log(updateError.message)
  toast.error(updateError.message)
}else{
  toast.success("NoteBook Saved SuccessFully")
}







 
  
}




useEffect(()=>{

    
// let storeduser=localStorage.getItem("userId")
// let storedBook=localStorage.getItem("BookId")
// let storedUname=localStorage.getItem("userName")
// let storedOwner=localStorage.getItem("ownerId")
setUserId(Number(localStorage.getItem("userId")))
setUserName(String(localStorage.getItem("userName")))
setBookId(Number(localStorage.getItem("BookId")))
setOwnerId(Number(localStorage.getItem("ownerId")))
// if(storeduser){
  
// }

// if(storedUname){

// }

// if(storedBook){

// }
// if(storedOwner){

// }




fetchReqstatus()

},[])



return(

<>


<div className="col-span-12 pt-2 flex justify-between">

<div >



{
!isChangeName?
  <span className="text-white text-xl ml-3 font-bold">
    {fileName}
    {!publicView && (
    <i className="fa-solid fa-pen" style={{color: "rgb(254, 254, 254)"}} onClick={()=>setIsChangeName(true)} ></i>
    )}

    <p className="text-white text-sm capitalize ml-3">{userName|| "No User"}</p>
  </span>
  :
<form 
onSubmit={()=>{
setIsChangeName(false)
}}

>
  <input type="text" className="border-white border-1 mx-1 text-white" onChange={(e)=>setFileName(e.target.value)}/>

</form>

}

</div>

<div className="space-x-2 flex">


    
      
     
    


 {!publicView ?
  <Select value={role} onValueChange={(newValue) =>setRole(newValue)} >
      <SelectTrigger className="w-full max-w-48 text-white">
        <SelectValue placeholder="Select a Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
      
        </SelectGroup>
      </SelectContent>
    </Select>

 :


  <Select value={role}  >
      <SelectTrigger className="w-full max-w-48 text-white">
        <SelectValue placeholder="Select a Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
      
        </SelectGroup>
      </SelectContent>
    </Select>

    }









<ul className="flex space-x-2 mr-2">
  <li className="bg-[#1E1F26] w-20 h-10 py-3 rounded-l-sm text-center text-white " style={{fontSize:"15px",lineHeight:"18px"}}> <Link href="#" onClick={handleView}> New Tab
</Link> </li>







   
  






     <li className="bg-[#1E1F26] w-20 h-10 py-3 rounded-l-sm text-center text-white " style={{fontSize:"15px",lineHeight:"18px"}}> 
<Link
href="#" 
  // type="button" 
  // className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
{/* Add Wishlist */}
<i className="fa-solid fa-heart" style={{color:' rgb(255, 255, 255)'}}></i>
</Link>

     </li>




 {publicView && (
   
   <li className="bg-[#1E1F26] w-30 h-10 py-3 rounded-l-sm text-center text-white " style={{fontSize:"15px",lineHeight:"18px"}}> 
{
reqStatus=='approved'?

<Link href="#"  onClick={()=>handleFileEditByOtherUser(Number(bookId))}>

Save Changes
</Link>
:

reqStatus==""&&(

<Link  href="#" onClick={handleRequestSubmit}>

Edit Request
</Link>


)

}

   </li>

    )}


  


 {!publicView && (
 
userId?

 
  <li className="bg-[#1E1F26] w-20 h-10 py-3 rounded-l-sm text-center text-white " style={{fontSize:"15px",lineHeight:"18px"}}>


<Link href="#" 
  // type="button" 
  // className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
  onClick={handleFileSubmit}
>
  <i className="fa-solid fa-cloud mx-0.5" style={{color:' rgb(255, 255, 255)'}}></i>

  Save
</Link>


  </li>

:

 <li className="bg-[#1E1F26] w-20 h-10 py-3 rounded-l-sm text-center text-white " style={{fontSize:"15px",lineHeight:"18px"}}>


<Link href="/login" 

>
  <i className="fa-solid fa-cloud mx-0.5" style={{color:' rgb(255, 255, 255)'}}></i>

  Save
</Link>


  </li>


    )}





 {!publicView && (
 
  <li className="bg-[#1E1F26] w-25 h-10 py-3 rounded-l-sm text-center text-white " style={{fontSize:"15px",lineHeight:"18px"}}>

<Link href="#">
  <span className="mx-2"><i className="fa-solid fa-gear" style={{color:" rgb(254, 254, 254)"}}></i></span>
  Settings
</Link>


  </li>




    )}


  <li className="bg-[#1E1F26] w-20 h-10 py-3 rounded-l-sm text-center text-white " style={{fontSize:"15px",lineHeight:"18px"}}>

<Link href="#">

<i className="fa-solid fa-eye" style={{color: "rgb(255, 255, 255)"}}></i>

</Link>


  </li>





  <li className="bg-[#1E1F26] w-20 h-10 py-3 rounded-l-sm text-center text-white " style={{fontSize:"15px",lineHeight:"18px"}}>

<Link href="#" >
<i className="fa-regular fa-bookmark" style={{color: "rgb(255, 255, 255)"}}></i></Link>


  </li>




</ul>







{/* ===================================Old Buttons====================== */}


{/*   
<Button variant="secondary" onClick={handleView}>

Open In New Tab
</Button> */}

{/* 
 {publicView && (
 
reqStatus=='approved'?

<Button variant="secondary" onClick={()=>handleFileEditByOtherUser(Number(localStorage.getItem("BookId")))}>

Save Changes
</Button>
:

reqStatus==""&&(

<Button variant="secondary" onClick={handleRequestSubmit}>

Edit Request
</Button>
)

    )} */}







{/* 
<Button>
<i className="fa-solid fa-heart" style={{color:' rgb(255, 255, 255)'}}></i>
</Button> */}

{/* 
 {!publicView && (
 
<Button 
  
  onClick={handleFileSubmit}
>
  <i className="fa-solid fa-cloud mx-0.5" style={{color:' rgb(255, 255, 255)'}}></i>

  Save
</Button>

    )} */}


{/* 
 {!publicView && (

<Button >
  <span className="mx-2"><i className="fa-solid fa-gear" style={{color:" rgb(254, 254, 254)"}}></i></span>
  Settings
</Button>

    )}
 */}




{/* 
<Button >

<i className="fa-solid fa-eye" style={{color: "rgb(255, 255, 255)"}}></i>

</Button> */}



{/* 
<Button >
<i className="fa-regular fa-bookmark" style={{color: "rgb(255, 255, 255)"}}></i>
</Button> */}

{/* {
localStorage.getItem("userId")?
<Button>

  <i className="fa-solid fa-user" style={{color: "rgb(255, 255, 255)"}}></i>
</Button>
:

<a
href="/login" 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>

Login</a>


} */}

{/* ============================ */}


</div>


</div>
</>

)



}

export default Header





