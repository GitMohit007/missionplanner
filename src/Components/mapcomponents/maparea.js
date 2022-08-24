import React, { useState,useRef, useContext } from 'react';
import { MapAreaLeaflet } from './leafletcomponents/maparea_leaflet';
import { SideBar } from './sidebar';
import { VectorCards } from './vectorcards';
import VectorLayerContext from '../Context/vectorLayers/vectorLayersContext'


export const MapArea = () => {

    const vlcontext = useContext(VectorLayerContext);
    const [mode,setmode] = useState('None');
    const moderef = useRef('None');
    const center = [51.505, -0.09];
    const [vectors,setvectors] =   useState(vlcontext.states.vectors)
    const modeSelector = (mode_)=>
    {
        if(mode_ === 'refresh')
        {
            vlcontext.fncts.refresh()
            setmode('None')
        } 
        else
        {
            setmode(mode_);
        }
    }

    return (
    <div className='relative flex w-full h-full '>
            <MapAreaLeaflet center = {center} mode={mode} vectorls= {vectors}/>
            <VectorCards />
            <SideBar modeSelector = {modeSelector} moderef={moderef}/>
    </div>

    );
};
