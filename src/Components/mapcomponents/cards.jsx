import React from 'react'
import '../../App.css'
import { DropDownT2 } from '../sub_components/dropdown'
import { useState, useContext } from 'react';


export const MissionDiscCard = (props) =>
{
    // let typesWaypoints  = ['Fly-by','Flyover','Hover','Hold']
    let vector = props.vector

    const updateattrs = (t,attr)=>
    {
        // let v = vector
        if(t==='edit')
        {
            vector.attrs.edit= attr 
        }
        else if(t==='flightspeed')
        {
            vector.attrs.flightspeed =  attr
        }
        else if(t==='dalt')
        {
            vector.attrs.default_alt =  attr
        }
        else if(t==='alt')
        {
            vector.coordinates.alt =  attr
        }
    }

    const toggleEdit = ()=>
    {
        if(props.vector.attrs.edit)
        {
            vector.attrs.edit = false
            props.setAttrs(vector)
        }
        else
        {
            vector.attrs.edit = true
            props.setAttrs(vector)
        }
    }


    return (
        <div className='card group'>
            <div className='card-header'>
                <div className='card-section'>
                    <div className='card-title'> 
                        {/* <p className=' text-[#A0A4A6] block bg-slate-800/0 pr-12'> {props.title}.</p> */}
                        <input className='text-[#A0A4A6] block bg-slate-800/0' defaultValue={props.title} type="text" readOnly={!props.vector.edit}/>
                    </div> 
                    <button className={props.vector.edit?'card-button self-end text-[#A0A4A6]':'card-button self-end text-[#A0A4A6] border-slate-600 '} onClick={()=>{toggleEdit()}}> {!props.vector.edit?'Edit':'Save'} </button>
                    <button className=' card-button self-end text-[#A0A4A6]' onClick={()=>{props.delAttrs(props.vector)}}> Delete </button>
                </div>
                <div className=' separator w-40'/>
                <div className='  card-label border-0 text-[#A0A4A6] font-mono items-center'>
                    <p className=' pl-1 pr-1 '>Type</p>
                    <div className='separator-vertical'/> 
                    <input className='card-label-input w-full ' defaultValue={props.vector.type} type="text" readOnly={!props.vector.edit}/>
                </div>
                <div className=' separator w-40'/>
                <div className=' separator w-0 '/>
                <div className=' card-section'>
                    <div className='  card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' pl-1 pr-1 '>Total Waypoints</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input' defaultValue='20' type="text" readOnly={!props.vector.edit}  onChange={(e)=>{updateattrs('flightspeed',Number(e.target.value))}} />
                        <p className=''>m/s</p>
                    </div>
                    <div className='  card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' pl-1 pr-1 '>Total Distance</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input' defaultValue='20' type="text" readOnly={!props.vector.edit}  onChange={(e)=>{updateattrs('dalt',Number(e.target.value))}} />
                        <p className=''>m</p>
                    </div>
                </div>
                <div className=' separator w-0 '/>
                <div className=' card-section'>
                    <div className='  card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' pl-1 pr-1 '>Time</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input' defaultValue='20' type="text" readOnly={!props.vector.edit}  onChange={(e)=>{updateattrs('flightspeed',Number(e.target.value))}} />
                        <p className=''>m/s</p>
                    </div>
                    <div className='  card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' pl-1 pr-1 '>POIs</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input' defaultValue='20' type="text" readOnly={!props.vector.edit}  onChange={(e)=>{updateattrs('dalt',Number(e.target.value))}} />
                        <p className=''>m</p>
                    </div>
                </div>
                <div> <p className=' text-sm text-[#A0A4A6]'>Description</p> </div>
                <div className=' separator w-40'/>
                <input className='card-label-input h-20 w-full ' defaultValue={props.vector.type} type="text" readOnly={!props.vector.edit}/>
            </div>
        </div>
    )
}

