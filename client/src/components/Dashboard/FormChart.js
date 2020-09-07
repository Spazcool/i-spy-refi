import React, {useState, useEffect} from 'react';

import Paper from '@material-ui/core/Paper';

import {
  Chart,
  PieSeries,
  Legend,
  Title,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState, Animation } from '@devexpress/dx-react-chart';

export default function FormChart (props) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([{ room: 'loading ...', value: 1 }])
  
  const checkLoaded = () => {
    const {data} = props;
    if(data.length > 0){
      setData(data)
    }
    setLoaded(true);
  }

  useEffect(() => {
    checkLoaded();
  },[props])
  
  return(
    <Paper className='card-radius box-shadow'>
      <Chart data={data}>
        <PieSeries valueField="value" argumentField="room"/>
        <Animation/>
        <Legend/>
        <Title text='Approximate Renovation Value'/>
        <EventTracker/>
        <HoverState/>
        <Tooltip/>
      </Chart>
    </Paper>
  )
}
