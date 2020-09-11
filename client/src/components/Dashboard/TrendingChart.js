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
  const [loaded, setLoaded] = useState(false);

  const checkLoaded = () => {
    const { data } = props;
    if (data.length > 0) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    checkLoaded();
  }, [props]);

  return loaded ? (
    <Paper className='card-radius box-shadow'>
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
  ) : (
    <Paper className='card-radius box-shadow'>
      <Chart data={[{ date: moment().format('DD-MM-YY'), value: 50000 }]}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField='value' argumentField='date' name='loading ...' />
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
