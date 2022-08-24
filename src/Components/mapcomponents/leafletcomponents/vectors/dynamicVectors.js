import {React} from 'react';
import { Popup,Polyline,Polygon,Marker,Circle,Tooltip } from 'react-leaflet';
import { useState,useMemo,useRef,useContext, useEffect} from 'react';
import VectorLayerContext from '../../../Context/vectorLayers/vectorLayersContext'
import GeometryUtil from 'leaflet-geometryutil';
import { divIcon } from 'leaflet';
import './vectors.css'
import 'leaflet.path.drag/src/Path.Drag'

const fillBlueOptions = { fillColor: 'blue' }
const blackOptions = { color: 'black' }
const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple' }
const redOptions = { color: 'red' }

export const AddPolyline = (props) => 
{
  const vlcontext = useContext(VectorLayerContext)
  const polylineref = useRef(null);
  let sno=0;
  console.log('vlcontextVL ',vlcontext.states.vectorlayers.current)


  const Point = ({latlng,id_})=>
  {
    const [dragable, setdragable] = useState(true)
    const markerRef = useRef(null)
    const id = id_;
    const [edit, setedit] = useState(vlcontext.states.vectors.polylines[props.sno].geometry.coordinates[id_].edit)
    let iconclass = edit?"pin-text-active":"pin-text-unactive"
    const polyIcon = divIcon({
      className: 'pin',
      html: '' ,
      iconSize: [25,25],
      iconAnchor: [12.5,25],
    });

    useEffect(() => {
      setedit(vlcontext.states.vectors.polylines[props.sno].geometry.coordinates[id_].edit)
    }, [vlcontext.states.vectors.polylines[props.sno]])
    
    const eventHandlers = useMemo(() => ({
      drag()
      { 
        if(markerRef.current!==null)
        {
          let mlatlng = markerRef.current.getLatLng()
          let coords = vlcontext.states.vectorlayers.current.polylines[props.sno].geometry.coordinates
          coords[id].lat = mlatlng.lat
          coords[id].lng = mlatlng.lng
          polylineref.current.setLatLngs(coords);
        }
      },
      dragend()
      { 
        let mlatlng = markerRef.current.getLatLng()
        let coords = vlcontext.states.vectorlayers.current.polylines[props.sno].geometry.coordinates
        coords[id].lat = mlatlng.lat
        coords[id].lng = mlatlng.lng
        coords[id].edit = true
        polylineref.current.setLatLngs(coords);
        vlcontext.fncts.setpolylatlngs('polyline',props.sno,coords);
      }
    }), [])
    return(
      <Marker draggable={edit} icon={polyIcon} eventHandlers={eventHandlers}  position={latlng} ref={markerRef}>
        <Popup minWidth={90} className='padding'>
          <span onClick={()=>{setdragable(!dragable)}}>{dragable? 'Marker is draggable': 'Click here to make marker draggable'}</span>
        </Popup>
      </Marker>
    )
  }

  return (
    <>
      <Polyline positions={vlcontext.states.vectorlayers.current.polylines[props.sno].geometry.coordinates} ref={polylineref}/>
      { vlcontext.states.vectorlayers.current.polylines[props.sno].geometry.coordinates.map((latlng)=>{return(<Point latlng={latlng} id_={sno} key={sno++}/> )}) }
    </>
  );
};


// -------------------------------------------    ---------------------------------------------------

