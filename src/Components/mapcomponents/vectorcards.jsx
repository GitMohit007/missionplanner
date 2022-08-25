import React from 'react';
import { MissionDiscCard, GeofenceCardPolygon, WaypointCard, TakeOffCard, LandingCard } from './cards';

export const VectorCards = (props) => 
{
  const vectorlayers = props.vectorLayers
  const waypointeditor = () => {  }
  
  return (
    <div className=' card-list'>
      <MissionDiscCard waypointeditor={waypointeditor} title={"Mission Shalton Manuver"}
            vector={vectorlayers.properties}  setAttrs={props.setAttrs} editState={props.editState} delAttrs={props.delAttrs} />
      {
        Object.keys(vectorlayers.polylines).map((k)=>
        {
          return vectorlayers.polylines[k].coordinates.map((p,i)=>
          {
            if(i===0)
            {
              return <TakeOffCard key = {i} sno={i} ls={k} waypointeditor={waypointeditor} title={"Waypoint"} type = {"Waypoint"}
                vector={{...p}} setAttrs={props.setAttrs} editState={props.editState} delAttrs={props.delAttrs} setEditAttr={props.setEditAttr}/>
            }
            else if(i===vectorlayers.polylines[k].coordinates.length-1 && i!==0)
            {
              return <LandingCard key = {i} sno={i} ls={k} waypointeditor={waypointeditor} title={"Waypoint"} type = {"Waypoint"}
                vector={{...p}} setAttrs={props.setAttrs} editState={props.editState} delAttrs={props.delAttrs} setEditAttr={props.setEditAttr}/>
            }
            else
            {
              return <WaypointCard key = {i} sno={i} ls={k} waypointeditor={waypointeditor} title={"Waypoint"} type = {"Waypoint"}
                vector={{...p}} setAttrs={props.setAttrs} editState={props.editState} delAttrs={props.delAttrs} setEditAttr={props.setEditAttr}/>
            }
          })
        })
      }
      {
        Object.keys(vectorlayers.polygons).map((k,i)=>
        {
          let polygon = vectorlayers.polygons[k]
          return(<GeofenceCardPolygon sno={k} key={i} title = {"Geofence"} type = {"Polygonal"} 
            mode={'geofence'} bpoint={polygon.properties.bpoint} inclusion={polygon.properties.inclusion} edit={polygon.properties.edit}/>)
        })
      }

    </div>
  );
};
