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
import { EventTracker, HoverState, Animation } from '@devexpress/dx-react-chart';

export default function FormChart (props) {
  // const classes = useStyles();

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [loaded, setLoaded]= useState(false);
  const [loadingData, setLoadingData] = useState([
    { room: 'Bathroom', value: 12 },
    { room: 'Bedroom', value: 7 },
    { room: 'Kitchen', value: 7 },
    { room: 'Garage', value: 7 },
    { room: 'Roof', value: 6 },
    { room: 'Porch', value: 5 },
    { room: 'Windows', value: 2 },
    { room: 'Electical', value: 55 },
  ]);

  const checkLoaded = () => {
    const {data} = props;
    if(data){
      setLoaded(true);
    }
  }

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    // console.log(loadingData.forEach((datum)=))
    checkLoaded();

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        console.log('yo')
        setSeconds(seconds => seconds + 1);
        const newArr = [];
        loadingData.forEach((datum, i) => {
          datum.value = loadingData[(i+1)%loadingData.length].value
          newArr.push(datum)
        })
        console.log(newArr)
        setLoadingData(newArr)
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

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