export const AddPolygon = (props) => 
{

  const vlcontext = useContext(VectorLayerContext)
  const ref = useRef(null);
  const bref = useRef(null);
  let sno = 0
  const [edit, setedit] = useState(vlcontext.states.vectors.polygons[props.sno].properties.edit)
  const drawOptions = { color: 'purple' , fill: vlcontext.states.vectors.polygons[props.sno].properties.inclusion }
  

  useEffect(() => {
    console.log('inclusion DV plg',vlcontext.states.vectors.polygons[props.sno].properties.inclusion)
    setedit(vlcontext.states.vectors.polygons[props.sno].properties.edit)
  }, [vlcontext.states.vectors])
  

  const breachpEH = useMemo(() => 
  ({
    drag()
    { 
      if(bref.current!==null)
      {
        let mlatlng = bref.current.getLatLng()
        let properties = vlcontext.states.vectorlayers.current.polygons[props.sno].properties
        properties.bpoint.lat = mlatlng.lat
        properties.bpoint.lng = mlatlng.lng
      }
    },
    
    dragend()
    { 
      if (bref.current!==null)
      {
        let mlatlng = bref.current.getLatLng()
        let properties = vlcontext.states.vectorlayers.current.polygons[props.sno].properties
        properties.bpoint.lat = mlatlng.lat
        properties.bpoint.lng = mlatlng.lng
        properties.edit = true
        vlcontext.fncts.setpolylatlngs('polygon',props.sno,null,properties);
      }
    }
  }), [])
  
  const Point = ({latlng,id_})=>
  {
    const [dragable, setdragable] = useState(true)
    const markerRef = useRef(null)
    const id = id_;
    const eventHandlers = useMemo(() => ({
      drag()
      {
        console.log('...')
        if(markerRef.current!==null)
        {
          let mlatlng = markerRef.current.getLatLng()
          let coords = vlcontext.states.vectorlayers.current.polygons[props.sno].geometry.coordinates
          coords[id].lat = mlatlng.lat
          coords[id].lng = mlatlng.lng
          ref.current.setLatLngs(coords);
        }
      },
      moveend()
      { 
        console.log('...')
        if(markerRef.current!==null)
        {
          let mlatlng = markerRef.current.getLatLng()
          let coords = vlcontext.states.vectorlayers.current.polygons[props.sno].geometry.coordinates
          coords[id].lat = mlatlng.lat
          coords[id].lng = mlatlng.lng
          vlcontext.fncts.setpolylatlngs('polygon',props.sno,coords);
          ref.current.setLatLngs(coords);
        }
      }
    }), [])
    return(
      <>
      <Marker draggable={edit} eventHandlers={eventHandlers} position={latlng} ref={markerRef}>
        <Popup minWidth={90} className='padding'>
          <span onClick={()=>{setdragable(!dragable)}}>{dragable? 'Marker is draggable': 'Click here to make marker draggable'}</span>
        </Popup>
      </Marker>
      </>
    )
  }
  return (
    <>
      <Polygon pathOptions={drawOptions} draggable={true} positions={props.pos} ref={ref} >
        { vlcontext.states.vectorlayers.current.polygons[props.sno].geometry.coordinates.map((latlng)=>
        {
          return( <Point latlng={latlng} id_={sno} key={sno++}/> )}) 
        }
      </Polygon>
      <Marker draggable={edit} eventHandlers={breachpEH} position={vlcontext.states.vectorlayers.current.polygons[props.sno].properties.bpoint} ref={bref}></Marker>
    </>
  );
};


// -----------------------------------------------------------------------------------

export const AddMarker = (props) => {

  const [draggable, setdragable] = useState(true)
  const ref = useRef(null)
  const vlcontext = useContext(VectorLayerContext)
  const id = props.id_;

  const eventHandlers = useMemo(() => ({
    drag()
    {

    },
    moveend()
    { 
      if(ref.current!==null)
      {
        let mlatlng = ref.current.getLatLng()
        let coords = vlcontext.states.vectorlayers.current.markers[props.id].geometry.coordinates
        coords.lat = mlatlng.lat
        coords.lng = mlatlng.lng
        vlcontext.fncts.setpolylatlngs('marker',props.id,coords);
      }
    },
    click()
    {
      // if(ref.current!==null)
      // {
      //   if(ref.current.getRadius()===10)
      //     ref.current.setRadius(20)
      //   else
      //     ref.current.setRadius(10)
      // }
    }
  }), [])
  return(
    <>
    <Marker draggable={draggable} eventHandlers={eventHandlers} position={vlcontext.states.vectorlayers.current.markers[props.id].geometry.coordinates} ref={ref}>
      <Popup minWidth={90} className='padding'>
        <span onClick={()=>{setdragable(!draggable)}}>{draggable? 'Marker is draggable': 'Click here to make marker draggable'}</span>
      </Popup>
    </Marker>
    </>
  )

}


//-------------------------------------------   ----------------------------------------------------------------

