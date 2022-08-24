import React from 'react';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';
import './sidebarstyles.css'

const SideBarIcon = ({icon, text = 'tooltip 💡'})=>(
    <div className='sidebar-icon group'>
        {icon}

        <span className='sidebar-tooltip group-hover:scale-100 group-hover:z-50'>
            {text}
        </span>
    </div>
);
const Divider = () => <hr className="sidebar-hr" />;
export const SideBar = () => {
  return(
      <div className=' relative h-full w-16 flex flex-none flex-col bg-[#333333] text-white shadow-lg'>
          <SideBarIcon icon={<FaFire size="28" />} />
          <Divider />
          <SideBarIcon icon={<BsPlus size="32" />} />
          <SideBarIcon icon={<BsFillLightningFill size="20" />} />
          <SideBarIcon icon={<FaPoo size="20" />} />
          <Divider />
          <SideBarIcon icon={<BsGearFill size="22" />} />
      </div>
  );
};
