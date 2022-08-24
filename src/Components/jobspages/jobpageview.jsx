import React , {useCallback, useState, useEffect} from 'react'
import DatePicker from 'react-date-picker';
import { Icon } from '@iconify/react';
import './jobspagedesign.css'


export const JobPageView = () => 
{
  
  const [edit, setedit] = useState(false);
  const cdate = new Date();
  const [sdate, sdateChange] = useState(new Date());
  const [edate, edateChange] = useState(new Date());

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

  const SelectDrone = ({show_}) =>
  {
    console.log(show_)
    
    return(
    <>
      {showpopup===1?
      <div className=' absolute w-full h-full bg-[#00000050] flex items-center justify-center'>
        <div className=' relative flex flex-col w-60 h-60 text-[#A0A4A6] font-bold bg-slate-500'>
          <div className=' relative flex w-full h-16 bg-slate-800'>
            <div className=' relative flex h-10 w-10 bg-slate-700 items-center justify-center' onClick={()=>{setshowpopup(0)}}>
              c
            </div>
          </div>
          <div>
            Drone1
          </div>
          <div>
            Drone2
          </div>
          <div>
            Drone3
          </div>
          <div>
            Drone4
          </div>
        </div>
      </div>:null}
      {showpopup===2?
      <div className=' absolute w-full h-full bg-[#00000050] flex items-center justify-center'>
        <div className=' relative flex flex-col w-60 h-60 text-[#A0A4A6] font-bold bg-slate-500'>
          <div className=' relative flex w-full h-16 bg-slate-800'>
            <div className=' relative flex h-10 w-10 bg-slate-700 items-center justify-center' onClick={()=>{setshowpopup(0)}}>
              c
            </div>
          </div>
          <div>
            Mp1
          </div>
          <div>
            Mp2
          </div>
          <div>
            Mp3
          </div>
          <div>
            Mp4
          </div>
        </div>
      </div>:null}
    </>
    )
  }
  
  return (
<>
  <div className=' job-body'>

    <div id='toolbar' className=' toolbar'>
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

    <div id='jobstatusrow' className=' relative flex h-36 w-[100%] bg-[#2a3035] rounded-md'>
      <div className=' relative flex flex-row h-full w-full gap-2 p-2 rounded-md'>
        
        <div className=' relative flex flex-col gap-1 h-full w-[55%]'>
          
          <div className=' relative flex h-full w-full gap-2 p-[2px] items-center overflow-auto scrollbar-none'>
            <button className=' relative text-xs h-10 w-fit p-1 px-2 rounded-md bg-[#1e272e] text-[#ffffff] hover:text-[#21d9b6] hover:bg-[#1e272e] '>
                  OPEN <br />
                  Delete <br />
                  Edit
            </button>
            <div className=' flex flex-row min-w-[7rem] w-[75%] h-full gap-2 items-center overflow-scroll scrollbar-thin'>
                <button className=' flex w-10 h-10 border-dashed border-[#141a1f] hover:border-black text-[#141a1f] hover:text-black border-2 rounded-full p-1 items-center'>
                    <Icon className=' h-full w-full ' icon="fluent:person-add-28-regular" />
                </button>
            </div>
            <div className=' bg-[#1E272E] seperator h-3/4'/>
            <div className=' flex flex-row min-w-[10rem] w-full h-full items-center overflow-scroll scrollbar-thin'>
                <button className=' font-roboto text-sm border-2 border-[#141a1f] text-[#ECF7F7] hover:text-[#a2aaaa] p-1 rounded-md'>
                  + Add Tags
                </button>
            </div>
          </div>

          <div className=' relative flex flex-row gap-1 h-full w-full p-1 overflow-auto scrollbar-none focus-within:overflow-visible '>
            
            <div className=' relative flex h-full w-full p-1 gap-1 items-center'>
              <div className=' bg-[#1E272E] seperator h-3/4'/>
              <div className=' relative flex flex-col'>
                <p className=' relative font-semibold text-[#828488] text-sm'>Created</p>
                <p className=' relative font-light text-xs text-[#a0a4a6] overflow-auto scrollbar-none whitespace-nowrap'>{ cdate.getDate()+'-'+cdate.getFullYear()+'-'+(cdate.getMonth()+1)+','+cdate.getHours()+":"+cdate.getMinutes()}</p>
              </div>
            </div>

            <div className=' relative flex overflow-scroll scrollbar-none h-full w-full p-1 gap-1 items-center'>
              <div className=' bg-[#1E272E] seperator h-3/4'/>
              <div className=' relative flex flex-col '>
                <p className=' relative font-semibold text-[#828488] text-sm'>Managed By</p>
                <p className=' relative w-full font-light text-xs text-[#a0a4a6] whitespace-nowrap'>Chitransh Srivastvaaaaaaa</p>
              </div>
            </div>

            <div className=' relative flex h-full w-full p-1 gap-1 items-center'>
              <div className=' bg-[#1E272E] seperator h-3/4'/>
              <div className=' relative flex flex-col'>
                <p className=' relative font-semibold text-[#828488] text-sm'>Start Date</p>
                <div className=' relative  text-xs text-[#a0a4a6]'>
                  <DatePicker onChange={sdateChange} format={"dd-MM-y"} calendarIcon={null} clearIcon={null} value={sdate} />
                </div>
              </div>
              <Icon className=' h-7 w-7 mr-1 text-[#a0a4a6]' icon="fluent:ios-arrow-rtl-24-filled" width={24}  />
              <div className=' relative flex flex-col'>
                <p className=' relative font-semibold text-[#828488] text-sm'>End Date</p>
                <div className=' relative text-[#a0a4a6] text-xs'>
                  <DatePicker onChange={edateChange} format={"dd-MM-y"} calendarIcon={null} clearIcon={null} value={edate} />
                </div>
              </div>
            </div>

          </div>

        </div>
        
        <div className=' bg-[#1E272E] seperator h-3/4'/>
        <div className=' relative flex h-full w-[45%] overflow-auto scrollbar-none'>
          <div className=' relative flex flex-col gap-1 h-full w-full '>
            
            <div className=' absolute flex justify-center items-center  z-50 top-0 right-0 h-5 w-5 bg-slate-200'>
                E
            </div>

            <div className=' relative flex h-[50%] w-full gap-1 overflow-auto scrollbar-none'>
              
              <div className=' flex flex-none gap-1 p-1 h-full w-fit'>
                <div className=' relative flex ml-1 w-10 h-10 bg-slate-800 items-center justify-center'>
                  L
                </div>
                <div className=' relative flex font-semibold text-[#a0a4a6] text-sm w-fit'>
                  Client Company Lt.d
                </div>
              </div>

              <div className=' bg-[#1E272E] seperator h-3/4'/>

              <div className=' flex flex-none flex-col p-1 h-full w-fit '>
               <div className=' relative w-fit flex text-[#828488] text-sm font-semibold'>
                  Project
                </div>
                <div className=' relative w-fit flex text-[#a0a4a6] text-sm '>
                  Ragnarokaaaaaaaaa
                </div>
              </div>

              <div className=' bg-[#1E272E] seperator h-3/4'/>

              <div className=' flex flex-none flex-col h-full w-fit p-1'>
               <div className=' relative w-fit flex text-[#828488] text-sm font-semibold'>
                  Reresentative
                </div>
                <div className=' relative w-fit flex text-[#a0a4a6] text-sm '>
                  Jhon Doe
                </div>
              </div>
            
            </div>

            <div className=' relative flex p-1 h-[50%] w-full overflow-auto scrollbar-none justify-center text-[#a0a4a6] border-[2px] border-[#828488]'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>

          </div>
        </div>
      </div>
    </div>

    <div id='jobdcp' className=' relative flex flex-row text-color1 bg-base-primarycolor h-36 p-2 rounded-md gap-2 items-center'>
      <div className=' jobdescription-icon'>
        <div className=' relative flex w-20 h-20 bg-slate-900 p-1 items-center justify-center '>
          J
        </div>
      </div>
      <div className=' bg-[#1E272E] seperator'/>
      <div className=' jobdescription-title'>Lorem, ipsum dolor {2}.</div>
      <div className=' bg-[#1E272E] seperator'/>
      <div className=' relative flex p-1 h-full w-full  text-color1 justify-center overflow-auto text-[#a0a4a6]'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est sapiente, officiis libero et blanditiis, soluta dolores alias voluptatem necessitatibus tempore totam, at ducimus architecto aperiam cum consequuntur doloremque rerum! Debitis dolore quae at iste placeat perspiciatis, laudantium adipisci aliquam ex saepe minima magni unde ut nisi pariatur nesciunt id ipsa.
      </div>
    </div>
    
    <div className=' dronerow'>

      <div className=' flex flex-row gap-2 overflow-auto scrollbar-none w-full h-full'>

        <div className=' relative h-36 w-44 flex flex-col flex-none items-center gap-1 p-2 rounded-lg bg-[#1e272e]'>
          <div className=' relative w-full font-semibold text-base'>Scirocco</div>
          <div className=' relative pl-2'>QUARDCOPTER</div>
          <div className=' relative w-fit h-fit p-1'>
            <img src={require('./resources/Drone_LIlY.png')} alt='DroneImage' className=' relative h-[100%] w-[100%]' />
          </div>
        </div>

        <div className=' relative h-36 w-60 flex flex-col flex-none items-center gap-1 p-2 rounded-lg  bg-[#1e272e]'>
          <div className=' relative flex font-semibold ml-1 w-full '> Drone </div>
          <div className=' relative flex w-full left-0 ml-1 text-xs'>
            READY TO FLY
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Payload
            </div>
            <div className=' relative flex justify-center items-center w-full'>
              4KG
            </div>
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Speed
            </div>
            <div className=' relative flex whitespace-nowrap justify-center items-center w-full'>
              30 m/s
            </div>
          </div>
        </div>

        <div className=' relative flex flex-col h-36 w-60 flex-none items-center gap-1 p-2 rounded-lg  bg-[#1e272e]'>
          <div className=' relative flex font-semibold ml-1 w-full'> Battery </div>
          <div className=' relative flex w-full left-0 ml-1 text-xs'>
            26 MINS FLYING
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Charge
            </div>
            <div className=' relative flex justify-center items-center whitespace-nowrap w-full'>
              3200 mAh
            </div>
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Discharge
            </div>
            <div className=' relative flex justify-center items-center w-full'>
              30 C
            </div>
          </div>
        </div>

        <div className=' relative flex flex-col h-36 w-60 flex-none items-center gap-1 p-2 rounded-lg  bg-[#1e272e]'>
          <div className=' relative flex font-semibold ml-1 w-full'> Motor </div>
          <div className=' relative flex w-full left-0 ml-1 text-xs'>
            P2505
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Props
            </div>
            <div className=' relative flex justify-center items-center w-full'>
              T6143
            </div>
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Thrust
            </div>
            <div className=' relative flex justify-center items-center whitespace-nowrap w-full'>
              1263 g
            </div>
          </div>
        </div>

        <div className=' relative flex flex-col w-60 flex-none items-center gap-1 p-2 rounded-lg  bg-[#1e272e]'>
          <div className=' relative flex font-semibold ml-1 w-full'> Camera </div>
          <div className=' relative flex w-full left-0 ml-1 text-xs'>
            SexyCameraModel
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Gimbal
            </div>
            <div className=' relative flex whitespace-nowrap justify-center items-center w-full text-xs'>
              sasta gimbal
            </div>
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Resolution
            </div>
            <div className=' relative flex justify-center items-center whitespace-nowrap w-full'>
              1080p
            </div>
          </div>
        </div>

        <div className=' relative flex flex-col w-60 h-36 flex-none items-center gap-1 p-2 rounded-lg  bg-[#1e272e]'>
          <div className=' relative flex font-semibold ml-1 w-full'> Comms </div>
          <div className=' relative flex w-full left-0 ml-1 text-xs'>
            TPLINK 9000
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Type
            </div>
            <div className=' relative flex justify-center items-center w-full'>
              WIFI
            </div>
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Freq
            </div>
            <div className=' relative flex justify-center items-center whitespace-nowrap w-full'>
              2.5 GHz
            </div>
          </div>
        </div>

        <div className=' relative flex flex-col w-60 h-36 flex-none items-center gap-1 p-2 rounded-lg  bg-[#1e272e]'>
          <div className=' relative flex font-semibold ml-1 w-full'> Comms </div>
          <div className=' relative flex w-full left-0 ml-1 text-xs'>
            SIM7600EI
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Type
            </div>
            <div className=' relative flex justify-center items-center w-full'>
              GPSM
            </div>
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Freq
            </div>
            <div className=' relative flex justify-center items-center whitespace-nowrap w-full text-xs'>
              4 G
            </div>
          </div>
        </div>

        <div className=' relative flex flex-col w-60 h-36 flex-none items-center gap-1 p-2 rounded-lg  bg-[#1e272e]'>
          <div className=' relative flex font-semibold ml-1 w-full'> Comms </div>
          <div className=' relative flex w-full left-0 ml-1 text-xs'>
            RX FLYSKY
          </div>
          <div className=' relative flex flex-row w-full gap-1'>
            <div className=' relative flex w-full left-0 ml-1'>
              Type
            </div>
            <div className=' relative flex justify-center items-center w-full'>
              Radio
            </div>
          </div>
        </div>

        <div className=' editbutton' onClick={()=>{setshowpopup(1)}}>
          Edit
        </div>

      </div>

    </div>

    <div className=' missionrow'>
      <div className=' relative flex flex-row gap-1 w-full h-full'>
        <div className=' relative flex flex-col bg-[#1d262d] rounded-md w-full h-88 gap-1 pr-2'>
          
          <div className=' relative flex flex-row-reverse gap-1 mt-1 ml-[2px] w-60 bg-[#2a3035] font-semibold rounded-r-md'>
             <div className=' relative flex w-fit h-fit mr-1 p-1 bg-slate-900' onClick={()=>{setshowpopup(2)}}>
              Ed
            </div>
            <div className=' relative flex items-center w-full ml-1'>
              Mission Data
            </div>
          </div>

          <div className=' flex  bg-base-primarycolor w-fit rounded-r-md p-1 '>
            <div className=' flex gap-1 items-center rounded-md bg-[#1d262d] w-60'>
              <div className=' flex flex-row ml-2 '>
                Alias
              </div>
              <div className=' bg-[#000000] seperator h-3/4'/>
              <div>
                Chetzimoka
              </div>
            </div>
          </div>

          <div className=' flex  bg-base-primarycolor w-fit rounded-r-md p-1 '>
            <div className=' flex gap-1 items-center rounded-md bg-[#1d262d] w-60'>
              <div className=' flex flex-row ml-2 '>
                Configuration
              </div>
              <div className=' bg-[#000000] seperator h-3/4'/>
              <div>
                Photogrammetry
              </div>
            </div>
          </div>

          <div className=' flex  bg-base-primarycolor w-fit rounded-r-md p-1 '>
            <div className=' flex gap-1 items-center rounded-md bg-[#1d262d] w-full pr-2'>
              <div className=' flex flex-row ml-2 '>
                Description
              </div>
              <div className=' bg-[#000000] seperator h-3/4'/>
              <div className=' relative flex p-1 h-20 w-full  text-color1 justify-center overflow-auto '>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Est sapiente, officiis libero et blanditiis, soluta dolores alias voluptatem necessitatibus tempore totam, at ducimus architecto aperiam cum consequuntur doloremque rerum! Debitis dolore quae at iste placeat perspiciatis, laudantium adipisci aliquam ex saepe minima magni unde ut nisi pariatur nesciunt id ipsa.
              </div>
            </div>
          </div>

          <div className=' flex h-[1px] w-full self-center bg-black m-1'/>

          <div className=' flex flex-col w-fit h-fit p-1 rounded-r-md bg-base-primarycolor'>
            
            <div className=' flex ml-2 font-semibold'>
              Metrics
            </div>
            
            <div className=' flex flex-col w-full h-full pt-1'>
              <div className=' flex flex-row gap-1 w-full'>

                <div className=' flex flex-row gap-1 bg-[#1d262d] rounded-md p-1'>
                  <div className=' flex'>
                    Distance
                  </div>
                  <div className=' bg-[#000000] self-center seperator h-3/4'/>
                  <div>
                    1000 m 
                  </div>
                </div>

                <div className=' flex flex-row gap-1 bg-[#1d262d] rounded-md p-1'>
                  <div className=' flex'>
                    Waypoint
                  </div>
                  <div className=' bg-[#000000] self-center seperator h-3/4'/>
                  <div>
                    1000 m 
                  </div>
                </div>

                <div className=' flex flex-row gap-1 bg-[#1d262d] rounded-md p-1'>
                  <div className=' flex'>
                    POIs
                  </div>
                  <div className=' bg-[#000000] self-center seperator h-3/4'/>
                  <div>
                    10 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=' flex flex-col bg-[#1d262d] rounded-md w-full h-88'>
          Map
        </div>
      </div>
    </div>

    <div className=' personnelrow'>
      <div className=' flex flex-row gap-2 overflow-auto scrollbar-none w-full h-full'>
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

    {/* <div className=' w-full h-full bg-slate-900'>
      Mission
    </div> */}

  </div>
  <SelectDrone show_={showpopup}/> 
</>
  )
}
