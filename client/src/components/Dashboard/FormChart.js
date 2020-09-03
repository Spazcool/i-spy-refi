import React, {useState, useEffect} from 'react';
// import {  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Legend,
  Title,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState, Animation, Palette } from '@devexpress/dx-react-chart';
// TODO SPECIFY COLORS THAT MATCH OUR LOOK
// https://devexpress.github.io/devextreme-reactive/react/chart/docs/guides/palette/
export default function FormChart (props) {
  // const classes = useStyles();
  const [isActive, setIsActive] = useState(true);
  const [loaded, setLoaded]= useState(false);
  const [loadingData, setLoadingData] = useState([
    { room: 'Bathroom', value: 10 },
    { room: 'Bedroom', value: 1 },
    { room: 'Kitchen', value: 1 },
    { room: 'Garage', value: 1 },
    { room: 'Roof', value: 1 },
    { room: 'Porch', value: 1 },
    { room: 'Windows', value: 1 },
    { room: 'Electical', value: 1 },
  ]);

  const checkLoaded = () => {
    const {data} = props;
    if(data){
      setLoaded(true);
    }
  }

  useEffect(() => {
    checkLoaded();
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const newArr = loadingData.map((datum, i) => {
          return {
            room: [loadingData[i].room],
            value: loadingData[(i+1) % loadingData.length].value
          } 
        })
        setLoadingData(newArr)
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, loadingData]);

  return(
    loaded ? 
      <Paper>
        <Chart data={props.data}>
          <PieSeries valueField="value" argumentField="room"/>
          <Animation/>
          <Legend/>
          <Title text='Approximate Renovation Value!!!'/>
          <EventTracker/>
          <HoverState/>
          <Tooltip/>
        </Chart>
      </Paper>
      :
      <Paper>
        <Chart data={loadingData}>
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
