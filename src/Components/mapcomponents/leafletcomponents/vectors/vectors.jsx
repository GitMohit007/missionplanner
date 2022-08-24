import {React} from 'react';
import {renderToString} from 'react-dom/server';
// import { Polyline,Marker} from 'react-leaflet';
import { Popup,Polyline,Polygon,Marker,Circle,Tooltip } from 'react-leaflet';
import { useState,useMemo,useRef} from 'react';
import GeometryUtil from 'leaflet-geometryutil';
import L from 'leaflet';
import 'leaflet.path.drag/src/Path.Drag';

export const AddPolyline = ({vector_,UpdateVector}) => 
{

  const Point = ({index}) =>
  {
    const vert_id = index
    const mref = useRef(null);

    let markerStyle = <div className={index===0? "marker-icon bg-[#000000cd] border-4 border-[#0f6f3299]":index===vector_.coordinates.length-1?"marker-icon bg-[#000000cd] border-4 border-[#a9630099] ":"marker-icon bg-[#000000cd] border-4 border-[#0533a699]"}>
        {index}
    </div>

    let polyIcon = L.divIcon({
      className: '',
      html:renderToString(markerStyle) ,
      iconSize: [30,30],
      iconAnchor: [15,15],
    });

    const eventHandlers = useMemo(() =>
    ({
      drag()
      {
        if(mref !==null)
        {
          let latlng = mref.current.getLatLng();
          let pointlist = vector_.coordinates.map((point)=>
            {
              if(point.id === vert_id)
              {
                vector_.coordinates[vert_id].coordinates.lat = latlng.lat;
                vector_.coordinates[vert_id].coordinates.lng = latlng.lng;
                return [latlng.lat, latlng.lng];
              }
              else 
              {
                return [point.coordinates.lat, point.coordinates.lng];
              }
            })
          refs.Pref.current.setLatLngs(pointlist);
        }
      },
      dragend()
      {
        if(mref !==null)
        {
          UpdateVector('PL',vector_);
        }
      }
    }), [])
    console.log(vector_.coordinates[vert_id]);
    return (
      <Marker draggable={vector_.coordinates[vert_id].attrs.edit} eventHandlers={eventHandlers} position={vector_.coordinates[vert_id].coordinates} ref={mref} icon={polyIcon} />
    )
  };

  const AddnewPoint = ({})=> 
  {
    const mref = useRef(null);

    let markerStyle = <div className="marker-icon bg-[#000000cd] border-4 border-[#FFFFFF]">
        +
    </div>

    let polyIcon = L.divIcon({
      className: '',
      html:renderToString(markerStyle) ,
      iconSize: [30,30],
      iconAnchor: [15,15],
    });

    const eventHandlers = useMemo(() =>
    ({
      click(e)
      {
        let coords = []        
        vector_.coordinates.forEach((p,i)=>
        {
          if(i<pointlist.length-1)
          {
            p.id = coords.length;
            coords.push(p);
            if(GeometryUtil.belongsSegment(e.latlng,L.latLng(...pointlist[i]),L.latLng(...pointlist[i+1])))
            {
              let wp_ = {...p}
              wp_.id = coords.length;
              wp_.coordinates={...e.latlng};
              console.log("new point",wp_);
              coords.push(wp_);
            }
          }
          else
          {
            p.id = coords.length;
            coords.push(p);
          }
          console.log([...coords]);
        })
        console.log("Add marker Clicked !!!",coords);
        vector_.coordinates = coords;
        setshowMarkerPrompt(null);
        UpdateVector("PL",vector_);
      },
      mouseover(e)
      {
        setshowMarkerPrompt(e.latlng);
      },
    }), [])

    return (
      <Marker draggable={false} eventHandlers={eventHandlers} position={showMarkerPrompt} ref={mref} icon={polyIcon} />
    )
  };
  
  const eventHandlers = useMemo(() => 
  ({
    mouseover(e)
    {
      vector_.coordinates.forEach((p,i)=>
        {
          if(i<pointlist.length-1)
          {
            if(GeometryUtil.belongsSegment(e.latlng,L.latLng(...pointlist[i]),L.latLng(...pointlist[i+1])))
            {
              setshowMarkerPrompt({lat:(pointlist[i][0]+pointlist[i+1][0])/2,lng:(pointlist[i][1]+pointlist[i+1][1])/2});
            }
          }
        })
    },
    mouseout(e)
    {
      setshowMarkerPrompt(null);
    }
  }))

  const refs = {Pref:useRef(null),BMref:useRef(null),};
  const pointlist = vector_.coordinates.map((point)=>{return [point.coordinates.lat, point.coordinates.lng];})
  const PointCompls = vector_.coordinates.map((p,key)=> {return( <Point index={p.id} key={key}/> )})
  const drawOptions = { className:" polyline-stroke", color: 'purple' , fill: false, weight: 4 }
  const [showMarkerPrompt, setshowMarkerPrompt] = useState(null);

  return (
    <>
      <Polyline pathOptions={drawOptions} eventHandlers={eventHandlers} draggable={false} interactive={true} positions={pointlist} ref={refs.Pref} >
        {PointCompls}
        
      </Polyline>
      {showMarkerPrompt!==null?<AddnewPoint/>:null}
    </>
  );

};

