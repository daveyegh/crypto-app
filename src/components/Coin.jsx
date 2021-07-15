import React from 'react'
import { Link } from 'react-router-dom';

import '../components/Coin.css'

function Coin(props) {
    let item = props;
    return (
        <div>
            <div className="Coin" key={item.marketCap}>
                <img src={item.icon} alt="" />
                <h5><Link className="Coin__link" to={`/coins/${item.id}`}>{item.name}</Link></h5>
                <p className="Coin__text">{item.price} $</p>
                <p className="Coin__text">{item.market_cap}</p>
                <p className="Coin__text">{item.currentPrice} $</p>
                <p className="Coin__text">{item.symbol}</p>
            </div>
        </div>
    )
}

export default Coin;