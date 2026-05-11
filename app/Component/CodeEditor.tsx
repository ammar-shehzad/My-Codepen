import React, { Dispatch, SetStateAction } from "react";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  editValue: string | undefined;
  setEditValue: Dispatch<SetStateAction<string | undefined>>;
  language: any;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ editValue, setEditValue, language }) => {
  const handleEditorChange = (value: string | undefined) => {
    setEditValue(value ?? "");

    // console.log("Current Code : " + editValue );
  };

  return (



<div style={{ border: '1px solid #333', borderRadius: '4px',height:"70%"}}>
  <div style={{
    padding: '10px 10px',
    background: '#1e1e1e', // Matches vs-dark
    color: 'white',
    fontSize: '12px',
    borderBottom: '1px solid #333'
  }}>
    <span className="text-xl">
    {language.toUpperCase()}

    </span>
  </div>

    <Editor
    
    defaultLanguage={language}
    // defaultValue="// start coding here"
    value={editValue}
    theme="vs-dark"
    onChange={handleEditorChange}
    />

    </div>
    
  );
};

export default CodeEditor;
