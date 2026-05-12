"use client";

import { supabase } from "@/utills/supabase/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface LoginInterface {}

const Login: React.FC<LoginInterface> = () => {
  const [loginUser, setLoginUser] = useState<{
    userEmail: string;
    userPassword: string;
  }>({ userEmail: "", userPassword: "" });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /[a-zA-Z]{2,24}/;
  const route=useRouter()

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setLoginUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUserLogin = async () => {
    if (loginUser.userEmail != "" && loginUser.userPassword) {
      if (!emailRegex.test(loginUser.userEmail)) {
        toast.error("Enter Valid Email");
      } else {
        const { data, error } = await supabase
          .from("User")
          .select()
          .eq("userEmail", loginUser.userEmail)
          .eq("userPassword", loginUser.userPassword);

if(error){
  toast.error(error.message)
  return
}
if(!data || data.length==0){
  toast.error("Invalid Email Or Password")
}else{
toast.success("Log In Successfully")
  localStorage.setItem("userId",data[0].id)
  localStorage.setItem("userName",data[0].userName)
  setTimeout(() => {
    route.push("/")
  }, 2000);

}


      }
    } else {
      toast.error("Please Fill All The Fields");
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Flowbite
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" 
              onSubmit={(e)=>{
e.preventDefault()
handleUserLogin()

              }}
              
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    name="userEmail"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={loginUser.userEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name="userPassword"
                    id="password"
                    placeholder="Enter Your Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={loginUser.userPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
