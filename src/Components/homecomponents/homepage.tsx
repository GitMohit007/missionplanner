import React,{ useRef } from 'react'
import './homepage.css'
import { ButtonDrawer } from './buttondrawer/buttondrawer.jsx'

export const HomePage = () => {

  const homejobsref = useRef({jobs:{},drones:{},pilots:{},todo:{}})

  const testfunct = ()=>
  {
    return JSON.stringify(homejobsref.current);
  }


  return (
    <div id='pagebody' className='pagebody'>
        <div id='homecontent' className="flex flex-row gap-4 p-4 bg-[#1E272E] w-[100%]">
        <div id='cl1' className="flex flex-col w-[15%] h-full gap-2 rounded-md drop-shadow ">
          <ButtonDrawer/>
          <div id='todolist' className=' relative flex flex-col flex-nowrap rounded-md h-full gap-[2px] border-[2px] bg-[#1E272E] '>
                <div className=' relative flex flex-none rounded-t-md w-full h-fit p-1 pl-2 bg-[#2B343B] text-[#ffffff] drop-shadow'>
                  Things to do
                </div>
                <div className=' flex flex-col flex-nowrap overflow-y-auto gap-[2px] relative'>
                  <div className=' relative flex h-[100%] p-1 pl-2 bg-[#2B343B] text-[#ffffff]'>
                    02.1
                  </div>
                  <div className='flex h-[100%] p-1 pl-2  bg-[#2B343B] text-[#ffffff]'>
                    02.1
                  </div>
                  <div className='flex h-[100%] p-1 pl-2 bg-[#2B343B] text-[#ffffff]'>
                    02.1
                  </div>
                  <div className='flex h-[100%] p-1 pl-2  bg-[#2B343B] text-[#ffffff]'>
                    02.1
                  </div>
                </div>
          </div>
        </div>
        <div id='cl2' className=" relative flex flex-col gap-4 w-[85%] rounded-md bg-[#1E272E]">
          <div id='cl2r1' className='relative flex flex-row h-[80%] gap-4 text-[#ffffff]'>
            <div id='cl2r1cl1' className=' relative flex flex-col gap-4 w-[65%]'>
              <div id='jobslist' className=' relative flex flex-col flex-nowrap border-2 rounded-md h-[40%] gap-[2px] bg-[#1E272E] drop-shadow'>
                <div className=' relative flex flex-none  w-full h-fit p-1 pl-2 bg-[#2B343B] text-[#ffffff]'>
                  Active | Recent Jobs
                </div>
                <div className=' relative flex flex-col flex-nowrap overflow-y-auto gap-[2px]'>
                  <div className=' relative flex h-[100%] p-1 pl-2 bg-[#2B343B] text-[#ffffff]'>
                    02.1
                  </div>
                  <div className=' relative flex h-[100%] p-1 pl-2  bg-[#2B343B] text-[#ffffff]'>
                    02.1
                  </div>
                  <div className=' relative flex h-[100%] p-1 pl-2 bg-[#2B343B] text-[#ffffff]'>
                    02.1
                  </div>
                  <div className=' relative flex h-[100%] p-1 pl-2  bg-[#2B343B] text-[#ffffff]'>
                    02.1
                  </div>
                </div>
              </div>
              <div id='dronelist' className=' relative flex flex-col h-[60%] border-[2px] bg-[#2B343B] drop-shadow'>
                Drone List <br /> 
                {
                  testfunct()
                }
              </div>
            </div>
            <div id='cl2r1cl2' className='relative flex flex-col w-[35%] gap-4 bg-[#1E272E] drop-shadow'>
              <div id='weather' className='relative flex border-[2px] h-[40%] bg-[#2B343B] drop-shadow'>Weather</div>
              <div id='pilotlist' className='relative flex border-[2px] h-[60%] bg-[#2B343B] drop-shadow'>Pilot List</div>
            </div>
          </div>
          <div id='cl2r2' className=' relative flex flex-col flex-nowrap border-2 rounded-md h-[35%] gap-[2px] bg-[#1E272E] drop-shadow'>      
            <div className=' relative flex flex-none  w-full h-fit p-1 pl-2 bg-[#2B343B] text-[#ffffff]'>
                Jobs FileSystem Photogrametry Data | Maps | Job Details
            </div>
            <div className=' relative flex flex-col flex-nowrap overflow-y-auto gap-[2px]'>
              <div className=' relative flex h-[100%] p-1 pl-2 bg-[#2B343B] text-[#ffffff]'>
                02.12
              </div>
              <div className=' relative flex h-[100%] p-1 pl-2  bg-[#2B343B] text-[#ffffff]'>
                02.12
              </div>
              <div className=' relative flex h-[100%] p-1 pl-2 bg-[#2B343B] text-[#ffffff]'>
                02.12
              </div>
              <div className=' relative flex h-[100%] p-1 pl-2  bg-[#2B343B] text-[#ffffff]'>
                02.12
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