export const GeofenceCardPolygon = (props) => 
{

    const updateattrs = (t,attr)=>
    {
        let v = props.vector
        if(attr!=='' && attr!==null)
        if(t==='Inclusion')
        {
            v.attrs.inclusion = attr
        }
        if(t==='alt')
        {
            v.attrs.alt = attr
        }
        if(t==='edit')
        {
            props.vector.attrs.edit= attr;
        }
        props.setAttrs(v)
    }    

    const CoordsLs = (sno,latlng)=>
    {
        return(
            <div className=' card-label text-[#A0A4A6] font-mono space-x-1 w-fit'>
                <p className=' p-[0.25px]'>{sno}</p> 
                <div className='separator-vertical'/> <p className=' p-[0.25px]'>{latlng.lat} N {latlng.lng} E                 
                <input className='card-label-input ml-2' defaultValue='0' type="text" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('alt',e.target.value)}}/> m </p>
            </div> 
        )   
    }

  return (
    <div className='card'>
        <div className=' card-color-tag-geofence'/>
        <div className='card-header'>
            <div className='card-section'>
                <div className='card-title'> <p className=' flex-none text-[#A0A4A6]'>{props.sno}. {props.title} </p> </div> 
                <button className={props.vector.attrs.edit?'card-button self-end text-[#A0A4A6]':'card-button self-end text-[#A0A4A6] border-slate-600 '} onClick={()=>{updateattrs('edit',!props.vector.attrs.edit)}}> {!props.vector.attrs.edit?'Edit':'Save'} </button>
                <button className=' card-button self-end text-[#A0A4A6]' onClick={()=>{props.deleteVector('polygon',props.vector)}}> Delete </button>
            </div>
            <div className=' separator w-[8rem]'/>
            <div> <p className=' text-sm text-[#A0A4A6]'>{props.type}</p> </div>
            <div className=' separator w-[12rem]'/>            
            <button className={props.vector.attrs.inclusion?'card-button self-start text-[#A0A4A6]':'card-button self-start text-[#A0A4A6] border-slate-600 '} onClick={()=>{updateattrs('Inclusion',!props.vector.attrs.inclusion)}}> Inclusion </button>
            <div className=' separator w-[14rem]'/>
            <div> <p className=' text-sm text-[#A0A4A6]'>Breach Return Point</p> </div>
            <div className=' separator w-[16rem] '/>
            <div> <p className=' text-sm text-[#A0A4A6]'> {props.bpoint.lat} N {props.bpoint.lng} E
            <input className='card-label-input ml-2' defaultValue={props.bpoint.alt} type="text" readOnly={!props.vector.attrs.edit}  onChange={(e)=>{updateattrs('alt',e.target.value)}}  /> m</p> </div>
            {props.sno>0?
                <>
                <div className=' separator w-[0rem]'/>
                <div className=' card-section'>
                    <div className=' card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' text-sm text-[#A0A4A6]'>Color</p>
                        <div className='separator-vertical'/>
                        <input className='card-label-input ' defaultValue='#FF0000' type="color" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('color',e.target.value)}}  />
                    </div>
                </div></>:<></>}
        </div>
    </div>
  )
}

