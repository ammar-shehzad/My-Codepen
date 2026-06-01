"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "CodePen",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Codepen",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
     
    {
      title: "New Pen",
      url: "/mainpage",
      
      icon: (
        <TerminalSquareIcon
        />
      ),
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Models",
      url: "#",
      icon: (
        <BotIcon
        />
      ),
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: (
        <BookOpenIcon
        />
      ),
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "New Pen",
      url: "/mainpage",
      icon: (
<i className="fa-solid fa-hashtag" style={{color: "rgb(255, 255, 255)"}}></i>        
      ),
    },
    {
      name: "Activity",
      url: "#",
      icon: (
<i className="fa-solid fa-chart-pie" style={{color: "rgb(255, 255, 255)"}}></i>       
      ),
    },
 
        {
      name: "Bookmarks",
      url: "#",
      icon:<i className="fa-solid fa-bookmark" style={{color: "rgb(255, 255, 255)"}}></i>        
      
    },
        {
      name: "Following",
      url: "#",
      icon: (
     <i className="fa-solid fa-map" style={{color: "rgb(255, 255, 255)"}}></i>
      ),
    },

  {
      name: "Trending",
      url: "#",
      icon: <i className="fa-solid fa-arrow-trend-up" style={{color:" rgb(255, 255, 255)"}}></i>
    },


      {
      name: "Challenges",
      url: "#",
      icon:<i className="fa-brands fa-hackerrank" style={{color: "rgb(255, 255, 255)"}}></i>
    },
      {
      name: "Spark",
      url: "#",
      icon: <i className="fa-solid fa-cloud-bolt" style={{color: "rgb(255, 255, 255)"}}></i>
    },
         {
      name: "Pricing",
      url: "#",
      icon:<i className="fa-solid fa-dollar-sign" style={{color:" rgb(255, 255, 255)"}}></i>
    },



  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="w-50 bg-gray-500">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
