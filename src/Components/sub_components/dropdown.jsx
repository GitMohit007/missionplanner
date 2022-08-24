import React from 'react'
import { useState, useEffect } from 'react';
import './sub_components.css'
import { FaAngleUp,FaAngleDown} from 'react-icons/fa'


export const DropDownT1 = (props) => 
{

    const [active, setactive] = useState(false)
    const [mode, setmode] = useState('')

    useEffect(() => {
        props.typeSelection(mode)
    }, [mode,])
    
    return (
        <div className='dropdown'>
            <div className='dropdown-label text-[#A0A4A6] font-mono items-center'>
                <p className='p-[0.25px] basis-3/4 w-full text-center align-middle'>{mode===''?'--':mode}</p>
                <div className='separator-vertical'/>
                <button className=' p-[0.25px]' onClick={()=>{setactive(!active)}}>{active?<FaAngleUp size="14" />:<FaAngleDown size="14" />}</button>
            </div>
            { active?
                <div className='dropdown-panel border-b-[1px] border-r-[1px] border-l-[1px]  h-fit'>
                    {props.elems.map((elem)=>{
                        return <button className='dropdown-element hover:bg-slate-400/30 text-[#A0A4A6] font-mono h-40' key = {elem} onClick={()=>{setmode(elem);setactive(!active)}}>{elem}</button>
                    })}
                </div>:
                <div className='dropdown-panel h-0'/>  
            }
        </div>
    )
}

//  --------------------------------------  -------------------  --------------------

export const DropDownT2 = (props) => {

    const [type, settype] = useState(props.elems[0])
    const [active, setactive] = useState(false)

    useEffect(() => {
        if(typeof props.eventhandler !== 'undefined' && props.eventhandler !== 'null')
            props.eventhandler(props.title,type)
    
    }, [type])
    

    return (
        <div className=' relative flex flex-col w-fit'>
            <button className='  hover:bg-slate-400/30 flex items-center pl-1 pr-1' onClick={()=>{setactive(!active)}}> 
                {type}
                <div className='separator-vertical bg-[#A0A4A6] h-0'/>    
                {active?<FaAngleUp size="14" />:<FaAngleDown size="14" />}
            </button>                            
            { 
                active?
                <div className='dropdown-panel h-fit'>
                {   
                    props.elems.map((elem)=>
                    {
                        return <button className='dropdown-element hover:bg-slate-400/30 text-[#A0A4A6] font-mono h-fit' key = {elem} onClick={()=>{settype(elem);setactive(!active)}} >{elem}</button>
                    })
                }
                </div>:<div className='dropdown-panel h-0'/>
            }
        </div>
    )
  }