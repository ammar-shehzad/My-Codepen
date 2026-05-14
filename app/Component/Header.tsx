import { supabase } from "@/utills/supabase/client"
import { Dispatch, SetStateAction, useState } from "react"
import toast from "react-hot-toast"

interface HeaderProps{
html: string | undefined
css: string | undefined
javascript: string | undefined
isOpen:boolean
setIsOpen:Dispatch<SetStateAction<boolean>>
fileName:string
setFileName:Dispatch<SetStateAction<string>>
  role:string,
  setRole:Dispatch<SetStateAction<string>>

}

const Header:React.FC<HeaderProps>=({html,css,javascript,fileName,setFileName,role,setRole})=>{

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
  .eq('User_Id',localStorage.getItem("user"))

if(error){
  toast.error(error.message)

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
    User_Id:localStorage.getItem("user"),
    userName:localStorage.getItem("userName")
   })

if(InsertError){
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
    <i className="fa-solid fa-pen" style={{color: "rgb(254, 254, 254)"}} onClick={()=>setIsChangeName(true)} ></i>
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

<div className="space-x-2">


    
      
      {/* <select
        id="options"
        className=" w-full rounded-md border border-gray-700 bg-gray-950 p-2.5 text-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="1">Option One</option>
        <option value="2">Option Two</option>
        <option value="3">Option Three</option>
      </select> */}
    




<select name="role" id="" value={role}  className=" w-2xs rounded-md border border-gray-700 bg-gray-950 p-2.5 text-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500" onChange={(e)=>{setRole(e.target.value)}} >

<option value="public">Public</option>
<option value="private">Private</option>

</select>

<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
  onClick={handleView}
>
Open In New Tab
</button>

<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
{/* Add Wishlist */}
<i className="fa-solid fa-heart" style={{color:' rgb(255, 255, 255)'}}></i>
</button>


<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
  onClick={handleFileSubmit}
>
  <i className="fa-solid fa-cloud mx-0.5" style={{color:' rgb(255, 255, 255)'}}></i>

  Save
</button>


<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
  <span className="mx-2"><i className="fa-solid fa-gear" style={{color:" rgb(254, 254, 254)"}}></i></span>
  Settings
</button>



<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>

<i className="fa-solid fa-eye" style={{color: "rgb(255, 255, 255)"}}></i>

</button>




<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
<i className="fa-regular fa-bookmark" style={{color: "rgb(255, 255, 255)"}}></i></button>

{
localStorage.getItem("userId")?
<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>

  <i className="fa-solid fa-user" style={{color: "rgb(255, 255, 255)"}}></i>
</button>
:

<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>

Login</button>


}




</div>


</div>
</>

)



}

export default Header


