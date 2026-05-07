interface HeaderProps{


}

const Header:React.FC<HeaderProps>=()=>{

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
>
Open In New Tab
</button>

<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
Add Wishlist
</button>


<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
  Save
</button>


<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
  Settings
</button>

<button 
  type="button" 
  className="text-white bg-[#5A5F73] box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
>
View</button>



</div>


</div>
</>

)



}

export default Header


