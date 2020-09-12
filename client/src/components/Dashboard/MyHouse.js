import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import FormChart from './FormChart';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import AddIcon from '@material-ui/icons/Add';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import '../../assets/scss/style.scss';
import '../../../src/App.css';
import style from '../../App.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  lazyImage: {
    width: '100%',
    'max-height': '300px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    boxShadow: '10px 5px 5px 5px #437779',
  },
  block: {
    display: 'block',
  },
}));

const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '3px',
  },
};

export default withRouter(function MyHouse(props) {
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkLoaded = () => {
    const { imageData, street, description, value, finalhousevalue } = props;

    if (finalhousevalue > 0) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    checkLoaded();
  }, [props]);

  return loaded ? (
    <Paper className='card-radius box-shadow'>
      <Card className='card-radius-top'>
        <CardMedia component='img' image={props.imageData} title='My House' />
        <CardContent className={classes.block}>
          <h4 className='fontCinzelLgNoShadow'>
            {props.street}, {props.city}, {props.state}
          </h4>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableRow>
                <TableCell component='th' scope='row'></TableCell>
                <TableCell
                  align='center'
                  className='fontCinzelLgNoShadow'
                ></TableCell>
                <TableCell align='center'>
                  ${' '}
                  {props.value > 0
                    ? props.value.toLocaleString()
                    : props.realtorprice.toLocaleString()}
                </TableCell>
                <TableCell align='center'>Similar Homes Calculation</TableCell>
              </TableRow>
              <TableRow style={{ borderBottom: '0' }}>
                <TableCell component='th' scope='row'></TableCell>
                <TableCell align='center'>
                  <AddIcon />
                </TableCell>
                <TableCell align='center'>
                  $ {props.reno.toLocaleString()}
                </TableCell>
                <TableCell align='center' color='secondary'>
                  Renovation Additions
                </TableCell>
              </TableRow>

              {/* <TableRow style={{ backgroundColor: '#437779' }}> */}
              <TableRow style={{ backgroundColor: '#437779' }}>
                <TableCell component='th' scope='row'></TableCell>
                <TableCell align='center'></TableCell>
                <TableCell align='center'>
                  $ {props.finalhousevalue.toLocaleString()}
                </TableCell>
                <TableCell align='center'>
                  I SPY REFI Final Assessment
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Accordion className='card-radius-bottom' align='center'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <AccountBalanceIcon className='fontCinzelLgNoShadow' />
          <Typography
            className='paddingleft'
            color='textSecondary '
            gutterBottom
            align='center'
          >
            Home Reno Chart
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <button type='button' onClick={handleOpen}>
            Renovation Data
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            <FormChart data={props} />
          </Modal>
          <Typography
            align='center'
            color='textSecondary '
            gutterBottom
            align='center'
          >
            <Button
              size='small'
              className='button'
              onClick={(e) => {
                e.preventDefault();
                props.history.push('/additions');
              }}
            >
              Update House
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='card-radius-bottom' align='center'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <AccountBalanceIcon className='fontCinzelLgNoShadow' />
          <Typography
            className='paddingleft'
            color='textSecondary '
            gutterBottom
            align='center'
          >
            Refinance Rates in area
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'></TableCell>
                  <TableCell align='center'>
                    {props.financeRates.average_rate_30_year_fha} %
                  </TableCell>
                  <TableCell align='center' className='fontCinzelBlack'>
                    30 year FHA
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'></TableCell>
                  <TableCell align='center'>
                    {props.financeRates.average_rate_30_year_va} %
                  </TableCell>
                  <TableCell align='center'>30 year VA</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'></TableCell>
                  <TableCell align='center'>
                    {props.financeRates.average_rate_30_year} %
                  </TableCell>
                  <TableCell align='center'>30 year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'></TableCell>
                  <TableCell align='center'>
                    {props.financeRates.average_rate_20_year} %
                  </TableCell>
                  <TableCell align='center'>20 year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'></TableCell>
                  <TableCell align='center'>
                    {props.financeRates.average_rate_15_year} %
                  </TableCell>
                  <TableCell align='center'>15 year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'></TableCell>
                  <TableCell align='center'>
                    {props.financeRates.average_rate_10_year} %
                  </TableCell>
                  <TableCell align='center'>10 year</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Paper>
  ) : (
    <Paper className='card-radius box-shadow'>
      <Card className='card-radius-top'>
        <CardActionArea>
          <CardMedia className={classes.lazyImage} title='My House'>
            <CircularProgress className={'mt-4'} />
          </CardMedia>
          <CardContent align='center'>
            <h4>Calculating House Assessment</h4>
            <LinearProgress />
          </CardContent>
        </CardActionArea>
      </Card>
      <Accordion className='card-radius-bottom'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography color='textSecondary' gutterBottom></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardActions className={classes.root}>
            <Button size='small' className='button'>
              Update home renovation
            </Button>
          </CardActions>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});
