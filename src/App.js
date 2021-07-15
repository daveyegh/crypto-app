import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom'

import News from './pages/NewsPage';

import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Link style={{ textDecoration: 'none', color: 'black'}} to="/coins"><Button style={{border: '1px solid #3f51b5'}} type="outlined" color="primary">Coins</Button></Link>
        <Link style={{ textDecoration: 'none', color: 'black'}} to="/news"><Button style={{border: '1px solid #3f51b5'}} type="outlined" color="primary">News</Button></Link>
      </div>
      <Switch>
        <Route path="/" exact />
        <Route path="/coins" exact component={Coins} />
        <Route path="/news" exact component={News} />
        <Route path="/coins/:symbol" component={CoinDetails} />
      </Switch>
    </Router>
  );
}

export default App;
