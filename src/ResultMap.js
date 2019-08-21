import React, {useState, useEffect} from 'react';
import {Map, Popup, Rectangle, TileLayer} from "react-leaflet";
import {interpolateViridis} from "d3-scale-chromatic";
import {scaleLog} from "d3-scale";

function ResultMap(props) {

  const [data, setData] = useState([]);
  const [scale, setScale] = useState(() => 1);

  const [max, setMax] = useState(98562);
  const [min, setMin] = useState(1);

  useEffect(() => {

    fetch(`/api/dropoffs/` + String(props.start) + '/' + String(props.end))
      .then(response => response.json())
      .then(responseJson => setData(responseJson))
  }, [props]);

    useEffect(() => {
      const dropoffCounts = data.map((x)=> x.dropoff_count);
      setMin(Math.min(...dropoffCounts));
      setMax(Math.max(...dropoffCounts));
      const scale = scaleLog().domain([min, max]).range([0,1]);
      setScale(()=>scale);
  }, [data, min, max]);

  return (
    <Map center={[30.2672, -97.7431]} zoom={10} id={"map1"}>
      <TileLayer
        url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png'
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((datum) => {
        return <Rectangle
          bounds={[[datum.end_location_lat - 0.005, datum.end_location_long - 0.005], [datum.end_location_lat + 0.005, datum.end_location_long + 0.005]]}
          key={String(datum.end_location_lat) + String(datum.end_location_long)}
          fillColor={interpolateViridis(scale(datum.dropoff_count))}
          fillOpacity={0.5}
          color={interpolateViridis(scale(datum.dropoff_count))}
          opacity={0.3}
          weight={1}
        >
          <Popup>
            Dropoffs: {datum.dropoff_count.toLocaleString()}
          </Popup>
        </Rectangle>
      })}
    </Map>
  )
}

export default ResultMap;