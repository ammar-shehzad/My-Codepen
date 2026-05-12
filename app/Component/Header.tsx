import { Dispatch, SetStateAction } from "react"

interface HeaderProps{
html: string | undefined
css: string | undefined
javascript: string | undefined
isOpen:boolean
setIsOpen:Dispatch<SetStateAction<boolean>>

}

const Header:React.FC<HeaderProps>=({html,css,javascript})=>{

const handleView=()=>{
localStorage.setItem("html",html??"")
localStorage.setItem("css",css??"")
localStorage.setItem("javascript",javascript??"")


window.open('/FullTabView','_blank')

}


return(

<>


<div className="col-span-12  flex justify-between">

<div>


  <span className="text-white text-xl font-bold">
    Untitled
  </span>
  <p className="text-white text-sm">Ammar Shehzad</p>
</div>

<div className="space-x-2">


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