export const GeofenceCardCircle = (props) => 
{
    const [attrs, setattrs] = useState({id:props.sno,radius:props.radius,bpoint:{...props.bpoint},inclusion:props.inclusion,edit:props.edit})
    const [edit, setedit] = useState(false)

    const updateattrs = (t,attr)=>
    {
        let attrs_ = attrs
        if(attr!=='' && attr!==null)
            if(t==='Inclusion'){attrs_ = {...attrs,inclusion:attr}}
            if(t==='alt'){attrs_ = {...attrs_,latlngalt:{...attrs_.latlngalt,alt:attr}};}
            if(t==='edit'){attrs_ = {...attrs_,edit: attr};setedit(attr)}
            console.log('acc ',attrs_)
    }

    const editstate = (e)=>
    {
        setedit(e);
    }
    

    const CoordsLs = (sno,latlng)=>
    {
        return(
            <div className=' card-label text-[#A0A4A6] font-mono space-x-1 w-fit'>
                <p className=' p-[0.25px]'>{sno}</p> 
                <div className='separator-vertical'/> <p className=' p-[0.25px]'>{latlng.lat} N {latlng.lng} E                 
                <input className='card-label-input ml-2' defaultValue='0' type="text" readOnly={!edit} onChange={(e)=>{updateattrs('alt',e.target.value)}}/> m </p>
            </div> 
        )   
    }

  return (
    <div className='card'>
        <div className=' card-color-tag-geofence'/>
        <div className='card-header'>
            <div className='card-section'>
                <div className='card-title'> <p className=' flex-none text-[#A0A4A6]'>{props.sno}. {props.title} </p> </div> 
                <button className={edit?'card-button self-end text-[#A0A4A6]':'card-button self-end text-[#A0A4A6] border-slate-600 '} onClick={()=>{updateattrs('edit',!edit)}}> {!edit?'Edit':'Save'} </button>
                <button className=' card-button self-end text-[#A0A4A6]' onClick={()=>{}}> Delete </button>
            </div>
            <div className=' separator w-[8rem]'/>
            <div> <p className=' text-sm text-[#A0A4A6]'>{props.type}</p> </div>
            <div className=' separator w-[12rem]'/>            
            <button className={attrs.inclusion?'card-button self-start text-[#A0A4A6]':'card-button self-start text-[#A0A4A6] border-slate-600 '} onClick={()=>{updateattrs('Inclusion',!attrs.inclusion)}}> Inclusion </button>
            <div className=' separator w-[14rem]'/>
            <div> <p className=' text-sm text-[#A0A4A6]'>Breach Return Point</p> </div>
            <div className=' separator w-[16rem] '/>
            <div> <p className=' text-sm text-[#A0A4A6]'> {props.bpoint.lat} N {props.bpoint.lng} E
            <input className='card-label-input ml-2' defaultValue={props.bpoint.alt} type="text" readOnly={!edit}  onChange={(e)=>{updateattrs('alt',e.target.value)}}  /> m</p> </div>
            {props.sno>0?
                <>
                <div className=' separator w-[0rem]'/>
                <div className=' card-section'>
                    <div className=' card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' text-sm text-[#A0A4A6]'>Color</p>
                        <div className='separator-vertical'/>
                        <input className='card-label-input ' defaultValue='#FF0000' type="color" readOnly={!edit} onChange={(e)=>{updateattrs('color',e.target.value)}}  />
                    </div>
                </div></>:<></>}
        </div>
    </div>
  )
}

export const TakeOffCard = (props) => 
{
    // let typesWaypoints  = ['Fly-by','Flyover','Hover','Hold']
    let vector = props.vector

    const updateattrs = (t,attr)=>
    {
        // let v = vector
        if(t==='edit')
        {
            vector.attrs.edit= attr 
        }
        else if(t==='flightspeed')
        {
            vector.attrs.flightspeed =  attr
        }
        else if(t==='dalt')
        {
            vector.attrs.default_alt =  attr
        }
        else if(t==='alt')
        {
            vector.coordinates.alt =  attr
        }
    }

    const toggleEdit = ()=>
    {
        if(props.vector.attrs.edit)
        {
            vector.attrs.edit = false
            props.setAttrs(vector)
        }
        else
        {
            vector.attrs.edit = true
            props.setAttrs(vector)
        }
    }


    return (
        <div className='card group'>
            <div className=' card-color-tag bg-[#1BBC9C] group-hover:w-0'/>
            <div className='card-header'>
                <div className='card-section'>
                    <div className='card-title'> 
                        {/* <p className=' text-md text-[#A0A4A6] self-center mr-1'> {props.sno}.</p> */}
                        <p className=' text-[#A0A4A6] block bg-slate-800/0 pr-12'> {"Takeoff"}.</p>
                        {/* <input className='text-[#A0A4A6] block bg-slate-800/0' defaultValue='Takeoff' type="text" readOnly={!props.vector.attrs.edit}/> */}
                    </div> 
                    <button className={props.vector.attrs.edit?'card-button self-end text-[#A0A4A6]':'card-button self-end text-[#A0A4A6] border-slate-600 '} onClick={()=>{toggleEdit()}}> {!props.vector.attrs.edit?'Edit':'Save'} </button>
                    <button className=' card-button self-end text-[#A0A4A6]' onClick={()=>{props.delAttrs(props.vector)}}> Delete </button>
                </div>
                <div className=' separator w-40'/>
                <div> <p className=' text-sm text-[#A0A4A6]'>{"waypoint"}</p> </div>
                <div className=' separator w-0 '/>
                <div> <p className=' text-sm text-[#A0A4A6]'>Coordinates</p> </div>
                <div className=' separator w-40 '/>
                <div> <p className=' text-sm text-[#828488]'>{props.vector.coordinates.lat} N {props.vector.coordinates.lng} E <input className='card-label-input ml-2 pr-2' defaultValue={props.vector.coordinates.alt} type="text" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('alt',Number(e.target.value))}}/> m </p> </div>
                <div className=' separator w-0 '/>
                <div> <p className=' text-sm text-[#A0A4A6]'>Defaults</p> </div>
                <div className=' separator w-40'/>
                <div className=' separator w-0 '/>
                <div className=' card-section'>
                    <div className='  card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' pl-1 pr-1 '>Flight Speed</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input' defaultValue='20' type="text" readOnly={!props.vector.attrs.edit}  onChange={(e)=>{updateattrs('flightspeed',Number(e.target.value))}} />
                        <p className=''>m/s</p>
                    </div>
                    <div className='  card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' pl-1 pr-1 '>Altitude</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input' defaultValue='20' type="text" readOnly={!props.vector.attrs.edit}  onChange={(e)=>{updateattrs('dalt',Number(e.target.value))}} />
                        <p className=''>m</p>
                    </div>
                </div>
                {/* {props.sno>0?
                <>
                <div className=' separator w-[0rem]'/>
                <div className=' card-section'>
                    <div className=' card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' text-sm text-[#A0A4A6]'>Color</p>
                        <div className='separator-vertical'/>
                        <input className='card-label-input ' defaultValue='#FF0000' type="color" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('color',e.target.value)}}  />
                    </div>
                </div></>:<></>} */}
            </div>
        </div>
    )
}

