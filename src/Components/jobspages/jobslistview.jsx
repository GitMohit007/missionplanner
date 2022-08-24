import React from 'react'
import { JobsLsTopbar } from './jobslstopbar'
// import droneicon from './resources/droneicon.png'

export const JobsListView = () => {
  const droneicon = require('./resources/droneicon.png')
  return (
  <div className=' relative flex flex-col gap-[2px] p-2 pt-1 w-full h-full overflow-scroll scrollbar-thin  bg-[#1E272E]'>
    <JobsLsTopbar/>
    <div className=' relative flex flex-col gap-1 h-full w-full rounded-md'>
      <div className=' relative flex flex-row gap-1 rounded-md w-full h-fit bg-[#2B343B]'>
        <div className=' relative min-h-[10%] min-w-[10%] max-h-[100%] max-w-[100%] bg-slate-400 p-1'>
          <img src={droneicon} alt='DroneImage' className=' relative h-[100%] w-[100%]' />
        </div>
        <div className=' relative h-[100%] w-[100%] bg-slate-400 p-1 whitespace-nowrap overflow-auto scrollbar-thin'>
          Tower_Survey
        </div>
        <div className=' relative h-[100%] w-[100%] bg-slate-400 p-1 whitespace-nowrap overflow-auto scrollbar-thin'>
          Created at:
        </div>
        <div className=' relative h-[100%] w-[100%] bg-slate-400 p-1 whitespace-nowrap overflow-auto scrollbar-thin'>
          DroneAssigned:
        </div>
        <div className=' relative h-[100%] w-[100%] bg-slate-400 p-1 whitespace-nowrap overflow-auto scrollbar-thin'>
          Pilots Assigned:
        </div>
        <div className=' relative h-[100%] w-[100%] bg-slate-400 p-1 whitespace-nowrap overflow-auto scrollbar-thin'>
          ClientCompany
        </div>
        <div className=' relative h-[100%] w-[100%] bg-slate-400 p-1 whitespace-nowrap overflow-auto scrollbar-thin'>
          Reminder
        </div>
        <div className=' relative h-[100%] w-[100%] bg-slate-400 p-1 whitespace-nowrap overflow-auto scrollbar-thin'>
          Status
        </div>
      </div>
    </div>
  </div>
  )
}
