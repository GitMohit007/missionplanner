import React from 'react';
import { useLocation } from "react-router-dom";
import './App.css';
import { MapArea } from './Components/mapcomponents/maparea_m2';

function App() 
{  

  let search = useLocation().search;
  let id=new URLSearchParams(search).get("mission_id");
  console.log('url param id : ',id);

  // console.log(id, name, type); 

  return (
      <div className=' relative flex flex-col w-[100vw] h-[100vh] bg-[#1e1e1e]'>
        <div className=' relative flex flex-row w-[100vw] h-full bg-[#1e1e1e] overflow-auto'>
          <div className=' relative flex overflow-clip w-full h-full bg-black'>            
            <MapArea/>
          </div>
        </div>
      </div>
  );

}

export default App;