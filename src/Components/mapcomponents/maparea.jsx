import React, { useState,useRef, useCallback } from 'react';
import { MapAreaLeaflet } from './leafletcomponents/map_leaflet.jsx';
import { ToolBar } from './toolbar.jsx';
import * as turf from '@turf/turf';
import { VectorCards } from './vectorcards.jsx';
import GeometryUtil from 'leaflet-geometryutil';
import loading_img from '../Resources/animation_500_l6z7q29e.gif'

export const MapArea = () => 
{

    let urlpost = 'http://192.168.1.30:8000/drone_api/push_mission?code=4ffaeff4-f001-48e1-a1bd-85c541f8b67b';

    let initVectorLayers = localStorage.getItem("vectorlayer")===null?{properties:{edit:false,type:"photogrammetry",time:0,distance:0,text:""}, markers:{},polygons:{},polylines:{},objects:{},circles:{}}:JSON.parse(localStorage.getItem("vectorlayers"));
    let initVectorref = localStorage.getItem("vectorref")===null?{marker:-1,polygon:-1,polyline:-1,objects:-1,circle:-1}:JSON.parse(localStorage.getItem("vectorref"));
    
    const [blocking,setblocking] = useState({state:-1,msg:"",err:false});

    const [map, setMap] = useState(null)
    const [vectorLayers, setvectorLayers] = useState({...initVectorLayers});
    const vectorRef = useRef(initVectorref);
    const [mode,setmode] = useState('None');
    const modeList = ['None','NPL0','PL1','NC0','NPG0','PG1','NM0','FM','ST']
    const mapSpecifics = {center:[12.822126830224235, 80.02103984355928],zoom:13}
    
    
    const TBclickHandler = (sno_)=>
    {
        console.log("mode selected : "+modeList.includes(sno_), sno_);
        if(modeList.includes(sno_))
        {
            if(sno_ === 'FM')
            {
                console.log('FM:')
                Exporter();
                setmode(modeList[0]);
            }
            else if(sno_ === 'ST')
            {
                setmode(modeList[0]);
            }
            else if(sno_ === mode)
            {
                setmode(modeList[0]);
            }
            else
            {
                setmode(sno_);
            }
        }
    }

    const ClickHandler = (latlng) => 
    {
        NewVector(latlng,mode);
    }

    const NewVector = (latlng,type) => 
    {
        let vld = vectorLayers;
        
        if(type === "NM0")
        {
            vld = makeSurvey(latlng);
        }
        if(type === "NC0")
        {
            vld = makeCircle(latlng);
        }
        if(type === "NPG0")
        {
            vectorRef.current.polygon=vectorRef.current.polygon+1;
            vld = makePolygon(latlng);
            setmode("PG1");
        }
        if(type === "PG1")
        {
            let v = makePolygon(latlng);
            vld.polygons = {...vld.polygons,[v.id]:v}
        }
        if(type === "NPL0")
        {
            if(Object.keys(vld.polylines).length<1)
            {  
                let v =  makePolyline(Object.keys(vld.polylines).length,latlng);
                v = AddtoPolyline(v,latlng)
                vld.polylines = {...vld.polylines,[v.id]:v}
            }
            else
            {
                let v = AddtoPolyline(vld.polylines[0],latlng)
                vld.polylines = {...vld.polylines,[v.id]:v}
            }
            console.log(vld);
        }

        if(mode!=='None')
        {
            setvectorLayers({...vld})
        }
    }

    const makeSurvey=(latlng) => 
    {
        let angle = 20;
        let polygon = turf.circle([latlng.lng,latlng.lat],500,{steps:8,units: 'meters'});
        let center = turf.centroid(polygon);

        let mtransect = turf.lineString([turf.getCoord(turf.destination(center,500*2,angle,{units: 'meters'})),turf.getCoord(turf.destination(center,500*2,angle+180,{units: 'meters'}))]);
        let intersect = turf.lineIntersect(polygon,mtransect);
        mtransect = turf.lineString([turf.getCoord(intersect.features[0]),turf.getCoord(intersect.features[1])]);
        let tran_n = 10;
        let tran_dist = turf.length(mtransect,{units:'meters'})/tran_n;
        let trans = {};
        let id=0;
        let transect_ls = []
        let scaler = 1.05        

        for (let i = 0; i <tran_n; i++) 
        {
            let c = turf.along(mtransect, tran_dist*i,{units:'meters'});
            let dummy_transect = turf.lineString([turf.getCoord(turf.destination(c,-500*scaler,angle+90,{units: 'meters'})),turf.getCoord(turf.destination(c,500*scaler,angle+90,{units: 'meters'}))])
            let intersect = turf.lineIntersect(dummy_transect,polygon)
            
            if(i%2===0)
            {
                transect_ls.push(...[turf.getCoord(intersect.features[0]),turf.getCoord(intersect.features[1])])
                // transect_ls.push(...[turf.getCoord(turf.destination(c,-500*scaler,angle+90,{units: 'meters'})),turf.getCoord(turf.destination(c,500*scaler,angle+90,{units: 'meters'}))])
            }
            else
            {
                transect_ls.push(...[turf.getCoord(intersect.features[1]),turf.getCoord(intersect.features[0])])
                // transect_ls.push(...[turf.getCoord(turf.destination(c,500*scaler,angle+90,{units: 'meters'})),turf.getCoord(turf.destination(c,-500*scaler,angle+90,{units: 'meters'}))])
            }
        }

        let transect  = turf.lineString(transect_ls);
        // trans={...trans,[id++]: transect};
        //  display vector layers
        let vld = vectorLayers;
        let v = GeojsonToLatLng(polygon);
        vld.polygons = {...vld.polygons,[v.properties.id]:v};
        console.log(polygon)
        v = GeojsonToLatLng(transect);
        console.log(transect)
        vld.polylines = {...vld.polylines,[v.properties.id]:v};
        // vld.polylines = {...vld.polylines,...trans}

        return vld;
    }

    const makeMarker=(latlng)=>
    {
        let vld = vectorLayers
        let v = {id:Object.keys(vld.markers).length,properties:{id:null,text:'',edit:true,__type__:'poi'},geometry:{coordinates:{lat:null,lng:null,alt:null}}}
        v.properties.id = Object.keys(vld.markers).length
        v.geometry.coordinates = {lat:latlng.lat,lng:latlng.lng,alt:null}
        return v 
    }

    const makeCircle=(latlng)=>
    {
        let vld = vectorLayers
        let v = {id:Object.keys(vld.polygons).length,properties:{id:null,text:'',edit:true,__type__:'Circle',inclusion:false},geometry:{coordinates:{lat:latlng.lat,lng:latlng.lng,alt:null},radius:200}}
        let bp = {lat:latlng.lat+0.001,lng:latlng.lng+0.001,alt:null}
        v.BPoint = bp
        v.properties.id = Object.keys(vld.circles).length
        vld.circles = {...vld.circles,[v.properties.id]:v}
        return vld
    }
  
    const makePolygon=(latlng)=>
    {
        let vld = vectorLayers
        let v = {id:Object.keys(vld.polygons).length,properties:{inclusion:true,breach:false,edit:true,type:'Polygon'},coordinates:[]}
        v.BPoint = {lat:latlng.lat+0.001,lng:latlng.lng+0.0001,alt:null}
        v = AddtoPolygon(v,latlng)
        vld.polygons = {...vld.polygons,[v.properties.id]:v}
        return vld
    }

    const AddtoPolygon=(polygon,latlng)=>
    {
        let p = {id:null,coordinates:{lat:latlng.lat,lng:latlng.lng,alt:null}}
        console.log(polygon)
        p.id = polygon.coordinates.length;
        polygon.coordinates = [...polygon.coordinates,p]
        return polygon
    }

    const makePolyline=(id)=>
    {
        let v = {id:id,properties:{text:'',edit:true,showMarkerPrompt:null,type:'Path',altdef:20},coordinates:[]}
        return v
    }

    const AddtoPolyline=(polyline,latlng)=>
    {
        let p = {id:null,vlid:polyline.id,type:'lineStringPoint',attrs:{text:'',edit:true,type:'waypoint',code:'',radius:0},coordinates:{lat:latlng.lat,lng:latlng.lng,alt:polyline.properties.altdef}}
        p.id = polyline.coordinates.length;
        if(p.id>0)
        {
            console.log(polyline)
            p.coordinates.alt=polyline.coordinates[0].coordinates.alt
        }
        polyline.coordinates = [...polyline.coordinates,p]
        return polyline
    }

    const UpdateVector = useCallback((type, vector)=>
    {
        let vld = vectorLayers;
        if(type === 'PL')
        {
            vld.polylines[vector.id] = vector;
        }
        if(type === 'PG')
        {
            vld.polygons[vector.properties.id] = vector;
        }
        if(type === 'MK')
        {
            vld.markers[vector.properties.id] = vector;
        }
        if(type === 'CR')
        {
            vld.circles[vector.properties.id] = vector;
        }
        setvectorLayers({...vld});
    })

    const Exporter = () => 
    {
        let vl = vectorLayers.polylines[0];
        if(Object.keys(vectorLayers.polylines).length>0)
        {
            let d = vl.coordinates.map((v,k)=>
            {
                delete v.attrs.edit
                return({...v.attrs,...v.coordinates})
            })
            let mission = {mission:[...d],code:"4ffaeff4-f001-48e1-a1bd-85c541f8b67b",mission_id:"01"}
            setblocking({state: 1,msg:"Fetching mission data ..."});
            let reqoptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...mission})
            }
            fetch(urlpost,reqoptions)
            .then(res =>
            {
                return res.json();
            })
            .then(data =>
            {
                setblocking({state:-1,msg:""});
            })
            .catch(err =>
            {
                setblocking({state:0,msg:err});
                console.log(err);
            })
        }
        else
        {
            console.warn("Please generate a mission");
        }
    }

    const Parser = (data)=>
    {
        // let newVectorLayer = {markers:{},polygons:{},polylines:{},objects:{},circles:{}};
        // let pl = makePolyline(Object.keys(vld.polylines).length,)
        // data.mission.map((wp,k)=>
        // {
        //     // let 
        // })
        
        // console.log(newVectorLayer);
        // setvectorLayers({...newVectorLayer});
        
    }

    const GeojsonToLatLng = (geojson)=>
    {
        let vld = vectorLayers;
        if(geojson.geometry.type === 'Polygon')
        {
            let v = {type:'Feature',properties:{id:Object.keys(vld.polygons).length,text:'',inclusion:true,edit:true,type:'Polygon'},geometry:{coordinates:[]}}
            let center = turf.centroid(geojson).geometry.coordinates;
            let bp = GeometryUtil.destination({lat:center[1],lng:center[0],alt:2 in geojson.geometry.coordinates[0][0]?geojson.geometry.coordinates[0][0][2]:null},90,10);            
            let latlngarray = geojson.geometry.coordinates[0].map((p,k)=>
            {
                return {id:k, coordinates:{lat:p[1], lng:p[0],alt:2 in p?p[2]:null}};
            })
            v.geometry.coordinates = [...latlngarray]
            v.BPoint = bp
            return v;
        }
        if(geojson.geometry.type === 'LineString')
        {
            let v = {type:'Feature',properties:{id:null,text:'',inclusion:true,edit:true,type:'Polyline'},geometry:{coordinates:[]}}
            v.properties.id = Object.keys(vld.polylines).length;
            let latlngarray = geojson.geometry.coordinates.map((p,k)=>
            {
                let p_c = p;//let p_c = p.geometry.coordinates;
                return {id:k,text:'', coordinates:{lat:p_c[1], lng:p_c[0],alt:2 in p_c?p_c[2]:null}};
            })
            v.geometry.coordinates = [...latlngarray]
            return v;
        }
    }

    const setAttrs = (vector) =>
    {
        let vld = vectorLayers
        if(vector.type === 'lineStringPoint')
        {
            vld.polylines[vector.vlid].coordinates[vector.id] = {...vector}
        }
        if(vector.type === 'polygon')
        {
            console.warn("not implemented setAttrs for polygon")
        }
        setvectorLayers({...vld});
    }

    const delAttrs = (vector) => 
    {
        let vld = vectorLayers
        if(vector.type === 'lineStringPoint')
        {
            vld.polylines[vector.vlid].coordinates = vld.polylines[vector.vlid].coordinates.slice(0, vector.id).concat(vld.polylines[vector.vlid].coordinates.slice(vector.id+1))
            vld.polylines[vector.vlid].coordinates=vld.polylines[vector.vlid].coordinates.map((v,key)=>{v.id = key; return(v)})   
        }
        setvectorLayers({...vld});
    }

    const BlockingUploadingMap = () =>
    {
        let content = null
        if(blocking.state===0) //go to 
        {
            content =
            <div className='flex absolute justify-center items-center w-full h-full bg-[#00000099] z-50'>
                <div className='flex flex-col bg-[#2b343b] w-52 h-auto rounded-lg justify-center'>
                    go to
                </div>
            </div>;
        }
        else if(blocking.state===1) //new mission
        {
            content =
                <div className='flex flex-col bg-[#2b343b] w-52 h-auto rounded-lg justify-center'>
                    <div className='flex w-full h-fit'>
                        <img src={loading_img} alt="..." />
                    </div>
                    <p className='flex p-1 w-full h-8 justify-center text-white'>
                        {blocking.msg}
                    </p>
                </div>;
        }
        else if(blocking.state===2) //fetch mission
        {
            content =
                <div className='flex flex-col bg-[#2b343b] w-52 h-auto rounded-lg justify-center'>
                    <div className='flex w-full h-fit'>
                        <img src={loading_img} alt="..." />
                    </div>
                    <p className='flex p-1 w-full h-8 justify-center text-white'>
                        {blocking.msg}
                    </p>
                </div>;
        }
        else if(blocking.state===3) // push(save) mission
        {
            content =
                <div className='flex flex-col bg-[#2b343b] w-52 h-auto rounded-lg justify-center'>
                    <div className='flex w-full h-fit'>
                        <img src={loading_img} alt="..." />
                    </div>
                    <p className='flex p-1 w-full h-8 justify-center text-white'>
                        {blocking.msg}
                    </p>
                </div>;
        }
        else if(blocking.state===5) //eror
        {
            content =
                <div className='flex flex-col bg-[#2b343b] w-52 h-auto rounded-lg justify-center'>
                    <div className='flex w-full h-fit'>
                        <img src={loading_img} alt="loading..." />
                    </div>
                    <p className='flex p-1 w-full h-8 justify-center text-white'>
                        {blocking.msg}
                    </p>
                </div>;
        }
        else
        {
            return(null);
        }
        return (
            <div className='flex absolute justify-center items-center w-full h-full bg-[#00000099] z-50'>
                <div className='flex'>
                    {content}
                </div>
            </div>
        )
    }

    const toggleBlockingPopup = (state,msg)=>
    {
        setblocking({state,msg});
    }

    const settingsOptions=(ch,attr) =>
    {
        console.log("Settings options :");
        if(ch === 1) // go to
        { 
            if(map!==null)
            {
                map.setView(attr,mapSpecifics.zoom);
            }
        }
    }

    return (
    <>
        <div className='relative flex w-full h-full '>
            <MapAreaLeaflet setMap = {setMap} center = {mapSpecifics.center} zoom={mapSpecifics.zoom} vectorLayers = {vectorLayers} ClickHandler = {ClickHandler.bind(this)} UpdateVector = {UpdateVector.bind(this)}/>
            <VectorCards vectorLayers = {vectorLayers} setAttrs = {setAttrs} delAttrs={delAttrs} /> 
            <ToolBar TBclickHandler={TBclickHandler} mode = {mode} toggleBlockingPopup={toggleBlockingPopup} settingsOptions={settingsOptions}/>
        </div>
        <BlockingUploadingMap />
    </>
    );
};