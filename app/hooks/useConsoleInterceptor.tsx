"use client";
import { useState, useEffect, useCallback } from "react";

export type LogEntry = {
  type: "log" | "error" | "warn" | "info";
  message: string;
  timestamp: string;
};

export function useConsoleInterceptor() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((type: LogEntry["type"], args: any[]) => {
    const message = args.map(arg => 
      typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(" ");

    setLogs((prev) => [...prev, {
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    }]);
  }, []);

  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    console.log = (...args) => { originalLog(...args); addLog("log", args); };
    console.error = (...args) => { originalError(...args); addLog("error", args); };
    console.warn = (...args) => { originalWarn(...args); addLog("warn", args); };
    console.info = (...args) => { originalInfo(...args); addLog("info", args); };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;
    };
  }, [addLog]);

  return { logs, clearLogs: () => setLogs([]) };
}
