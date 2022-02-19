import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {getCoins} from "../../redux/actions/actions";

import Coin from '../../components/Coin/Coin'
import {BounceLoader} from "react-spinners";

import './Coins.css'

function Coins() {
    const dispatch = useDispatch();
    const coinList = useSelector(store => store.coins);

    useEffect(() => {
        dispatch(getCoins())
    }, []);

    return (
        coinList.length > 0 ? <div className="Coins">
            <div className="Coins__text">
                <h1 className="Coins__title">Cryptocurrency live prices</h1>
                <p className="Coins__subtitle">Watch the list of all popular cryptocurrencies and their prices change.</p>
            </div>
            {
                coinList.map(item => {
                    return (
                        <Coin key={item.market_cap_rank} id={item.id} icon={item.image} name={item.name} price={item.price_change_24h} currentPrice={item.current_price} symbol={item.symbol} />
                    )
                })
            }
        </div> : <BounceLoader size={60} />
    )
}

export default Coins;