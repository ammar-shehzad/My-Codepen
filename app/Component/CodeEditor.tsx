import React, { Dispatch, SetStateAction } from "react";
import { Editor } from "@monaco-editor/react";

interface iconProps{
  class:string;
  style:string
}


interface CodeEditorProps {
  editValue: string | undefined;
  setEditValue: Dispatch<SetStateAction<string | undefined>>;
  language: any;
  icon:iconProps
}

const CodeEditor: React.FC<CodeEditorProps> = ({ editValue, setEditValue, language ,icon}) => {
  const handleEditorChange = (value: string | undefined) => {
    setEditValue(value ?? "");

    // console.log("Current Code : " + editValue );
  };

  return (



<div style={{ border: '1px solid #333', borderRadius: '4px',height:"80%"}}>
  <div style={{
    // padding: '10px 10px',
    background: '#1e1e1e', // Matches vs-dark
    color: 'white',
    fontSize: '12px',
    borderBottom: '1px solid #333'
  }}>
<div className="bg-[#444857] w-fit h-10 py-2 px-2 rounded-r-sm text-center " style={{fontSize:"17px",lineHeight:"25px"}}>   
   <span className="text-xl flex items-center ">

<img src={`${icon.class}`} alt="" className="w-5 h-5 mr-1" />

{/* <h6 className=""  style={{color:icon.style }}>{icon.class}</h6> */}
    {language.toUpperCase()}
    </span>
    </div>

 
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
