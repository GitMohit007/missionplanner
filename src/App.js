import React from 'react';
import './App.css';
import { MapArea } from './Components/mapcomponents/maparea_m2';

function App() 
{  

  let queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  const name = queryParams.get('name');
  const type = queryParams.get('type');
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