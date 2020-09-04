import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';

import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Title,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import {
  EventTracker,
  HoverState,
  Animation,
  ArgumentScale,
  Stack,
} from '@devexpress/dx-react-chart';

export default function TrendingChart(props) {
  const [isActive, setIsActive] = useState(true);
  const [loaded, setLoaded]= useState(false);
  const [loadingData, setLoadingData] = useState([
    { date: moment().subtract(30, 'days').format('DD-MM-YY'), value: 1000 },
    { date: moment().subtract(20, 'days').format('DD-MM-YY'), value: 2000 },
    { date: moment().subtract(10, 'days').format('DD-MM-YY'), value: 4000 },
    { date: moment().format('DD-MM-YY'), value: 8000 },
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
            date: [loadingData[i].date],
            value: loadingData[(i+1) % loadingData.length].value
          } 
        })
        setLoadingData(newArr)
      }, 800);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, loadingData]);

  return (
    loaded ? 
      <Paper>
        <Chart data={props.data}>
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField='value' argumentField='date' name='value' />
          <Stack />
          <Animation />
          <Legend />
          <Title text='Your Trending Value' />
          <EventTracker />
          <HoverState />
          <Tooltip />
        </Chart>
      </Paper>
      :
      <Paper>
        <Chart data={loadingData}>
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField='value' argumentField='date' name='value' />
          <Stack />
          <Animation />
          <Legend />
          <Title text='Your Trending Value' />
          <EventTracker />
          <HoverState />
          <Tooltip />
        </Chart>
      </Paper>
  );
}
