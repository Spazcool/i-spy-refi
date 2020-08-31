import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function FormChart (props) {
  return(
    <Paper>
      <Chart data={props.data}>
        <PieSeries valueField="area" argumentField="country"/>
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
