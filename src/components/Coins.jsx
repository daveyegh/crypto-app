import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SyncLoader } from 'react-spinners'

import Coin from './Coin'

import './Coins.css'

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Coins() {
    const [coinList, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#000000");


    useEffect(() => {
        getCoinInfo();

        setLoading(true);

        setTimeout(() => {
            setLoading(false)
        }, 2000)

    }, []);
  
    const getCoinInfo = async () => {
      const result = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      const coins = result.data;
      coins.sort((itemPrev, itemNext) => {
            return itemNext.market_cap > itemPrev.market_cap;
      });
      setCoins(coins);
      console.log(coins)
    }

    const getChartInfo = async () => {
        
    }

    return (
            <div className="Coins">
                {
                    loading
                    ?
                    <SyncLoader color={color} loading={loading} css={override} size={10} />
                    : 
                    coinList.map(item => {
                        return (
                            <Coin key={item.market_cap_rank} id={item.id} icon={item.image} name={item.name} price={item.price_change_24h} currentPrice={item.current_price} symbol={item.symbol} />
                        )
                    })
                }
            </div>
    )
}

export default Coins;