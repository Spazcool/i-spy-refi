import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  LineSeries,
  SplineSeries,
  Legend,
  Title,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, HoverState, Animation } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 275,
  },
  list: {
    height: '70vh',
    'overflow-y': 'scroll',
  },
}));


export default function TrendingChart (props) {
  const [data, setData] = useState([]);
  const generateData = (start, end, step) => {
    const plots = [];
    for (let i = start; i < end; i += step) {
      plots.push({ splineValue: Math.sin(i) / i, lineValue: ((i / 15) ** 2.718) - 0.2, argument: i });
    }
    console.log(plots)
     setData(plots);
  };
  useEffect(() => {
    generateData(props.x, props.y, props.z);
  },[])

  return(
    <Paper>
      <Chart data={data}>
        <LineSeries
          valueField="lineValue"
          argumentField="argument"
        />
        <SplineSeries
          valueField="splineValue"
          argumentField="argument"
        />
        <Animation/>
        <Legend/>
        <Title text='Doug'/>
        <EventTracker/>
        <HoverState/>
        <Tooltip/>
      </Chart>
    </Paper>
  )
}
