import React, { useState, useEffect, useContext } from 'react';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { zillow } from '../api/zillow';
import moment from 'moment'; //for fake data, can be removed or used elsewhere when the fake data is pulled out

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CompList from '../components/Dashboard/CompList';
import MyHouse from '../components/Dashboard/MyHouse';
import FormChart from '../components/Dashboard/FormChart';
import TrendingChart from '../components/Dashboard/TrendingChart';

import '../App.css';

function Home(props) {


    
}