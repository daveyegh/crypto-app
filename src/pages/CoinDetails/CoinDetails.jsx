import React, {useEffect, useState} from 'react';
import ReactHtmlParser from 'react-html-parser';
import {useDispatch, useSelector} from "react-redux";

import {Typography} from '@material-ui/core';
import {SocialIcon} from "react-social-icons";
import {BounceLoader} from "react-spinners";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import './CoinDetails.css'
import {getCoinDetails, getCoinChart, changeChartPeriod} from "../../redux/actions/actions";


function CoinDetails({match}) {
    const dispatch = useDispatch();

    const coinDetails = useSelector(store => store?.coinDetails);
    const coinChart = useSelector(store => store?.chartInfo);
    const coinDescription = useSelector(store => store?.coinDescription);

    const [dataChart, setDataChart] = useState([]);
    const [date, setDate] = useState([]);

    useEffect(() => {
        let coin = match.params.symbol;
        dispatch(getCoinChart(coin));
        dispatch(getCoinDetails(coin))
        formatChart()
    }, [])


    const formatChart = () => {
        setDataChart(coinChart?.chart?.map(el => el[1]));
        setDate(coinChart?.chart?.map((data) => {
            let date = new Date(data[0] * 1000);
            let day = date.getDay();
            let month = date.getMonth();
            let year = date.getFullYear();
            return String(day + '/' + month + '/' + year);
        }))
    }

    const options = {
        title: {
            text: `${match.params.symbol} 's price 1y interval change`
        },
        series: [{
            data: dataChart
        }],
        xAxis: {
            crosshair: true,
            labels: {
                enabled: true,
                formatter: function () {
                    return date[this.value];
                },
            },
        },
        yAxis: {
            crosshair: true,
        },
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
        tooltip: {
            shape: 'square',
            borderColor: 'black',
            backgroundColor: 'white',
            borderWidth: 0,
            boxShadow: '3px 2px 8px 5px rgba(0,0,0,0.55)',
        }
    }

    const changeChart = (period) => {
        let coin = match.params.symbol;
        dispatch(changeChartPeriod(period, coin))
        formatChart();
    }

    const formatSocialLink = (website, identifier, topLevelDomain) => `https://${website}.${topLevelDomain}/${identifier}`;

    const formatPrice = (price = 0) => {
        return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }


    return (
        coinDetails.length > 0 ? <div className="coindetails-loader">
            <BounceLoader size={60}/>
        </div> : <div className="coindetails-wrapper">
            <div className="coindetails-top">
                <div className="coindetails-top__text">
                    <div className="coin-row">
                        <img src={coinDetails?.image?.small} alt=""/>
                        <Typography className="coindetails-top__name" variant="h4"
                                    component="h4">{coinDetails.name}</Typography>
                        <Typography style={{margin: '0 5px'}} className="coindetails-top__symbol" variant="h6"
                                    component="h6">{coinDetails.symbol}</Typography>
                    </div>
                    <div className="coin-row">
                        <Typography className="coindetails-top__rank" variant="subtitle1" gutterBottom>
                            Rank #{coinDetails?.market_data?.market_cap_rank}
                        </Typography>

                    </div>
                </div>
                <div className="coindetails-top__market">
                    <div className="coindetails-top__market-price">
                        <Typography
                            variant="h3">${formatPrice(coinDetails?.market_data?.current_price?.usd)}</Typography>
                        <Typography
                            style={{color: coinDetails?.market_data?.price_change_percentage_24h > 0 ? 'green' : 'red'}}
                            variant="h6">{coinDetails?.market_data?.price_change_percentage_24h}%</Typography>
                        <div className="coindetails-top__market-low-high">
                            <Typography style={{margin: '0 15px'}} variant="h6">Low:
                                ${coinDetails?.market_data?.low_24h?.usd}</Typography>
                            <Typography variant="h6">High: ${coinDetails?.market_data?.high_24h?.usd}</Typography>
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
                        <Typography
                            variant="h6">${formatPrice(coinDetails?.market_data?.market_cap?.usd)}</Typography>
                    </div>
                    <div className="coindetails__market-update">
                        <Typography variant="h4">
                            Updates
                        </Typography>
                        <Typography variant="h6">
                            Last
                            Updated: {new Date(coinDetails?.market_data?.last_updated).getDay() + '/' + new Date(coinDetails?.market_data?.last_updated).getMonth() + '/' + new Date(coinDetails?.market_data?.last_updated).getFullYear()}
                        </Typography>
                    </div>
                    <div className="coindetails__market-supply">
                        <Typography variant="h4">
                            Total Supply
                        </Typography>
                        <span>Max Supply: {coinDetails?.market_data?.max_supply}</span>
                        <span>Total Supply: {coinDetails?.market_data?.total_supply}</span>
                    </div>
                </div>
            </div>
            <div className="coindetails__links">
                <div className="coindetails__links-title">
                    <Typography variant="h4">
                        Links
                    </Typography>
                </div>
                <div className="coindetails__links-items">
                    <Typography variant="h6">
                        Official Web Page: <a about="_blank"
                                              href={coinDetails?.links?.homepage[0]}>{coinDetails?.links?.homepage[0]}</a>
                    </Typography>
                    <div className='coindetails__links-row'>
                        <SocialIcon url={coinDetails?.links?.subreddit_url} target={'_blank'}/>
                        <SocialIcon
                            url={formatSocialLink('telegram', coinDetails?.links?.telegram_channel_identifier, 'me')}/>
                    </div>
                </div>
            </div>
            <div className="coindetails__chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
                <div className="coindetails__chart-buttons">
                    <button onClick={() => changeChart('24h', match.params.symbol)} className="btn btn-primary">24H
                    </button>
                    <button onClick={() => changeChart('1w', match.params.symbol)} className="btn btn-primary">1W
                    </button>
                    <button onClick={() => changeChart('1m', match.params.symbol)} className="btn btn-primary">1M
                    </button>
                    <button onClick={() => changeChart('3m', match.params.symbol)} className="btn btn-primary">3M
                    </button>
                    <button onClick={() => changeChart('6m', match.params.symbol)} className="btn btn-primary">6M
                    </button>
                    <button onClick={() => changeChart('1y', match.params.symbol)} className="btn btn-primary">1Y
                    </button>
                    <button onClick={() => changeChart('all', match.params.symbol)} className="btn btn-primary">ALL
                    </button>
                </div>
            </div>
        </div>

    )

}

export default CoinDetails;