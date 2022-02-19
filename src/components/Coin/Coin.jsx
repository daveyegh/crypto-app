import React from 'react'
import { Link } from 'react-router-dom';

import './Coin.css'
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {addToWatchlist} from '../../redux/actions/actions'

function Coin(props) {
    let item = props;
    const dispatch = useDispatch();

    return (
        <div>
            <div className="Coin" key={item.marketCap}>
                <img src={item.icon} alt="" />
                <h5><Link className="Coin__link" to={`/coins/${item.id}`}>{item.name}</Link></h5>
                <p className="Coin__text">{item.price.toFixed(6)} $</p>
                <p className="Coin__text">{item.market_cap}</p>
                <p className="Coin__text">{item.currentPrice} $</p>
                <p className="Coin__text">{item.symbol}</p>
                <Button type="button" onClick={() => dispatch(addToWatchlist(item))}>Add to Watchlist</Button>
            </div>
        </div>
    )
}

export default Coin;