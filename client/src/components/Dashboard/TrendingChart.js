import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Title,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { EventTracker, HoverState, Animation, ArgumentScale, Stack } from '@devexpress/dx-react-chart';

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
  return(
    <Paper>
      <Chart data={props.data}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField='value'
          argumentField='date'
          name='thing'
        />
        <Stack/>
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

  // const [data, setData] = useState([]);

  // const generateData = (start, end, step) => {
  //   const plots = [];
  //   for (let i = start; i < end; i += step) {
  //     plots.push({ splineValue: Math.sin(i) / i, lineValue: ((i / 15) ** 2.718) - 0.2, argument: i });
  //   }
  //   console.log(plots)
  //   setData(plots);
  // };

  // useEffect(() => {
  //   generateData(props.data.x, props.data.y, props.data.z);
  // },[])
