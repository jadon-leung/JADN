import React from 'react';
import { useState } from 'react'
import './home.css'

function Home() {
  const [val, setval] = useState("What do you want to schedule?")
  const click = async () => {
    try{
      const result = await fetch('hettps://api.openai.com/v1/completions',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Summarize the following content:\n\n${content}. Use around 500 words in your description of the content.` }
        ],
        max_tokens: 500,
        temperature: 0.7,
    }),
      }
    )}
    catch{

    }
  }
  const change = event => {
    setval(event.target.value)
  }
  return (  
    <div>
      
        <input 
          onChange = {change} 
          value = {val} 
          className = "input"
        />
        <button className = "button" onClick = {click}></button>
      
    </div>
  );
}

export default Home;
