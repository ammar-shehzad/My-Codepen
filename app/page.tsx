export const dynamic = 'force-dynamic';



import IndexPage from "./index/page";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Home() {
  


  return (
    <>
   

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <IndexPage />
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}
