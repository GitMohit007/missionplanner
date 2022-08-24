import React, { useEffect,useRef,useContext,useState } from 'react';
import L from 'leaflet';
import 'leaflet-editable/src/Leaflet.Editable'
import 'leaflet/dist/leaflet.css';
import './mapleaflet.css'
import VectorLayerContext from '../../Context/vectorLayers/vectorLayersContext'
import { AddMarker,AddCircle,AddPolygon,AddPolyline } from './vectors/dynamicVectors';
import '../../../../node_modules/leaflet-draw/dist/leaflet.draw.css'
import { MapContainer, TileLayer,useMapEvents,} from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export const MapAreaLeaflet = (props) => 
{
  const newlayer = useRef(true);
  const vlcontext = useContext(VectorLayerContext);
  const initVectorLayers = localStorage.getItem("vectorlayer")===null?{markers:{},polygons:{},polylines:{},objects:{},circles:{}}:JSON.parse(localStorage.getItem("vectorlayers"));;
  const [vectorlayers, setvectorlayers] = useState(initVectorLayers)//vlcontext.states.vectors)

  const appendLayer = (layertype,layerGJ) =>
  {
    let id = Object.keys(vectorlayers[layertype]).length
    layerGJ.properties.id = id
    setvectorlayers({...vectorlayers,[layertype]:{...vectorlayers[layertype],[id]:layerGJ}})
  }

  const updateLayer = (ln,layertype,latlng,text) =>
  {   
    setvectorlayers({...vectorlayers,[layertype]:{...vectorlayers[layertype],[ln]:{...vectorlayers[layertype][ln],geometry:{...vectorlayers[layertype][ln].geometry,coordinates:[...vectorlayers[layertype][ln].geometry.coordinates,latlng]}}}})
  } 

  const makeMarker=(latlng,text)=>
  {
    let v = vlcontext.fncts.getVectorTemplate('marker')
    v.geometry.coordinates={...latlng}
    v.properties.text=text
    vlcontext.fncts.appendLayer('markers',v)
    appendLayer('markers',v)
  }

  const makePolygon=(latlng,text)=>
  {
    let v = vlcontext.fncts.getVectorTemplate('polygon')
    let bplatlng = {lat:latlng.lat+0.001,lng:latlng.lng+0.0001}
    let bpoint = {...bplatlng,alt:50,type:{type:'Hover',unit:90},yaw:90,flightspeed:30,frame:'relative'}
    v.properties.text=text;v.properties.bpoint={...bpoint};v.properties.inclusion=true;
    v.geometry.coordinates=[{...latlng,alt:50}]
    vlcontext.fncts.appendLayer("polygons",v)
    appendLayer("polygons",v)
  }

  const makeCircle=(latlng,radius,text)=>
  {
    let v = vlcontext.fncts.getVectorTemplate('circle')
    let bplatlng = {lat:latlng.lat+0.001,lng:latlng.lng+0.0001}
    v.properties.text = text;v.properties.radius=radius;
    v.properties.inclusion = true
    v.geometry.coordinates = {...latlng,alt:50}
    v.properties.bpoint = {...bplatlng,alt:50,type:{type:'Hover',unit:90},yaw:90,flightspeed:30,frame:'relative'}
    vlcontext.fncts.appendLayer("circles",v)
    appendLayer("circles",v)
  }

  const makePolyline=(latlng,text)=>
  {
    let vl = vlcontext.fncts.getVectorTemplate('polyline');
    let v= vl.v; let p = vl.p
    p.lat=latlng.lat;p.lng=latlng.lng;p.alt=50;p.type={type:'Fly-by',unit:90}; p.yaw = 90;
    p.flightspeed = 30; p.frame = 'relative';p.edit=true;
    v.properties.text=text; v.geometry.coordinates=[{...p}]; 
    vlcontext.fncts.appendLayer('polylines',v)
    appendLayer('polylines',v)
  }

  const MapClicked = ()=>
  {
    const map_ = useMapEvents({
      click(e)
      {
        if(props.mode==="marker")
        {
          makeMarker(e.latlng,"marker no:")
        }
        else if(props.mode==="polygon")
        {
          if(newlayer.current)
          {
            makePolygon(e.latlng,"polygon no:");newlayer.current=false;
          }
          else if(Object.keys(vlcontext.states.vectorlayers.current.polygons).length===0)
          {
            makePolygon(e.latlng,"polygon no:");newlayer.current=false;
          }
          else
          {
            vlcontext.fncts.updateLayer(Object.keys(vlcontext.states.vectorlayers.current.polygons).length-1,"polygons",{...e.latlng,alt:50},"updated poly",);
            updateLayer(Object.keys(vectorlayers.polygons).length-1,"polygons",{...e.latlng,alt:50},"updated poly",);            
          }
        }
        else if(props.mode==='polyline')
        {
          if(Object.keys(vectorlayers.polylines).length>0)
          {
            let p = vlcontext.fncts.getVectorTemplate('polyline').p
            p.lat=e.latlng.lat;p.lng=e.latlng.lng;p.alt=50;p.type={type:'Fly-by',unit:90}; p.yaw = 90;
            p.flightspeed = 30; p.frame = 'relative';p.edit=true
            vlcontext.fncts.updateLayer(0,"polylines",p,"",);
            updateLayer(0,"polylines",p,"",);
          }
          else
          { 
            makePolyline(e.latlng,"polyline no:");newlayer.current=false
          }
        }
        else if(props.mode==="circle")
        { 
          makeCircle(e.latlng,200,"circle no:") 
        }
      },
      dblclick(e)
      {
        map_.flyTo(e.latlng, map_.getZoom())
        newlayer.current=true
      }
    })  
    return(<></>);
  }

  useEffect(() => { newlayer.current = true}, [props.mode]);
  useEffect(()=>
  {
    console.log('updating veclayers')
    setvectorlayers({...vlcontext.states.vectors})
  },[vlcontext.states.vectors])
  return (
    <div className='relative flex z-30 w-full h-full'>
      <MapContainer className=' relative' center={props.center} zoom={20} scrollWheelZoom={true} doubleClickZoom={false}>
        <TileLayer  url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" attribution='&copy; <a href="http://mt1.google.com">GoogleMap</a> contributors'/>
        <MapClicked/>
        {
          Object.keys(vectorlayers.markers).map((k)=>
          {
            const vector = vectorlayers.markers[k]
            return(<AddMarker pos={vector.geometry.coordinates} id={k} key={k} text={vector.properties.text} updateLayer={props.updateLayer}/>)
          })
        }

        {
          Object.keys(vectorlayers.polygons).map((k)=>
          {
            const vector = vectorlayers.polygons[k]
            return(<AddPolygon pos={vector.geometry.coordinates} sno={k} key={k} text={vector.properties.text} updateLayer={props.updateLayer}/>)
          })
        }

        {
          Object.keys(vectorlayers.polylines).map((k)=>
          {
            const vector = vectorlayers.polylines[k]
            return(<AddPolyline pos={vector.geometry.coordinates} sno={k} key={k} text={vector.properties.text} editwaypointlatlng={props.editwaypointlatlng}/>)
          })
        }

        {
          Object.keys(vectorlayers.circles).map((k)=>
          {
            const vector = vectorlayers.circles[k]
            return(<AddCircle center={vector.geometry.coordinates} radius={vector.properties.radius} id={k} key={k} text={vector.properties.text} updateLayer={props.updateLayer}/>)
          })
        }
      </MapContainer>
    </div>
  );
};