"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { MoreHorizontalIcon, FolderIcon, ArrowRightIcon, Trash2Icon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"



export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Create </SidebarGroupLabel>
      <SidebarMenu>
 {/* <SidebarMenuItem className="p-3 " style={{background: "linear-gradient(to right, #ff007f0%, #ff007f 5%, #ff7e5f 5%, #ff7e5f 10%, #ffe600 10%, #ffe600 15%, #86e3ce 15%,#86e3ce 20%, #00d2ff 20%, #00d2ff 100%)"
  }}

> */}

  <SidebarMenuItem className="p-3">


<ul className="w-35 space-y-1" style={{fontSize:"17px",lineHeight:"25px"}}>
  <li className="bg-[#2C303A]  hover:bg-black ">
    <div className="py-0.5" style={{backgroundImage: "linear-gradient(to right, #ff007f 0%, #ff007f 5%, #ff7e5f 5%, #ff7e5f 10%, #ffe600 10%, #ffe600 15%, #86e3ce 15%, #86e3ce 20%, #00d2ff 20%, #00d2ff 300%)"}} ></div>
     <Link className="flex py-2" href="/mainpage"><span><img src="/images/grid.png" alt="" className="w-7 " /></span> Pen </Link>
       </li>
  <li className="bg-[#2C303A] py-2 hover:bg-black ">
     <Link className="flex" href="/"><span><img src="/images/grid.png" alt="" className="w-7 " /></span>Classic Pen </Link>
       </li>
         <li className="bg-[#2C303A] py-2 hover:bg-black ">
     <Link className="flex" href="/"><span><img src="/images/grid.png" alt="" className="w-7 " /></span> Collection </Link>
       </li>

</ul>

        </SidebarMenuItem>

        {projects.map((item) => (
          <SidebarMenuItem key={item.name} className="space-y-3">
            <SidebarMenuButton asChild>
              <a href={item.url}>
                {item.icon}
                <span style={{fontSize:"17px",lineHeight:"17px"}}>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="aria-expanded:bg-muted"
                >
                  <MoreHorizontalIcon
                  />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowRightIcon className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2Icon className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
