import React , {useCallback, useState, useEffect} from 'react'
import { Icon } from '@iconify/react';
import './jobspagedesign.css'


export const JobPageView = () => 
{
  
  const [edit, setedit] = useState(false)

  const [jobState, setjobState] = useState({
    job : { id:'',info:{icon:'',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est sapiente, officiis libero et blanditiis, soluta dolores alias voluptatem necessitatibus tempore totam, at ducimus architecto aperiam cum consequuntur doloremque rerum! Debitis dolore quae at iste placeat perspiciatis, laudantium adipisci aliquam ex saepe minima magni unde ut nisi pariatur nesciunt id ipsa.',
             managedby:' Jhon Doe ', reminders:[{id:'1',stime:'',etime:'03.04.2022'}]}}, 
    cc:[{id:'moho'},{id:'nigga'},{id:'maga'}],
    tags:{},
    client: { namme:'', rep:{}},
    project: {},
    files:{}
  })

  const [droneState, setdroneState] = useState({
    id:'',
    drone : { name:'', type:''},
    meta : { icon:''},
    modules : {
      battery:{},
      motors:{},
      camera:{},
      comms:{}
    }
  })

  const [missionState, setmissionState] = useState({
    name : '',
    info : { description:'', config:{} },
    metrics : {},
    missiondata : {},
  })

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [pilotState, setpilotState] = useState({

  })

  const [showpopup, setshowpopup] = useState(0)

  const PopUp = ({show_}) =>
  {
    console.log(show_)
    
    return(
    <>
      {showpopup===1?
      <div className=' absolute w-full h-full bg-[#00000050] flex items-center justify-center'>
      <div className=' text-[#A0A4A6] font-bold bg-slate-500' onClick={()=>{setshowpopup(0)}}>
        PopUp
      </div>
    </div>:null}
    </>
    )
  }

  const dronecard = useCallback(
    () => {
      return(
        <div>
          di
        </div>
      )
    },
    [],
  )
  
  return (
  <div className=' jobview-body'>
    <div className=' job-body'>
        <div className=' toolbar'>
            <button className=' button-basic'>
            Close
            </button>
            <button className=' button-basic'>
            Delete
            </button>
            <button className=' button-basic'>
            Edit
            </button> 
        </div>
        <div className=' jobstatusrow'>
            <div className=' relative flex flex-row min-w-fit max-w-[50%] gap-1 '>
            <div className=' flex flex-col gap-2'>
                <div className=' relative flex gap-2'>
                <button className=' button-basic'>
                    OPEN
                </button>
                <div className=' flex flex-row gap-2 items-center'>
                    <button className=' flex w-10 h-10 border-dashed border-[#364754] hover:border-[#1E272E] text-[#364754] hover:text-[#1E272E] border-2 rounded-full p-1 items-center'>
                        <Icon className=' h-full w-full ' icon="fluent:person-add-28-regular" />
                    </button>
                    <div className=' bg-[#1E272E] seperator h-full'/>
                </div>
                <div className=' flex flex-row items-center'>
                    <button className=' font-roboto text-sm border-2 border-[#1E272E] text-[#ECF7F7] hover:text-[#a2aaaa] p-1 rounded-md'>
                    + Add Tags
                    </button>
                </div>
                </div>
                <div className=' relative flex flex-row h-fit gap-2'>
                <div className=' relative flex flex-row h-full gap-1 p-1'>
                    <div className=' bg-[#1E272E] seperator h-full'/>
                    <div className=' relative flex flex-col w-fit'>
                    <div className=' relative flex h-fit w-fit text-sm'>
                        Created
                    </div>
                    <div className=' relative flex h-fit w-fit text-xs pl-2'>
                        + {'10/12/2022'}
                    </div>
                    </div>
                </div>
                <div className=' relative flex flex-row h-full gap-1 p-1'>
                    <div className=' bg-[#1E272E] seperator h-full'/>
                    <div className=' relative flex flex-col w-fit'>
                    <div className=' relative flex h-fit w-fit text-sm'>
                        Managed By
                    </div>
                    <div className=' relative flex h-fit w-fit text-xs pl-2'>
                        Jhon
                    </div>
                    </div>
                </div>
                <div className=' relative flex flex-row h-full gap-1 p-1'>
                    <div className=' bg-[#1E272E] seperator h-full'/>
                    <div className=' relative flex flex-col w-fit'>
                    <div className=' relative flex h-fit w-fit text-sm'>
                        Reminders
                    </div>
                    <div className=' relative flex h-fit w-fit text-xs p-[2px] border-[2px] border-[#1E272E] rounded-md'>
                        RM1
                    </div>
                    </div>
                </div>

                </div>
            </div>
            <div className=' bg-[#1E272E] seperator h-full mx-1'/>
            </div>
            <div className=' relative flex w-[50%]'>
            <div>
                <input type="text" defaultValue={'ClientComp'}  className=' bg-transparent' />  {/*add robust selection features for better filtering and such (eg: dropdown */}
            </div>
            <div>
                Project <br />
                <input type="text" defaultValue={'Project'} className=' bg-transparent'  /> {/*add robust selection features for better filtering and such (eg: dropdown )*/}
            </div>
            <div>
                Representatives
            </div>
            </div>
        </div>
        <div className=' jobdescriptionrow'>
            <div className=' jobdescription-icon'>Icon</div>
            <div className=' bg-[#1E272E] seperator'/>
            <div className=' jobdescription-title'>Lorem, ipsum dolor {2}.</div>
            <div className=' bg-[#1E272E] seperator'/>
            <div className=' jobdescription-descrip'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est sapiente, officiis libero et blanditiis, soluta dolores alias voluptatem necessitatibus tempore totam, at ducimus architecto aperiam cum consequuntur doloremque rerum! Debitis dolore quae at iste placeat perspiciatis, laudantium adipisci aliquam ex saepe minima magni unde ut nisi pariatur nesciunt id ipsa.</div>
        </div>
        <div className=' dronerow'>
            <div className=' dronecard'>
            <div className=' font-semibold text-base'>Scirocco</div>
            <div className=' pl-2 text-xs'>QUARDCOPTER</div>
            <div className=' p-1'>
            <img src={require('./resources/Drone_LIlY.png')} alt='DroneImage' className=' relative h-[100%] w-[100%]' />
            </div>
            <div>actionIcons</div>
            <div>Status</div>
            </div>
            <div className=' relative flex items-center gap-1 p-2 rounded-lg  bg-[#1e272e]'>
            {2}
            </div>
            <div className=' editbutton' onClick={()=>{setshowpopup(1)}}>
            Edit
            </div>
        </div>
        <div className=' missionrow'>
            <div className=' relative flex flex-row gap-2 h-60'>
            <div className=' relative flex items-center justify-center h-full w-full bg-slate-800 rounded-md'>
                Mission and Map : { 1 } <br />
                Add Map Leaflet here

            </div>
            <div>
            </div>
            </div>
        </div>
        <div className=' personnelrow'>
            <div className=' relative flex p-2 rounded-md h-32 w-fit bg-[#1e272e]'>
            <div className=' relative rounded-l-md overflow-clip bg-white'>
                <img src={require('./resources/fred.jpg')} alt='DroneImage' className=' w-full h-full' />
            </div>
            <div className=' relative flex flex-col gap-1'>
                <div className=' relative flex flex-row gap-1 bg-[#2b343b] p-1 rounded-r-md'>
                <div className=' relative flex flex-row gap-1 p-1 rounded-md bg-[#1e272e] text-sm font-roboto'>
                    <div className=' relative p-[2px] font-semibold'> ID </div>
                    <div className=' bg-[#2b343b] seperator h-full self-center'/>
                    <div className=' relative p-[2px]'> OG </div>
                </div>
                <div className=' relative flex flex-row gap-1 p-1 rounded-md bg-[#1e272e] text-sm'>
                    <div className=' relative p-[2px] font-semibold'> Alias </div>
                    <div className=' bg-[#2b343b] seperator h-full self-center'/>
                    <div className=' relative p-[2px]'> Fred Jhonson </div>
                </div>
                </div>
                <div className=' relative flex flex-row gap-1 bg-[#2b343b] p-1 rounded-r-md'>
                <div className=' relative flex flex-row gap-1 p-1 rounded-md bg-[#1e272e] text-sm font-roboto'>
                    <div className=' relative p-[2px] font-semibold'> Designation </div>
                    <div className=' bg-[#2b343b] seperator h-full self-center'/>
                    <div className=' relative p-[2px] text-[#1cb396]'> Manager </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className=' filesrow'>
            <div className=' relative flex flex-col h-20 '>
            <div className=' relative flex flex-row p-2 h-full overflow-scroll scrollbar-none'>          
                <div className=' relative flex flex-row flex-none gap-2 border-[1px] border-black w-fit h-full p-1 rounded-md'>
                    <img src={require('./resources/fileicon.png')} alt='DroneImage' className=' relative h-[100%] w-[100%]' />
                    <div className=' relative flex pr-2 items-center text-white text-sm'>
                    TowerScan
                    </div>
                </div>
            </div>
            <div className=' flex h-fit text-sm pt-1 border-t-[2px] border-[#000000] justify-center'>
                Drop files here
            </div>
            </div>
        </div>

    </div>
    <PopUp show_={showpopup}/> 
  </div>
  )
}

// <div className=' relative flex flex-row gap-1 w-fit whitespace-nowrap scrollbar-none bg-slate-600'>
//                 <div className=' relative flex ml-1 w-fit'>
//                   L
//                 </div>
//                 <div className=' relative flex font-semibold text-sm w-fit'>
//                   Client Company Lt.d
//                 </div>
//               </div>
//               <div className=' bg-[#1E272E] seperator h-1/2'/>
//               <div className=' relative w-fit flex flex-col bg-slate-600 overflow-clip'>
//                 <div className=' relative w-fit flex text-sm font-semibold'>
//                   Project
//                 </div>
//                 <div className=' relative w-fit flex text-sm '>
//                   Ragnarokaaaaaaaaa
//                 </div>
//               </div>
//               <div className=' relative w-fit flex flex-col bg-slate-600 overflow-clip'>
//                 <div className=' relative w-fit flex text-sm font-semibold'>
//                   Project
//                 </div>
//                 <div className=' relative w-fit flex text-sm '>
//                   Ragnarokaaaaaaaaa
//                 </div>
//               </div>