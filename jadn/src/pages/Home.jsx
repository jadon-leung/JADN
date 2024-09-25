import React, { useState, useEffect} from 'react';
import './home.css';
import {gapi} from 'gapi-script'

function Home() {
  
  const [val, setVal] = useState("What do you want to schedule?");

  
  const makeGoogleCalendarApiCall = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No OAuth token found, please log in again.");
      return;
    }
  
    gapi.load('client', async () => {
      try {
        await gapi.client.load('calendar', 'v3');
        console.log('Google Calendar API loaded successfully');
        console.log('token in gapi client load', token)
        // Set the OAuth token
        gapi.client.setToken({ access_token: token });
  
      } catch (error) {
        console.error('Error loading Calendar API or making API call:', error);
      }
    });
  };
  
  
 


 const click = async () => {
   const apiKey2 = "" //place openAI api key
   const apiUrl = 'https://api.openai.com/v1/chat/completions'
   const tok = localStorage.getItem('token')
   console.log('tok: ', tok)
  makeGoogleCalendarApiCall()
  try {
     const result = await fetch(apiUrl, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${apiKey2}`,
       },
       body: JSON.stringify({
         model: "gpt-3.5-turbo",
         messages: [
           { role: "system", content: "You are a helpful assistant." },
           { role: "user", content: `Please provide the following event details in JSON format using ${val}: Summary, Location, Start Time, End Time. For example, if the user says 'schedule dinner tomorrow from 6pm to 8pm at home', the output should be structured JSON like this:
             {
               "summary": "Dinner",
               "location": "Home",
               "start": "6pm",
               "end": "8pm"
             }
             Convert the start and end times to RFC3339 format and the year is 2024. If you are not confident in filling out the output, or if user does not provide information, leave it empty. If end time is left empty and start is filled, assume the end time is one hour later. Respond with only the JSON format do not say anything else.` }
         ],
         max_tokens: 100,
         temperature: 0.7,
       }),
     });


     const data = await result.json();
     const reply = data.choices[0].message.content;


     console.log('OpenAI Response:', reply);
     const eventData = JSON.parse(reply); 


     console.log('Extracted Event Data:', eventData);


    


     const event = {
       'summary': eventData.summary,
       'location': eventData.location,
       'start': {
         'dateTime': eventData.start,
         'timeZone': 'America/Los_Angeles',
       },
       'end': {
         'dateTime': eventData.end,
         'timeZone': 'America/Los_Angeles',
       },
       'recurrence': [
         'RRULE:FREQ=DAILY;COUNT=2'
       ],
       
     };
      
     

     console.log('outside insert')
     console.log(localStorage.getItem('token'));  // Ensure a token is present
      gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      }).then((response) => {
        console.log('Event created:', response.result.htmlLink);
        window.open(response.result.htmlLink); // Open the event link
      }).catch((error) => {
        console.error('Error creating event:', error);
      })
        
      return eventData;

   } catch (error) {
     console.error("Error response:", error);
   }
 };


 const change = event => {
   setVal(event.target.value);
 };


 return (
   <div>
     <input
       onChange={change}
       value={val}
       className="input"
     />
     <button className="button" onClick={click}></button>
   </div>
 );
}


export default Home;