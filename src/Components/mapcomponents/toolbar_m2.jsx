import React from 'react';
import { BsGearFill, BsPin, BsArrowRepeat } from 'react-icons/bs';
import '../../App.css'
import { FaHands } from 'react-icons/fa';

export const ToolBar = (props) => {
    
    let mode = props.mode
    // console.log(mode)

    const ToolBarIcon = ({icon, text = 'tooltip 💡', eventElem="None",sno = -2, items=[]})=>{

        const SubMenuOption = ({item})=>
        {            
            return(<div className=' flex bg-slate-500 w-full h-fit items-center justify-center hover:bg-slate-400' onClick={(e)=>{ props.TBclickHandler(item.eventElem);  }}>{ item.name }</div>)
        }
        
        return(
            <div className={mode===sno ?'map-sidebar-icon-active group':'map-sidebar-icon group'} 
                onClick={(e)=>{ if(items.length===0){props.TBclickHandler(eventElem);}}}>
                {icon}
                <div className='map-sidebar-tooltip group-hover:scale-100 group-hover:z-50'>
                    { items.length===0?<></>:<span className=' flex flex-col overflow-scroll scrollbar-none p-2 gap-1 w-28 h-32 bg-slate-700'>
                        {items.map((i,k)=>{return <SubMenuOption item={i} key={k} /> })}
                    </span>}
                    <span className=' flex w-auto h-auto p-2 items-center justify-center bg-gray-900'>
                        {text}
                    </span>
                </div>
            </div>
        )
    };

    const SettingsAndMisc = ({icon, text = 'tooltip 💡', eventElem="None",sno = -2, items=[]})=>
    {

        return(
            <div className={mode===sno ?'map-sidebar-icon-active group':'map-sidebar-icon group'} >
                {icon}
                <div className='map-sidebar-tooltip bottom-13 group-hover:scale-100 group-hover:z-50 w-52 h-52'>
                    <div className=' m-2 p-2 border-2' onClick={()=>{props.toggleBlockingPopup(0,"go to")}}>
                        go to loc
                    </div>
                    <div className=' m-2 p-2 border-2' onClick={()=>{props.toggleBlockingPopup(1,"new m")}}>
                        new mission
                    </div>
                    <div className=' m-2 p-2 border-2' onClick={()=>{props.toggleBlockingPopup(2,"fetch m")}}>
                        fetch mission
                    </div>
                    <div className=' m-2 p-2 border-2' onClick={()=>{props.toggleBlockingPopup(3,"save m")}}>
                        save mission
                    </div>
                    <div className=' m-2 p-2 border-2' onClick={()=>{props.toggleBlockingPopup(4,"delete m")}}>
                        delete mission
                    </div>
                </div>
            </div>
        );

    }

    return(
    <div className='map-sidebar'>
        
        <ToolBarIcon icon={<FaHands size="22" />} eventElem='None' text='Settings'sno = {-1}/>
        <ToolBarIcon icon={<BsPin size="28" />} eventElem='NPL0' text='Waypoint' sno = {"NPL0"}/>
        {/* <Divider /> */}
        {/* <ToolBarIcon icon={<BsCircle size="32"/>} eventElem='NC0' text='Circle' sno = {2}/> */}
        {/* <ToolBarIcon icon={<BsHeptagon size="20"/>}  eventElem="polygon" text='Polygon' sno = {3} items={[{name:'New Polygon',eventElem:'NPG0'},{name:'Add Vertice',eventElem:'PG1'}]} /> */}
        {/* <ToolBarIcon icon={<BsSuitDiamondFill size="20" />} eventElem="NM0" text='Marker' sno = {4}/> */}
        {/* <Divider /> */}
        <ToolBarIcon icon={<BsArrowRepeat size="22" />} eventElem="FM" text='Refresh' sno = {5}/>
        {/* <ToolBarIcon icon={<BsGearFill size="22" />} eventElem="ST" text='Settings'sno = {6}/> */}
        <SettingsAndMisc icon={<BsGearFill size="22" />} eventElem="ST" text='Settings'sno = {6}/>

    </div>
  );
};