export const AddCircle = (props) => 
{
  const vlcontext = useContext(VectorLayerContext)
  const centerMref = useRef(null)
  const radiusMref = useRef(null)
  const bref = useRef(null);
  const circleref = useRef(null)
  const polylineref = useRef(null)
  const center = vlcontext.states.vectorlayers.current.circles[props.id].geometry.coordinates
  const radiusmarker = GeometryUtil.destination(center,0,props.radius);
  const radius = useRef(GeometryUtil.length([radiusmarker,center]))
  const id = props.id
  console.log('cdv ',vlcontext.states.vectors.circles[props.id].properties.inclusion )
  const drawOptions = { color: 'purple' , fill: vlcontext.states.vectors.circles[props.id].properties.inclusion }
  const [edit, setedit] = useState(vlcontext.states.vectors.circles[props.id].properties.edit)
  
  const CMEventHandlers = useMemo(() => ({
    drag()
    {
      if(centerMref.current!==null)
      {
        let c = centerMref.current.getLatLng()
        let m = radiusMref.current.getLatLng()
        circleref.current.setLatLng(c);
        radiusMref.current.setLatLng(GeometryUtil.destination(c,0,radius.current));
        polylineref.current.setLatLngs([[c.lat,c.lng],[m.lat,m.lng]])
      }
    },
    dragend()
    { 
      if(centerMref.current!==null)
      {
        let c = centerMref.current.getLatLng()
        let v =  vlcontext.states.vectorlayers.current.circles[id]
        v.geometry.coordinates = {...c}
        v.properties.radius = radius.current
        vlcontext.fncts.setpolylatlngs('circle',id,{...v});
      }
    }
  }), [])

  
  useEffect(() => {
    console.log('inclusion DV plg',vlcontext.states.vectors.circles[props.id].properties.inclusion)
    setedit(vlcontext.states.vectors.circles[props.id].properties.edit)
  }, [vlcontext.states.vectors.circles])
  

  const breachpEH = useMemo(() => 
  ({
    drag()
    { 
      if(bref.current!==null)
      {
        let mlatlng = bref.current.getLatLng()
        let properties = vlcontext.states.vectorlayers.current.circles[props.id].properties
        properties.bpoint.lat = mlatlng.lat
        properties.bpoint.lng = mlatlng.lng
      }
    },
    
    moveend()
    { 
      if (bref.current!==null)
      {
        let mlatlng = bref.current.getLatLng()
        let properties = vlcontext.states.vectorlayers.current.circles[props.id].properties
        properties.bpoint.lat = mlatlng.lat
        properties.bpoint.lng = mlatlng.lng
        properties.edit = true
        vlcontext.fncts.setpolylatlngs('circles',props.id,null,properties);
      }
    }
  }), [])

  const RMEventHandler = useMemo(() => ({
    drag()
    {
      if(radiusMref.current!==null)
      {
        let m = radiusMref.current.getLatLng()
        let c = centerMref.current.getLatLng()
        circleref.current.setRadius(GeometryUtil.length([m,c]));
        polylineref.current.setLatLngs([[c.lat,c.lng],[m.lat,m.lng]])
        radius.current = GeometryUtil.length([ radiusMref.current.getLatLng(),centerMref.current.getLatLng()])
      }
    },
    moveend()
    { 
      if(radiusMref.current!==null)
      {
        let v =  vlcontext.states.vectorlayers.current.circles[id]
        v.properties.radius =radius.current;
        vlcontext.fncts.setpolylatlngs('circle',id,{...v});
      }
    }
  }), [])

  let bpoint = vlcontext.states.vectors.circles[props.id].properties.bpoint
  return (
    <>
      <Circle center={center} pathOptions={drawOptions}  draggable={true} radius={radius.current} ref={circleref} />    
      <Marker draggable={edit} eventHandlers={CMEventHandlers} position={center} ref={centerMref}/>
      <Marker draggable={edit} eventHandlers={RMEventHandler} position={radiusmarker} ref={radiusMref}/>
      <Marker draggable={edit} eventHandlers={breachpEH} position={bpoint} ref={bref}/>
      <Polyline pathOptions={{color:'blue',dashArray:'10',opacity:0.7}}  positions={[[center.lat,center.lng],[radiusmarker.lat,radiusmarker.lng]]} ref={polylineref} >
        <Tooltip direction='top' offset={[0,0]} opacity={1} sticky>
          Radius = {parseInt(radius.current)} m
        </Tooltip>
      </Polyline>
    </>
  );

};