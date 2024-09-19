"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function chatbot() {
    const [response, setResponse] = useState("");
    const [model, setModel] = useState("");
    const [prompt, setPrompt] = useState("");   
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({ prompt: "", model: "" });
 
    const generateText = async () => {
        const res = await fetch('/api/generate-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({model, prompt, params})
        });
        const data = await res.json()
        console.log("data", data);  
        setResponse(data.text);
    }
    return (
    <div className="p-5 m-5">
      <h1 className="text-lg">Text Generator</h1>
      <select className="b-1 text-lg" value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="gpt2">GPT-2</option>
        <option value="gpt3">GPT-3</option>
        </select>
        <Input className="m-2 w-36 h-36" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <Button className="m-2 w-36" onClick={generateText}>Generate Text</Button>
        <h2>Response:</h2>
        <p className="rounded-md border-4 max-w-3xl">{response}</p>
    </div>
  );
}