export const WaypointCard = (props) => 
{
    // let typesWaypoints  = ['Fly-by','Flyover','Hover','Hold']
    let vector = props.vector
    let typesWaypoints  = ["waypoint", "loiter_turns", "loiter_time", "loiter_to_alt","loiter_unlim", "return_to_launch", "landing"]
    let frames = ['Relative','Absolute','Terrian']

    const updateattrs = (t,attr)=>
    {
        // let v = vector
        if(t==='edit')
        {
            vector.attrs.edit= attr 
        }
        if(t==='Type')
        {
            vector.attrs.type = attr
            props.setAttrs(vector)
        }
        else if(t==='TypeSA')
        {
            delete vector.attrs.count
            delete vector.attrs.time
            if(vector.attrs.type==="loiter_turns")
            {
                vector.attrs.count= attr
            }
            else if(vector.attrs.type==="loiter_time")
            {
                vector.attrs.time= attr
            }
        }
        else if(t==='Frame')
        {
            vector.attrs.frame = attr
        }
        else if(t==='yaw')
        {
            vector.attrs.yaw= attr
        }
        else if(t==='flightspeed')
        {
            vector.attrs.flightspeed =  attr
        }
        else if(t==='alt')
        {
            vector.coordinates.alt =  attr
        }
        else if(t==='radius')
        {
            vector.attrs.radius =  attr
        }
    }

    const toggleEdit = ()=>
    {
        if(props.vector.attrs.edit)
        {
            vector.attrs.edit = false
            props.setAttrs(vector)
        }
        else
        {
            vector.attrs.edit = true
            props.setAttrs(vector)
        }
    }


    return (
        <div className='card group'>
            <div className=' card-color-tag bg-[#3e8ed0] group-hover:w-0'/>
            <div className='card-header'>
                <div className='card-section'>
                    <div className='card-title'> 
                        <p className=' text-md text-[#A0A4A6] self-center mr-1'> {props.sno}.</p>
                        <p className=' text-[#A0A4A6] block bg-slate-800/0 pr-10'> {"Waypoint"}.</p>
                        {/* <input className='text-[#A0A4A6] block bg-slate-800/0' defaultValue='Waypoint' type="text" readOnly={!props.vector.attrs.edit}/> */}
                    </div> 
                    <button className={props.vector.attrs.edit?'card-button self-end text-[#A0A4A6]':'card-button self-end text-[#A0A4A6] border-slate-600 '} onClick={()=>{toggleEdit()}}> {!props.vector.attrs.edit?'Edit':'Save'} </button>
                    <button className=' card-button self-end text-[#A0A4A6]' onClick={()=>{props.delAttrs(props.vector)}}> Delete </button>
                </div>

                <div className=' separator w-[8rem]'/>

                <div> <p className=' text-sm text-[#A0A4A6]'>{props.vector.attrs.type}</p> </div>

                <div className=' separator w-[12rem]'/>

                <div> <p className=' text-sm text-[#A0A4A6]'>Coordinates</p> </div>

                <div className=' separator w-[16rem] '/>
                <div> <p className=' text-sm text-[#828488]'>{props.vector.coordinates.lat} N {props.vector.coordinates.lng} E 
                <input className='card-label-input ml-2' defaultValue={props.vector.coordinates.alt} type="text" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('alt',Number(e.target.value))}}/> m </p> </div>

                <div className=' separator w-[0rem] '/>

                <div className='card-section'>
                    <div className='  card-label text-[#A0A4A6] font-mono items-start pt-1'>
                        <p className=' pl-1 pr-1'>Type</p> 
                        <div className='separator-vertical'/>
                        <DropDownT2 title={'Type'} elems={typesWaypoints} eventhandler={updateattrs} span={0}/>
                        {
                            props.vector.attrs.type==="loiter_turns"?
                            <>
                                <div className='separator-vertical bg-[#A0A4A6]'/>
                                <p className=' pl-1 pr-1'>count</p> 
                                <input className='card-label-input' defaultValue='0' type="text" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('TypeSA',Number(e.target.value))}}/>
                            </>: props.vector.attrs.type==="loiter_time"?
                            <>
                                <div className='separator-vertical bg-[#A0A4A6]'/>
                                <p className=' pl-1 pr-1'>time</p>
                                <input className='card-label-input' defaultValue='0' type="text" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('TypeSA',Number(e.target.value))}}/>
                            </> :<></>
                        }
                        
                    </div>

                    <div className='  card-label text-[#A0A4A6] font-mono items-top pt-1'>
                        <p className=' pl-1 pr-1'>Frame</p> <div className='separator-vertical'/>
                        <DropDownT2 title={'Frame'} elems={frames} eventhandler={updateattrs} span={null}/>
                    </div>

                </div>   

                <div className=' separator w-[0rem]'/>

                {}

                <div className=' card-section'>
                    <div className='  card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' pl-1 pr-1 '>Flight Speed</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input' defaultValue='20' type="text" readOnly={!props.vector.attrs.edit}  onChange={(e)=>{updateattrs('flightspeed',Number(e.target.value))}} />
                        <p className=''>m/s</p>
                    </div>
                    <div className=' card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' p-[0.25px]'>Yaw</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input ' defaultValue='20' type="text" readOnly={!props.vector.attrs.edit}  onChange={(e)=>{updateattrs('yaw',Number(e.target.value))}}  />
                        <p className=''>deg</p>
                    </div>
                    <div className=' card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' p-[0.25px]'>Radius</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input ' defaultValue='20' type="text" readOnly={!props.vector.attrs.edit}  onChange={(e)=>{updateattrs('radius',Number(e.target.value))}}  />
                    </div>
                </div>
                {/* {props.sno>0?
                <>
                <div className=' separator w-[0rem]'/>
                <div className=' card-section'>
                    <div className=' card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' text-sm text-[#A0A4A6]'>Color</p>
                        <div className='separator-vertical'/>
                        <input className='card-label-input ' defaultValue='#FF0000' type="color" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('color',e.target.value)}}  />
                    </div>
                </div></>:<></>} */}
            </div>
        </div>
    )
}

