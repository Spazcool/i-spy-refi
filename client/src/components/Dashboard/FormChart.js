import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';

import {
  Chart,
  PieSeries,
  Legend,
  Title,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {
  EventTracker,
  HoverState,
  Animation,
} from '@devexpress/dx-react-chart';

// TODO SPECIFY COLORS THAT MATCH OUR LOOK
// https://devexpress.github.io/devextreme-reactive/react/chart/docs/guides/palette/

export default function FormChart(props) {
  const [loaded, setLoaded] = useState(false);

  const checkLoaded = () => {
    const { formData } = props.data;
    console.log(formData);
    if (formData.length > 0) {
      // setLoaded(true);
    }
  };

  useEffect(() => {
    checkLoaded();
  }, [props]);

  return loaded ? (
    <Paper className='card-radius box-shadow'>
      <Chart data={props.formData}>
        <PieSeries valueField='value' argumentField='room' />
        <Animation />
        <Legend />
        <Title text='Approximate Renovation Value' />
        <EventTracker />
        <HoverState />
        <Tooltip />
      </Chart>
    </Paper>
  ) : (
    <Paper className='card-radius box-shadow'>
      <Chart data={[{ room: 'loading ...', value: 1 }]}>
        <PieSeries valueField='value' argumentField='room' />
        <Animation />
        <Legend />
        <Title text='Approximate Renovation Value' />
        <EventTracker />
        <HoverState />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
