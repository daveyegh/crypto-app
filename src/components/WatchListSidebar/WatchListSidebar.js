import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import './WatchListSidebar..css'
import {Button} from "reactstrap";
import {deleteFromWatchlist, updateWatchlist} from "../../redux/actions/actions";

const WatchListSidebar = () => {
    const watchlist = useSelector(store => store.watchlistCoins);
    const dispatch = useDispatch();
    const localItems = JSON.parse(localStorage.getItem('watchlist'));

    useEffect(() => {
        if(localItems.length > 0) {
            dispatch(updateWatchlist(localItems))
        }
    }, [])

    return (

        <div className="watchlist-sidebar">
            <h1>Watchlist</h1>
            <ul className="watchlist-sidebar__items">
                {
                    watchlist.length ? watchlist.map(item => {
                        return (
                            <li key={item.id} className="watchlist-sidebar__item">
                                <div className="watchlist-sidebar__img">
                                    <img src={item.icon} alt=""/>
                                    <span>{item.name}</span>
                                </div>
                                <span>{item.price.toFixed(2)}</span>
                                <span>{item.currentPrice}</span>
                                <Button onClick={() => dispatch(deleteFromWatchlist(item.id))}>Remove From Watchlist</Button>
                            </li>
                        )
                    }) : localItems.length ? localItems.map(item => {
                        return (
                            <li key={item.id} className="watchlist-sidebar__item">
                                <div className="watchlist-sidebar__img">
                                    <img src={item.icon} alt=""/>
                                    <span>{item.name}</span>
                                </div>
                                <span>{item.price.toFixed(2)}</span>
                                <span>{item.currentPrice}</span>
                                <Button onClick={() => dispatch(deleteFromWatchlist(item.id))}>Remove From Watchlist</Button>
                            </li>
                        )
                    }) : <h3>Your watch list is empty.</h3>
                }
            </ul>

        </div>
    );
};

export default WatchListSidebar;