export const LandingCard = (props) => 
{

    // let typesWaypoints  = ['Fly-by','Flyover','Hover','Hold']
    let vector = props.vector

    const updateattrs = (t,attr)=>
    {
        // let v = vector
        if(t==='edit')
        {
            vector.attrs.edit= attr 
        }
        else if(t==='flightspeed')
        {
            vector.attrs.flightspeed =  attr
        }
        else if(t==='dalt')
        {
            vector.attrs.default_alt =  attr
        }
        else if(t==='alt')
        {
            vector.coordinates.alt =  attr
        }
    }

    const toggleEdit = ()=>
    {
        if(props.vector.attrs.edit)
        {
            vector.attrs.edit = false
            props.setAttrs(vector)
        }
        else
        {
            vector.attrs.edit = true
            props.setAttrs(vector)
        }
    }


    return (
        <div className='card group'>
            <div className=' card-color-tag bg-[#a96300] group-hover:w-0'/>
            <div className='card-header'>
                <div className='card-section'>
                    <div className='card-title'> 
                        <p className=' text-[#A0A4A6] block bg-slate-800/0 pr-12'> {"Landing"}.</p>
                    </div> 
                    <button className={props.vector.attrs.edit?'card-button self-end text-[#A0A4A6]':'card-button self-end text-[#A0A4A6] border-slate-600 '} onClick={()=>{toggleEdit()}}> {!props.vector.attrs.edit?'Edit':'Save'} </button>
                    <button className=' card-button self-end text-[#A0A4A6]' onClick={()=>{props.delAttrs(props.vector)}}> Delete </button>
                </div>
                <div className=' separator w-40'/>
                <div> <p className=' text-sm text-[#A0A4A6]'>{"waypoint"}</p> </div>
                <div className=' separator w-0 '/>
                <div> <p className=' text-sm text-[#A0A4A6]'>Coordinates</p> </div>
                <div className=' separator w-40 '/>
                <div> <p className=' text-sm text-[#828488]'>{props.vector.coordinates.lat} N {props.vector.coordinates.lng} E 
                    {/* <input className='card-label-input ml-2 pr-2' defaultValue={props.vector.coordinates.alt} type="text" readOnly={!props.vector.attrs.edit} onChange={(e)=>{updateattrs('alt',Number(e.target.value))}}/> m  */}
                    </p> </div>
                <div className=' separator w-40'/>
                <div className=' separator w-0 '/>
                <div className=' card-section'>
                    <div className=' card-label text-[#A0A4A6] font-mono items-center'>
                        <p className=' p-[0.25px]'>Radius</p>
                        <div className='separator-vertical'/> 
                        <input className='card-label-input ' defaultValue='20' type="text" readOnly={!props.vector.attrs.edit}  onChange={(e)=>{updateattrs('radius',Number(e.target.value))}}  />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ROICard = (props) => 
{
const [edit, setedit] = useState(false)

return (
    <div className='card hover:h-36'>
        <div className=' card-color-tag-roi'/>
        <div className='card-header pr-2'>
            <div className='card-section'>
                <div className='card-title'> <p className=' flex-none text-[#A0A4A6]'>{props.sno}. {props.title} -ROI- </p> </div> 
                <button className={edit?'card-button self-end text-[#A0A4A6]':'card-button self-end text-[#A0A4A6] border-slate-600 '} onClick={()=>{setedit(!edit)}}> {!edit?'Edit':'Save'} </button>
                <button className=' card-button self-end text-[#A0A4A6]'> Delete </button>
            </div>
            <div className=' separator w-[12rem]'/>
            <div> <p className=' text-sm text-[#828488]'>{props.coords.lat} N {props.coords.lng} E {props.coords.alt} m </p> </div>
            <div className=' separator w-[16rem] '/>
            <div className='card-section'>
                <div className='card-title'> <p className=' flex-none text-[#A0A4A6]'>Cancle</p> </div> 
            </div>
            <div className=' separator w-[16rem] '/>
            <div> <p className=' text-sm text-[#828488]'>{props.coords_e.lat} N {props.coords_e.lng} E {props.coords_e.alt} m </p> </div>
            {/* {props.sno>0?
            <>
            <div className=' separator w-[0rem]'/>
            <div className=' card-section'>
                <div className=' card-label text-[#A0A4A6] font-mono items-center'>
                    <input className='card-label-input ' defaultValue='#FF0000' type="color" readOnly={!edit} onChange={(e)=>{updateattrs('color',e.target.value)}}  />
                    <p className=''>color</p>
                </div>
            </div></>:<></>} */}
        </div>
    </div>
)
}
