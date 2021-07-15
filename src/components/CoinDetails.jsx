import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import '../components/CoinDetails.css'


function CoinDetails({match}) {
    const [coinInfo, setCoinInfo] = useState(null);
    const [coinDescription, setDescription] = useState("");
    const [dataChart, setDataChart] = useState([]);
    const [date, setDate] = useState([])
    useEffect(() => {
        let symbol = match.params.symbol;
        getDetails(symbol);
        getChartInfo(symbol)
    }, [])

    const getDetails = async (symbol) => {
        const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
        const coinData = await result.data;
        setCoinInfo(coinData);
        setDescription(coinData?.description?.en)
    }

    const getChartInfo = async (symbol) => {
        const result = await axios.get(`https://api.coinstats.app/public/v1/charts?period=all&coinId=${symbol}`);
        const chartData = await result.data;
        // console.log(chartData)
        // setChartInfo(chartData?.chart)
        setDataChart(chartData?.chart.map(el=> el[1]))
        console.log(chartData.chart)
        setDate(chartData?.chart.map((data) => {
            let date = new Date(data[0]*1000);
            let day  = date.getDay();
            let month = date.getMonth();
            let year  = date.getFullYear();
            return String(day + '/' + month + '/' + year);
        }))

        // date.forEach(data => {
            
        //     console.log(item)
        // })
    }

   const handleClick = async (period, name) => {
        const result = await axios.get(`https://api.coinstats.app/public/v1/charts?period=${period}&coinId=${name}`)
        const periodData = await result.data;
        setDataChart(periodData.chart.map(el => el[1]))
        setDate(periodData?.chart.map((data) => {
            let date = new Date(data[0]*1000);
            let day  = date.getDay();
            let month = date.getMonth() + 1;
            let year  = date.getFullYear();
            return String(day + '/' + month + '/' + year);
        }))
        console.log(periodData?.chart)
    }

    const options = {
        title: {
          text: `${match.params.symbol} 's price 1y interval change`
        },
        series: [{
          data: dataChart
        }],
        xAxis: {
            labels: {
              enabled: true,
              formatter: function () {
                return date[this.value];
              },
            },
        },
        // data: {
            // dateFormat: "dd/mm/YYYY",
        // },
        colors: [
            "#c42525",
            "#c42525",
            "#c42525",
            "#910000",
            "#c42525",
            "#c42525",
            "#c42525",
            "#c42525",
            "#c42525",
            "#c42525",
        ],
        rangeSelector: {
            enabled: false,
            selected: 1,
        },
    }

    if(!coinInfo) return null;

    return (
        <div className="coindetails-wrapper">
        <div className="coindetails-top">
            <div className="coindetails-top__text">
                <div className="coin-row">
                    <img src={coinInfo?.image?.small} alt="" />
                    <Typography className="coindetails-top__name" variant="h4" component="h4">{coinInfo.name}</Typography>
                    <Typography style={{margin: '0 5px'}} className="coindetails-top__symbol" variant="h6" component="h6">{coinInfo.symbol}</Typography>
                </div>
                <div className="coin-row">
                    <Typography className="coindetails-top__rank"  variant="subtitle1" gutterBottom>
                        Rank #{coinInfo?.market_data?.market_cap_rank}
                    </Typography>

                </div>
            </div>
            <div className="coindetails-top__market">
                <div className="coindetails-top__market-price">
                    <Typography variant="h3">${coinInfo?.market_data?.current_price?.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
                    <Typography style={{color: coinInfo?.market_data?.price_change_percentage_24h > 0 ? 'green' : 'red' }} variant="h6">{coinInfo?.market_data?.price_change_percentage_24h}%</Typography>
                    <div className="coindetails-top__market-low-high">
                        <Typography style={{margin: '0 15px'}} variant="h6">Low: ${coinInfo?.market_data?.low_24h?.usd}</Typography>
                        <Typography variant="h6">High: ${coinInfo?.market_data?.high_24h?.usd}</Typography>
                    </div>
                </div>
            </div>
        </div>
        <div className="coindetails__description">
            <Typography variant="subtitle1">
                {ReactHtmlParser(coinDescription)}
            </Typography>
        </div>
        <div className="coindetails__market">
            <div className="coindetails__market-info">
                <div className="coindetails__market-cap">
                    <Typography variant="h4">
                        Market Cap
                    </Typography>
                    <Typography variant="h6">${coinInfo?.market_data?.market_cap?.usd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Typography>
                </div>
                <div className="coindetails__market-update">
                    <Typography variant="h4">
                        Updates
                    </Typography>
                    <Typography variant="h6">
                        Last Updated: {new Date(coinInfo?.market_data?.last_updated).getDay() + '/' + new Date(coinInfo?.market_data?.last_updated).getMonth() + '/' + new Date(coinInfo?.market_data?.last_updated).getFullYear()}
                    </Typography>
                </div>
                <div className="coindetails__market-supply">
                    <Typography variant="h4">
                        Total Supply
                    </Typography>
                    <span>Max Supply: {coinInfo?.market_data?.max_supply}</span>
                    <span>Total Supply: {coinInfo?.market_data?.total_supply}</span>
                </div>
            </div>
        </div>
        <div className="coindetails__links">
            <div className="coindetails__links-title">
                <Typography variant="h4">
                    Links
                </Typography>
            </div>
            <div className="coindetails__links-item">
                <Typography variant="h6">
                    Official Web Page: <a about="_blank" href={coinInfo?.links?.homepage[0]}>{coinInfo?.links?.homepage[0]}</a>
                </Typography>
                <Typography variant="h6">
                    Twitter: {coinInfo?.links?.twitter_screen_name}
                </Typography>
            </div>
        </div>
        <div className="coindetails__chart">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            <div className="coindetails__chart-buttons">
                <button onClick={() => handleClick('24h', match.params.symbol)} className="btn btn-primary">24H</button>
                <button onClick={() => handleClick('1w', match.params.symbol)} className="btn btn-primary">1W</button>
                <button onClick={() => handleClick('1m', match.params.symbol)} className="btn btn-primary">1M</button>
                <button onClick={() => handleClick('3m', match.params.symbol)} className="btn btn-primary">3M</button>
                <button onClick={() => handleClick('6m', match.params.symbol)} className="btn btn-primary">6M</button>
                <button onClick={() => handleClick('1y', match.params.symbol)} className="btn btn-primary">1Y</button>
                <button onClick={() => handleClick('all', match.params.symbol)} className="btn btn-primary">ALL</button>
            </div>
        </div>
    </div>
    )
    
}

export default CoinDetails;