import React, {useCallback } from 'react';
import './mapleaflet.css'
import { AddMarker, AddCircle, AddPolygon, AddPolyline } from './vectors_m2';
import { MapContainer, TileLayer,useMapEvents,} from 'react-leaflet';


export const MapAreaLeaflet = ({center,setMap, zoom, vectorLayers, ClickHandler, UpdateVector, modeSelector}) => 
{
  
  const ClickEvent = () =>
  {
    const map_ = useMapEvents({
      click(e)
      {
        ClickHandler(e.latlng);
      },
      dblclick(e)
      {
        map_.flyTo(e.latlng, map_.getZoom())
      }
    })
    return <></>;
  } 
  
  const MarkerFactory = useCallback(
    () => 
    {
      let vl = Object.keys(vectorLayers.markers).map((k)=>
      {
        let vector = vectorLayers.markers[k]
        return(<AddMarker vector_={vector} UpdateVector={UpdateVector} key={k} modeSelector={modeSelector} />)
      })
      // console.log(mvl);
      return vl
  },
  [],
  )
  
  const CircleFatory = useCallback(
    () => 
    {
      let vl = Object.keys(vectorLayers.circles).map((k)=>
      {
        let vector = vectorLayers.circles[k]
        return(<AddCircle vector_={vector} UpdateVector={UpdateVector} key={k} modeSelector={modeSelector} />)
      })
      return vl
  },
  [],
  )

  const PolygonFatory = useCallback(
    () => 
    {
      let vl = Object.keys(vectorLayers.polygons).map((k)=>
      {
        let vector = vectorLayers.polygons[k];
        return(<AddPolygon vector_={vector} UpdateVector={UpdateVector} key={k} modeSelector={modeSelector} />)
      })
      return vl
  },
  [],
  )

  const PolylineFatory = useCallback(
    () => 
    {
      let vl = Object.keys(vectorLayers.polylines).map((k)=>
      {
        let vector = vectorLayers.polylines[k];
        return(<AddPolyline vector_={vector} UpdateVector={UpdateVector} key={k} modeSelector={modeSelector} />)
      })
      return vl
  },
  [],
  )


  return(
    <div className='relative flex z-30 w-full h-full'>
        <MapContainer className=' relative' center={center} zoom={zoom} minZoom={2}  scrollWheelZoom={true} doubleClickZoom={false} >
          <TileLayer  url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" attribution='&copy; <a href="http://mt1.google.com">GoogleMap</a> contributors'/>
          <ClickEvent/>
          <MarkerFactory/>
          <CircleFatory/>
          <PolygonFatory/>
          <PolylineFatory/>
        </MapContainer>
    </div>
  );
}