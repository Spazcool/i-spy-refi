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
// import { Plugin } from '@devexpress/dx-react-core';
import { scaleBand } from '@devexpress/dx-chart-core';
import {
  EventTracker,
  HoverState,
  Animation,
  ArgumentScale,
  Stack,
  ValueScale
} from '@devexpress/dx-react-chart';

export default function TrendingChart(props) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([{date: moment().format('DD-MM-YY'), value: 0}]);

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
  
  return (
    <Paper className='card-radius box-shadow'>
      <Chart data={ data }>
        <ArgumentScale factory={scaleBand} />
        <ValueScale name="fuck"/>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField='value' argumentField='date' name={loaded ? 'value' :'loading ...'} />
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