export const AddPolygon = ({vector_,UpdateVector,modeSelector}) => 
{

  const Point = ({index}) =>
  {

    const vert_id = index;
    const mref = useRef(null);

    const eventHandlers = useMemo(() =>
    ({
      drag()
      {
        if(mref !==null)
        {
          let latlng = mref.current.getLatLng();
          let pointlist = vector_.coordinates.map((point)=>
            {
              
              if(point.id === vert_id){
                vector_.coordinates[vert_id].coordinates.lat = latlng.lat;
                vector_.coordinates[vert_id].coordinates.lng = latlng.lng;
                return [latlng.lat, latlng.lng];}
              else { return [point.coordinates.lat, point.coordinates.lng];}
            })
          refs.Pref.current.setLatLngs(pointlist);
        }
      },
      dragend()
      {
        if(mref !==null)
        {
          UpdateVector('PG',vector_); 
        }
      }
    }), [])

    return (
      <>
        <Marker draggable={vector_.properties.edit} eventHandlers={eventHandlers} position={vector_.coordinates[vert_id].coordinates} ref={mref}>
          <Popup minWidth={90} className='padding h-fit w-fit'>
            <span className=' h-fit w-fit'>{vector_.coordinates[vert_id].coordinates.lat},{vector_.coordinates[vert_id].coordinates.lng}</span>
          </Popup>
        </Marker>
      </>
    )

  };
  
  const eventHandlers = useMemo(() => 
  ({
    dragstart() 
    {
      setisdragging(true);
    },
    drag() 
    {
      let i =0;
      let arr = refs.Pref.current.getLatLngs();
      arr[0].forEach(latlng => {
        vector_.coordinates[i].coordinates.lat = latlng.lat;
        vector_.coordinates[i++].coordinates.lng = latlng.lng;
      });
      vector_.BPoint.lat = vector_.coordinates[0].coordinates.lat+0.001;
      vector_.BPoint.lng = vector_.coordinates[0].coordinates.lng+0.001;
    },
    dragend()
    {
      setisdragging(false);
      UpdateVector('PG',vector_);
    }
  }))

  const breachpEH = useMemo(() =>
  {

  })

  const vector = vector_;
  console.log(vector_.coordinates.map((p)=>{console.log(p);return p;}))
  const refs = {Pref:useRef(null),BMref:useRef(null),};
  const pointlist = vector_.coordinates.map((point)=>{return [point.coordinates.lat, point.coordinates.lng];})
  const PointCompls = vector_.coordinates.map((p,key)=> {return( <Point index={p.id} key={key}/> )})
  const drawOptions = { color: 'purple' , fill: vector_.properties.inclusion }
  const [isdragging, setisdragging] = useState(false)

  return (
    <>
      <Polygon pathOptions={drawOptions} eventHandlers={eventHandlers} draggable={true} positions={pointlist} ref={refs.Pref} >
        {isdragging?<></>:PointCompls}
      </Polygon>
      {isdragging?<></>:<Marker draggable={true} eventHandlers={breachpEH} position={vector_.BPoint} ref={refs.BMref}></Marker>}
    </>
  );
};

export const AddMarker = ({vector_, modeSelector, UpdateVector}) => {

  const [draggable, setdragable] = useState(true)
  const ref = useRef(null)
  const vector = vector_

  const eventHandlers = useMemo(() => ({

    dragstart()
    {
        // modeSelector(0);
    },

    drag()
    {

    },

    dragend()
    { 
      if(ref.current!==null)
      {
        let mlatlng = ref.current.getLatLng();
        vector.coordinates.lat = mlatlng.lat;
        vector.coordinates.lng = mlatlng.lng;
        UpdateVector('MK',vector);
      }
    },
    click()
    {

    }
  }), [])

  return(
    <>
    <Marker draggable={draggable} eventHandlers={eventHandlers} position={vector.coordinates} ref={ref}>
      <Popup minWidth={90} className='padding'>
        <span onClick={()=>{setdragable(!draggable)}}>{draggable? 'Marker is draggable': 'Click here to make marker draggable'}</span>
      </Popup>
    </Marker>
    </>
  )
}

