import React from 'react'

export const TopBar = () => {
  return (
    <div className=' relative flex flex-row w-full h-fit p-[2px] bg-[#2B343B]' >
        <div className='flex flex-auto whitespace-nowrap overflow-scroll scrollbar-none  text-[#ffffff] w-fit pl-1 pr-2'>
          Organisation Name
        </div>
        <div className=' flex flex-none flex-row gap-2 pl-1 pr-1 text-[#ffffff]'>
          <div>Home</div>
          <div>Hanger</div>
          <div>Documentation</div>
          <div>User</div>
        </div>
    </div>
  )
}
