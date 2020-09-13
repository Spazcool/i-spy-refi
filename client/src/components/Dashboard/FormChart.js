import React, { useState, useEffect } from 'react';

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

export default function FormChart(props) {
  const [loaded, setLoaded] = useState(false);
  const [userHouseData, setUserHouseData] = useState([]);
  const checkLoaded = () => {
    const { formData } = props.data;
    setUserHouseData(formData);
    if (formData.length > 0) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    checkLoaded();
  }, [props, userHouseData]);

  return loaded ? (
    <Chart data={userHouseData}>
      <PieSeries valueField='value' argumentField='room' />
      <Animation />
      <Legend />
      <Title text='Approximate Renovation Value' />
      <EventTracker />
      <HoverState />
      <Tooltip />
    </Chart>
  ) : (
    <Chart data={[{ room: 'loading ...', value: 1 }]}>
      <PieSeries valueField='value' argumentField='room' />
      <Animation />
      <Legend />
      <Title text='Approximate Renovation Value' />
      <EventTracker />
      <HoverState />
      <Tooltip />
    </Chart>
  );
}
