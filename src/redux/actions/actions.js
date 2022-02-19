import {
    ADD_TO_WATCHLIST,
    CHART_PERIOD,
    COIN_CHART,
    COIN_DETAILS,
    COIN_INFO, DELETE_FROM_WATCHLIST,
    NEWS,
    SEARCH, UPDATE_WATCHLIST_COINS
} from "../actionTypes/actionTypes";
import axios from "axios";


export function getCoins() {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
            if (response?.data) {
                return dispatch({
                    type: COIN_INFO,
                    coins: response.data,
                })
            }

            return [];
        } catch (e) {
            return [];
        }
    }
}

export function getCoinDetails(coin) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
            if (response?.data) {
                return dispatch({
                    type: COIN_DETAILS,
                    coinDetails: response.data
                })
            }
            return {}
        } catch (e) {
            return {}
        }
    }
}

export function getCoinChart(coin) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://api.coinstats.app/public/v1/charts?period=all&coinId=${coin}`);
            if(response?.data) {
                return dispatch({
                    type: COIN_CHART,
                    chartInfo: response.data,
                })
            }
            return []
        } catch (e) {
            return []
        }
    }
}

export function changeChartPeriod(period,coin) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://api.coinstats.app/public/v1/charts?period=${period}&coinId=${coin}`)
            if(response?.data) {
                return dispatch({
                    type: CHART_PERIOD,
                    chartInfo: response.data,
                })
            }
            return []
        } catch(e) {
            return []
        }
    }
}

export function getNews() {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://api.coinstats.app/public/v1/news?skip=10&limit=100');
            if(response?.data) {
                return dispatch({
                    type: NEWS,
                    news: response.data
                })
            }
            return [];
        } catch(e) {
            return [];
        }
    }
}

export function addToWatchlist(coin) {
    return {
        type: ADD_TO_WATCHLIST,
        addedCoin: coin
    };
}

export function deleteFromWatchlist(id)  {
    return {
        type: DELETE_FROM_WATCHLIST,
        id
    };
}

export function updateWatchlist(coins) {
    return {
        type: UPDATE_WATCHLIST_COINS,
        watchlistCoins: coins,
    }
}