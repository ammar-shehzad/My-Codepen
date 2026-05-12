// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { useConsoleInterceptor } from "./hooks/useConsoleInterceptor";

// export function ConsoleBox() {
//   const { logs, clearLogs } = useConsoleInterceptor();

//   return (
//     <Card className="w-full max-w-2xl bg-black text-white font-mono">
//       <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800 p-4">
//         <CardTitle className="text-sm">System Console</CardTitle>
//         <button onClick={clearLogs} className="text-xs text-zinc-400 hover:text-white">
//           Clear
//         </button>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ScrollArea className="h-64 p-4">
//           {logs.length === 0 ? (
//             <span className="text-zinc-500 italic">No logs yet...</span>
//           ) : (
//             logs.map((log, i) => (
//               <div key={i} className="mb-1 text-xs">
//                 <span className="text-zinc-500 mr-2">[{log.timestamp}]</span>
//                 <span className={
//                   log.type === "error" ? "text-red-400" : 
//                   log.type === "warn" ? "text-yellow-400" : "text-green-400"
//                 }>
//                   {log.type.toUpperCase()}:
//                 </span>
//                 <span className="ml-2 whitespace-pre-wrap">{log.message}</span>
//               </div>
//             ))
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// }
