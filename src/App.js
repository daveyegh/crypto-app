import React, {useState} from "react";
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

import News from "./pages/News/News";
import Coins from "./pages/Coins/Coins";
import CoinDetails from "./pages/CoinDetails/CoinDetails";

import Search from "./components/Search/Search";
import {Transition} from "react-transition-group";
import {Button, makeStyles} from "@material-ui/core";

import './App.css'
import WatchListSidebar from "./components/WatchListSidebar/WatchListSidebar";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

function App() {
    const [openSidebar, setOpenSidebar] = useState(false)
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <div className="wrapper">
                    <div className="left">
                        <div className="df">
                            <Link style={{textDecoration: "none", color: "black"}} to="/coins">
                                <Button
                                    style={{border: "1px solid #3f51b5"}}
                                    type="outlined"
                                    color="primary"
                                >
                                    Coins
                                </Button>
                            </Link>
                            <Link style={{textDecoration: "none", color: "black"}} to="/news">
                                <Button
                                    style={{border: "1px solid #3f51b5"}}
                                    type="outlined"
                                    color="primary"
                                >
                                    News
                                </Button>
                            </Link>
                            <Search/>
                        </div>
                    </div>
                    <div className="right">
                        <Button variant="contained" onClick={() => setOpenSidebar(!openSidebar)}>Watchlist</Button>
                    </div>
                </div>
            </div>
            {openSidebar && (
                    <Transition in={openSidebar} timeout={300}>
                        <WatchListSidebar />
                    </Transition>
                )
            }
            <Switch>
                <Route path="/" exact />
                <Route path="/coins" exact component={Coins} />
                <Route path="/coins/:symbol" component={CoinDetails} />
                <Route path="/news" exact component={News} />
            </Switch>
        </Router>
    );
}

export default App;
