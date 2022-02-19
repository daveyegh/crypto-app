import {
    ADD_TO_WATCHLIST,
    CHART_PERIOD,
    COIN_CHART,
    COIN_DETAILS,
    COIN_INFO,
    DELETE_FROM_WATCHLIST,
    NEWS,
    UPDATE_WATCHLIST_COINS
} from "../actionTypes/actionTypes";

const initialState = {
    coins: [],
    coinDetails: {},
    chartInfo: [],
    coinDescription: "",
    news: [],
    watchlistCoins: [],
}

function mainReducer(state = initialState, action) {
    switch(action.type) {
        case COIN_INFO:
            return {
                ...state,
                coins: action.coins
            }
        case COIN_DETAILS:
            return {
                ...state,
                coinDetails: action.coinDetails,
                coinDescription: action.coinDetails.description.en,
            }
        case COIN_CHART:
            return {
                ...state,
                chartInfo: action.chartInfo,
            }
        case CHART_PERIOD:
            return {
                ...state,
                chartInfo: action.chartInfo
            }
        case NEWS:
            return {
                ...state,
                news: action.news,
            }
        case ADD_TO_WATCHLIST:
            const addedCoin = [...state.watchlistCoins, action.addedCoin]
            localStorage.setItem('watchlist', JSON.stringify(addedCoin));
            return {
                ...state,
                watchlistCoins: addedCoin,
            }
        case DELETE_FROM_WATCHLIST:
            const deletedFromWatchList = state.watchlistCoins.filter(item => item.id !== action.id);
            localStorage.setItem('watchlist', JSON.stringify(deletedFromWatchList));
            console.log(deletedFromWatchList);

            return {
                ...state,
                watchlistCoins: [...deletedFromWatchList]
            }
        case UPDATE_WATCHLIST_COINS:
            return {
                ...state,
                watchlistCoins: action.watchlistCoins
            }
    }
    return state;
}

export default mainReducer;