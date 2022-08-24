import React from 'react';
import { MissionDiscCard, GeofenceCardPolygon, WaypointCard, TakeOffCard, ROICard, LandingCard } from './cards';
import {useState } from 'react';

export const VectorCards = (props) => 
{
  const [vectorlayers, setvectorlayers] = useState(props.vectorLayers)
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
                vector={{...p}} setAttrs={props.setAttrs} editState={props.editState} delAttrs={props.delAttrs} />
            }
            else if(i===vectorlayers.polylines[k].coordinates.length-1 && i!==0)
            {
              return <LandingCard key = {i} sno={i} ls={k} waypointeditor={waypointeditor} title={"Waypoint"} type = {"Waypoint"}
                vector={{...p}} setAttrs={props.setAttrs} editState={props.editState} delAttrs={props.delAttrs} />
            }
            else
            {
              return <WaypointCard key = {i} sno={i} ls={k} waypointeditor={waypointeditor} title={"Waypoint"} type = {"Waypoint"}
                vector={{...p}} setAttrs={props.setAttrs} editState={props.editState} delAttrs={props.delAttrs} />
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

      {/* <ROICard sno={1} title = {"Building"} type = {"ROI"} coords={{lat:20.0050050,lng:50.000,alt:50.00}} coords_e={{lat:20.0050050,lng:50.000,alt:50.00}}/>  */}
      
    {
      /*       
        {
          Object.keys(props.vectorLayersGJ.markers).map((k)=>
          {
            const vector = props.vectorLayersGJ.markers[k]
            return( 
              <ROICard sno={k} title = {"Building"} type = {"ROI"} coords={vector.geometry.coordinates} coords_e={{lat:20.0050050,lng:50.000,alt:50.00}}/> 
            )
          })
        }

        {
          Object.keys(props.vectorLayersGJ.polygons).map((k)=>
          {
            const vector = props.vectorLayersGJ.polygons[k]
            return(
              <GeofenceCard sno={k} title = {"Geofence"} type = {"Polygonal"} mode={'geofence'} bpoint={{lat:20.0050050,lng:50.000}} coords={vector.geometry.coordinates}/>
            )
          })
        } 
        {

        }
        {
          // console.log(props.vectorLayersGJ.polylines)
          // Object.keys(props.vectorLayersGJ.polylines).map((k)=>
          // {
            // console.log("waypoints : \n",k)
            // const vector = props.vectorLayersGJ.polylines[0]
            // return(
            //   <WaypointCard sno={2} title = {"Waypoint"} type = {"Waypoint"} coords={vector} mode={{type:'hover',span:0,yaw:90,vs:20}}/>
            // )
            // return(<AddPolyline pos={vector.geometry.coordinates} sno={k} key={k} text={vector.properties.text} updateLayer={props.updateLayer}/>)
          // })
        }

        {/* {
          Object.keys(props.vectorLayersGJ.circles).map((k)=>
          {
            const vector = props.vectorLayersGJ.circles[k]
            return(<AddCircle center={vector.geometry.coordinates} radius={vector.properties.radius} sno={k} key={k} text={vector.properties.text} updateLayer={props.updateLayer}/>)
          })
        } 
      */
    }
    </div>
  );
};
