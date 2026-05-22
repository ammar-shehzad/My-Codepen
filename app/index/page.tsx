"use client";

import { useEffect, useState } from "react";
import BookCard from "../Component/BooksCard";
import HomeNavbar from "../Component/HomeNavbar";
import { supabase } from "@/utills/supabase/client";
import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AppSidebar } from "@/components/app-sidebar";
import { CardImage } from "@/components/code-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TabsDemo } from "@/components/header-tabs";

import { Button, buttonVariants } from "@/components/ui/button";
// import { Link } from "lucide-react"
import { NavigationMenuDemo } from "@/components/navigation-menu";
import { InputInline } from "@/components/search-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SheetDemo } from "@/components/notification-sheet";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

export const dynamic = 'force-dynamic'; 


interface HomeProps {}

interface RequestItem {
  id: number;
  userId: number;
  userName: string;
  OwnerId: number;
  status: string;
  // add other fields from your database table
}

const IndexPage: React.FC<HomeProps> = () => {
  const [publicFile, setPublicFile] = useState<
    {
      id: number;
      BookName: string;
      Html: string;
      Css: string;
      Javascript: string;
      Role: string;
      User_Id: number;
      userName: string;
    }[]
  >([]);

  const [privateFile, setPrivateFile] = useState<
    {
      id: number;
      BookName: string;
      Html: string;
      Css: string;
      Javascript: string;
      Role: string;
      User_Id: number;
      userName: string;
    }[]
  >([]);

  const [isPublic, setIspublic] = useState<boolean>(true);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [storedUserId, setStoredUserId] = useState<any>();
  const buttons = [
    { id: 1, label: "Create", link: "/mainpage" },
    { id: 2, label: "Pens", link: "#" },
    { id: 3, label: "Collections", link: "#" },
    { id: 4, label: "Deleted", link: "#" },
  ];

  const fetchPublicData = async () => {
    const { data, error } = await supabase
      .from("NoteBooks")
      .select("*")
      .eq("Role", "public");

    if (error) {
      console.log(error);
    }

    if (data?.length) {
      setPublicFile(data);
    }
  };

  const fetchPrivateData = async () => {
    if (storedUserId) {
      const { data, error } = await supabase
        .from("NoteBooks")
        .select("*")
        .eq("Role", "private")
        .eq("User_Id", storedUserId);
      if (error) {
        console.log(error);
      }

      if (data?.length) {
        setPrivateFile(data);
      }
    }
  };

  const fetchRequests = async () => {
    if (storedUserId) {
      const { data, error } = await supabase
        .from("Requests")
        .select()
        .eq("OwnerId", storedUserId)
        .eq("status", "pending");

      if (error) {
        toast.error(error.message);
      }
      if (data?.length) {
        setRequests(data);
        // setReqStatus(data[0].status)
      } else {
        console.log("No Notifications");
      }
    }
  };

  // ==================Doing Changes======================

  // to fetch realtime data from database
  useEffect(() => {
    setStoredUserId(Number(localStorage.getItem("userId")));
    fetchPrivateData();
    fetchPublicData();
    fetchRequests();
    const channel = supabase
      .channel("realtime myTask")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "NoteBooks" },
        (payload) => {
          console.log("Change received!", payload);

          // 3. Update state based on payload type
          fetchPrivateData();
          fetchPublicData();
          fetchRequests(); // Simplest way: re-fetch data
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Requests" },
        (payload) => {
          console.log("Change received for cards!", payload);

          fetchPrivateData();
          fetchPublicData();
          fetchRequests();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "User" },
        (payload) => {
          console.log("Change received for User LogOut!", payload);

          fetchPrivateData();
          fetchPublicData();
          fetchRequests();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // useEffect(() => {
  //   fetchPrivateData();
  //   fetchPublicData();
  //   fetchRequests();
  // }, []);

  // const userId = localStorage.getItem("userId");

  return (
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
                  <li
                    className="bg-[#1E1F26] w-auto h-10 p-2 rounded-l-sm text-center "
                    style={{ fontSize: "17px", lineHeight: "25px" }}
                  >
                    {" "}
                    <Link href="/mainpage">Pen </Link>
                  </li>

                  <li
                    className="bg-[#444857] w-auto h-10 p-2  text-center "
                    style={{ fontSize: "17px", lineHeight: "25px" }}
                  >
                    {" "}
                    <Link
                      href={"#"}
                      onClick={() => {
                        setIspublic(true);
                      }}
                    >
                      Public
                    </Link>
                  </li>

                  {storedUserId && (
                    <li
                      className="bg-[#1E1F26] w-auto h-10 p-2  text-center "
                      style={{ fontSize: "17px", lineHeight: "25px" }}
                    >
                      {" "}
                      <Link
                        href={"#"}
                        onClick={() => {
                          setIspublic(false);
                        }}
                      >
                        Your Work
                      </Link>
                    </li>
                  )}

                  <li
                    className="bg-[#1E1F26] w-auto h-10 p-2  rounded-r-sm text-center "
                    style={{ fontSize: "17px", lineHeight: "25px" }}
                  >
                    {" "}
                    <Link href="/mainpage">Trending </Link>
                  </li>
                </ul>

                {/* <NavigationMenuDemo isPublic={isPublic} setIsPublic={setIspublic}/> */}
                <InputInline />
                <div className="flex">
                  <SheetDemo
                    requests={requests}
                    setRequests={setRequests}
                    fetchRequests={fetchRequests}
                  />

                  <div className="flex-1 mx-1" />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="border-0">
                        <i
                          className="fa-solid fa-user"
                          style={{ color: "rgb(243, 245, 248)" }}
                        ></i>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <PopoverHeader>
                        <PopoverTitle>Profile</PopoverTitle>
                        <PopoverDescription>
                          {setStoredUserId!=null ? (
                            <Button
                              className="justify-end"
                              onClick={() => {
                                // localStorage.clear();
                                setTimeout(() => {
                                  router.push("/");
                                }, 2000);
                              }}
                            >
                              Logout
                            </Button>
                          ) : (
                            <Button className="justify-end">
                              {" "}
                              <Link href="/login"> LogIn</Link>
                            </Button>
                          )}
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
                  <Link
                    href={btn.link}
                    key={btn.id}
                    onClick={() => setActiveTab(btn.id)}
                    className={`${
                      activeTab === btn.id
                        ? "text-white  underline decoration-2 underline-offset-4" // Active styles
                        : "text-[#444857]" // Inactive styles
                    }`}
                    style={{
                      fontSize: "17px",
                      fontWeight: "700",
                      lineHeight: "25px",
                    }}
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12   auto-rows-min gap-4 md:grid-cols-3 bg-[#131417]">
            <div className="col-span-12 py-2 px-2 ml-0 md:ml-3 lg:ml-3 bg-[#1E1F26] flex justify-between">
              <div className="flex gap-2  space-x-3">
                <div className="ml-0 md:ml-3 lg:ml-3 flex justify-center">
                  <div className="flex">
                    <input
                      type="text"
                      className="rounded-l-sm bg-[#2C303A] w-25 px-1.5"
                      placeholder="Search For ..."
                    />
                    <button className="rounded-r-sm bg-[#444857] p-2">
                      Search
                    </button>
                  </div>

                  <button className="rounded-sm bg-[#444857] p-2 mx-3">
                    <i
                      className="fa-solid fa-filter"
                      style={{ color: "rgb(255, 255, 255)" }}
                    ></i>
                    Filter
                  </button>

                  <button className="rounded-sm bg-[#444857] p-2">
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "rgb(255, 255, 255)" }}
                    ></i>
                    Tags
                  </button>
                </div>
              </div>

              <div className="flex gap-2  space-x-3">
                <div className="ml-0 md:ml-3 lg:ml-3 flex justify-between">
                  <div className="flex">
                    <button className="rounded-l-sm mx-0.5 bg-[#444857] p-2">
                      <img
                        src="/images/gridWhite.webp"
                        alt=""
                        className="w-5 h-5"
                      />
                    </button>

                    <button className="rounded-r-sm bg-[#444857] p-2 mr-2">
                      <i
                        className="fa-solid fa-bars"
                        style={{ color: "rgb(255, 255, 255)" }}
                      ></i>
                    </button>
                  </div>

                  <Select>
                    <SelectTrigger className="text-white">
                      <SelectValue placeholder="Date Created" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <div className="flex mx-1">
                    <button className="rounded-l-sm bg-[#444857] p-2 mx-0.5">
                      <i
                        className="fa-solid fa-angle-up"
                        style={{ color: "rgb(255, 255, 255)" }}
                      ></i>
                    </button>

                    <button className="rounded-r-sm bg-[#444857] p-2">
                      <i
                        className="fa-solid fa-angle-down"
                        style={{ color: "rgb(255, 255, 255)" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12   auto-rows-min gap-4 md:grid-cols-3 bg-[#131417]">
            <div className="col-span-12 py-1 ml-0 md:ml-3 lg:ml-3">
              <div className="flex gap-2 p-2 space-x-3">
                <div></div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#131417]">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 ml-0 md:ml-3 lg:ml-3">
              {isPublic ? (
                publicFile.map((publicFiles) => {
                  return (
                    <div className="aspect-video rounded-xl bg-muted/50 ">
                      {/* <BookCard myFile={publicFiles}/> */}
                      <CardImage myFile={publicFiles} />
                    </div>
                  );
                })
              ) : privateFile.length > 0 ? (
                privateFile.map((privateFiles) => {
                  return (
                    <div className="aspect-video rounded-xl bg-muted/50">
                      {/* <BookCard myFile={publicFiles}/> */}
                      <CardImage myFile={privateFiles} />
                    </div>
                  );
                })
              ) : (
                <div className="w-full ">
                  <h5>No Files Found</h5>
                  {/* <div className="flex justify-center w-full">
                  <img src="/images/nofile.png" alt="" className="w-25 h-auto my-auto" />

                  </div> */}
                </div>
              )}

              {/* <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" /> */}
            </div>
            {/* <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default IndexPage;
