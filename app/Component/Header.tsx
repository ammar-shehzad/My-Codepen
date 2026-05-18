import { ButtonSecondary } from "@/components/button-secondary"
import { Button } from "@/components/ui/button"
import { supabase } from "@/utills/supabase/client"
import { Dispatch, SetStateAction, useState } from "react"
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


const handleView=()=>{
localStorage.setItem("html",html??"")
localStorage.setItem("css",css??"")
localStorage.setItem("javascript",javascript??"")


window.open('/FullTabView','_blank')

}





const handleFileSubmit=async()=>{
if(html!=""){
  
const { data, error } = await supabase
  .from('NoteBooks')
  .select('*')
  .eq('User_Id',localStorage.getItem("userId"))

if(error){
  toast.error(error.message)
  console.log(error.message)

}else{
 console.log( data[0])
  
 
 if(data.length>0){
 if(data[0].BookName==fileName){
    toast.error("File Already Exist With This Name")
    return
  }
 }


    const { error:InsertError } = await supabase
  .from('NoteBooks')
  .insert({ 
    BookName: fileName,
    Html: html,
    Css : css,
    Javascript: javascript || "",
    Role: role,
    User_Id:Number(localStorage.getItem("userId")),
    userName:localStorage.getItem("userName")
   })

if(InsertError){
  console.log(InsertError.message)
  toast.error(InsertError.message)
}else{
  toast.success("NoteBook Saved SuccessFully")
}

  
}


}else{
  toast.error("Html Not Is Empty")
}


 
  
}

return(

<>


<div className="col-span-12  flex justify-between">

<div>



{
!isChangeName?
  <span className="text-white text-xl font-bold">
    {fileName}
    {!publicView && (
    <i className="fa-solid fa-pen" style={{color: "rgb(254, 254, 254)"}} onClick={()=>setIsChangeName(true)} ></i>
    )}

    <p className="text-white text-sm capitalize">{localStorage.getItem("userName")|| "No User"}</p>
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


    
      
      {/* <select
        id="options"
        className=" w-full rounded-md border border-gray-700 bg-gray-950 p-2.5 text-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="1">Option One</option>
        <option value="2">Option Two</option>
        <option value="3">Option Three</option>
      </select> */}
    


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
// {/* <p>{role}</p> */}
// {/* <p className="text-white text-sm capitalize  w-2xs rounded-md border border-gray-700 bg-gray-950 p-2.5 text-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500">{role}</p> */}

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






 {/* {!publicView ?
    <select name="role" id="" value={role}  className=" w-2xs rounded-md border border-gray-700 bg-gray-950 p-2.5 text-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500" onChange={(e)=>{setRole(e.target.value)}} >

<option value="public">Public</option>
<option value="private">Private</option>

</select>:
<p className="text-white text-sm capitalize  w-2xs rounded-md border border-gray-700 bg-gray-950 p-2.5 text-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500">{role}</p>


    } */}



  
<Button variant="secondary" onClick={handleView}>

Open In New Tab
</Button>

<Button 
  // type="button" 
  // className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
{/* Add Wishlist */}
<i className="fa-solid fa-heart" style={{color:' rgb(255, 255, 255)'}}></i>
</Button>


 {!publicView && (
 
<Button 
  // type="button" 
  // className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
  onClick={handleFileSubmit}
>
  <i className="fa-solid fa-cloud mx-0.5" style={{color:' rgb(255, 255, 255)'}}></i>

  Save
</Button>

    )}



 {!publicView && (

<Button 
  // type="button" 
  // className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
  <span className="mx-2"><i className="fa-solid fa-gear" style={{color:" rgb(254, 254, 254)"}}></i></span>
  Settings
</Button>

    )}






<Button 
  // type="button" 
  // className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>

<i className="fa-solid fa-eye" style={{color: "rgb(255, 255, 255)"}}></i>

</Button>




<Button 
  // type="button" 
  // className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
<i className="fa-regular fa-bookmark" style={{color: "rgb(255, 255, 255)"}}></i></Button>

{
localStorage.getItem("userId")?
<Button 
  // type="button" 
  // className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>

  <i className="fa-solid fa-user" style={{color: "rgb(255, 255, 255)"}}></i>
</Button>
:

<a
href="/login" 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>

Login</a>


}




</div>


</div>
</>

)



}

export default Header