//-------------------------------------------   ----------------------------------------------------------------

export const AddCircle = ({vector_, modeSelector, UpdateVector}) => 
{
  const refs = {CircleM:useRef(null),RadiusM:useRef(null),BreachM:useRef(null),Circle:useRef(null),Polyline:useRef(null)}
  const vector = vector_;
  const radiusmarker = GeometryUtil.destination(vector.geometry.coordinates,0,vector.geometry.radius);
  refs.radius = useRef(GeometryUtil.length([radiusmarker,vector.geometry.coordinates]))
  const drawOptions = { color: 'purple' , fill: true};//vector.properties.inclusion }
  const [edit, setedit] = useState(vector.properties.edit)

  const breachpEH = useMemo(() => 
  ({
    drag()
    { 
      if(refs.BreachM.current!==null)
      {
        let mlatlng = refs.BreachM.current.getLatLng()
        vector.BPoint.geometry.coordinates.lat = mlatlng.lat
        vector.BPoint.geometry.coordinates.lng = mlatlng.lng
      }
    },
    
    moveend()
    { 
      if (refs.BreachM.current!==null)
      {
        let mlatlng = refs.BreachM.current.getLatLng()
        vector.BPoint.geometry.coordinates.lat = mlatlng.lat
        vector.BPoint.geometry.coordinates.lng = mlatlng.lng
        vector.properties.edit = true
        console.warn('Update Vector function not implemented ...')
      }
    }
  }), [])

  const RMEventHandler = useMemo(() => ({
    drag()
    {
      if(refs.RadiusM.current!==null)
      {
        let m = refs.RadiusM.current.getLatLng();
        let c = refs.CircleM.current.getLatLng();
        
        refs.radius.current = GeometryUtil.length([m,c])
        refs.Circle.current.setRadius(refs.radius.current);
        refs.Polyline.current.setLatLngs([[c.lat,c.lng],[m.lat,m.lng]])
        vector.geometry.radius = refs.radius.current;
        let bmrk = GeometryUtil.destination(m,60,refs.radius.current);
        refs.BreachM.current.setLatLng([bmrk.lat,bmrk.lng]);
      }
    },
    dragend()
    { 
      if(refs.RadiusM.current!==null)
      {        
        UpdateVector('CR',vector);
      }
    }
  }), [])

  const CEventHandler = useMemo(() => ({
    dragstart()
    {
      // modeSelector(0);
    },
    drag()
    {
      if(refs.Circle.current!=null)
      {
        let m = refs.Circle.current.getLatLng();
        refs.CircleM.current.setLatLng(m);
        refs.RadiusM.current.setLatLng(GeometryUtil.destination(m,0,refs.radius.current));
        refs.Polyline.current.setLatLngs([[m.lat,m.lng],[refs.RadiusM.current.getLatLng().lat,refs.RadiusM.current.getLatLng().lng]]);
        vector.geometry.coordinates.lat = m.lat;
        vector.geometry.coordinates.lng = m.lng;
        let bmrk = GeometryUtil.destination(m,60,refs.radius.current);
        refs.BreachM.current.setLatLng([bmrk.lat,bmrk.lng]);
        vector.BPoint.geometry.coordinates.lat = bmrk.lat;
        vector.BPoint.geometry.coordinates.lng = bmrk.lng;
      }
    },
    moveend()
    { 
      UpdateVector('CR',vector);
    }
  }), [])
  
  // console.log(vector)
  return (
    <>
      <Circle center={vector.geometry.coordinates}  eventHandlers={CEventHandler} zIndexOffset={1000} pathOptions={drawOptions} draggable={true} radius={refs.radius.current} ref={refs.Circle} />    
      <Marker interactive={false} zIndexOffset={-10} position={vector.geometry.coordinates} ref={refs.CircleM}/>
      <Marker draggable={edit} eventHandlers={RMEventHandler} position={radiusmarker} ref={refs.RadiusM}/>
      <Marker draggable={edit} eventHandlers={breachpEH} position={vector.BPoint} ref={refs.BreachM}/>
      <Polyline pathOptions={{color:'blue',dashArray:'10',opacity:0.7}} interactive={false} zIndexOffset={-10} positions={[[vector.geometry.coordinates.lat,vector.geometry.coordinates.lng],[radiusmarker.lat,radiusmarker.lng]]} ref={refs.Polyline} >
        <Tooltip direction='top' offset={[0,0]} opacity={1} sticky>
          Radius = {parseInt(refs.radius.current)} m
        </Tooltip>
      </Polyline>
    </>
  );

};