import React from 'react';
import { BsGearFill, BsCircle, BsPin, BsArrowRepeat,BsSuitDiamondFill, BsHeptagon } from 'react-icons/bs';
import '../../App.css'
import { useState, useContext } from 'react';
import VectorLayerContext from '../Context/vectorLayers/vectorLayersContext'

export const SideBar = (props) => {
    
    const [mode, setmode] = useState(-1);
    const vlcontext = useContext(VectorLayerContext);
    const vectors = vlcontext.states.vectors
    
    const SideBarIcon = ({icon, text = 'tooltip 💡', eventElem="None",sno = -2})=>{
        return(
            <div className={mode===sno ?'map-sidebar-icon-active group':'map-sidebar-icon group'} 
                onClick={(e)=>{
                    if(mode===sno && eventElem!=='refresh')
                    {setmode(-1);props.modeSelector("None");}
                    else if(mode===sno &&eventElem==='refresh')
                    {props.modeSelector(eventElem);setmode(-1);}
                    else{setmode(sno);props.modeSelector(eventElem);}
                    }}>
                {icon}
                <span className='map-sidebar-tooltip group-hover:scale-100 group-hover:z-50'>
                    {text}
                </span>
            </div>
        )};

    return(
      <div className='map-sidebar'>
          <SideBarIcon icon={<BsPin size="28" />} eventElem="polyline" text='Waypoint' sno = {1}/>
          {/* <Divider /> */}
          <SideBarIcon icon={<BsCircle size="32"/>} eventElem="circle" text='Circle' sno = {2}/>
          <SideBarIcon icon={<BsHeptagon size="20"/>}  eventElem="polygon" text='Polygon' sno = {3}/>
          <SideBarIcon icon={<BsSuitDiamondFill size="20" />} eventElem="marker" text='Marker' sno = {4}/>
          {/* <Divider /> */}
          <SideBarIcon icon={<BsArrowRepeat size="22" />} eventElem="refresh" text='Refresh' sno = {5}/>
          <SideBarIcon icon={<BsGearFill size="22" />} eventElem="settings" text='Settings'sno = {6}/>
      </div>
  );
};
