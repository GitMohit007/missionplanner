import React from 'react'

export const JobsLsTopbar = () => {
  return (
    <div className=' flex flex-row w-full h-fit bg-[#2B343B] rounded-t-md overflow-clip' >
      <div className='flex flex-row bg-[#2B343B] text-[#ffffff] w-[20%] pr-2'>
        <div className=' flex flex-row w-full border-r-[1px] border-[#000000] text-[#7E8185] p-1 text-sm'> D SearchTask  </div>
      </div>
      <div className=' flex flex-row w-[80%] h-full gap-2 text-[#ffffff] '>
      <div className=' flex flex-nowrap text-justify whitespace-nowrap w-[85%] p-1 text-[#7E8185] '>Filter</div>
      <div className=' flex flex-nowrap text-justify text-sm whitespace-nowrap w-fit p-1 text-blue-500'>+ Add Task</div>
      </div>
    </div>
  )
}
