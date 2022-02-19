import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';

import { Button, Input } from 'reactstrap';
import SearchPopup from "../SearchPopup/SearchPopup";

import './Search.css'
import {getCoins} from "../../redux/actions/actions";

function Search() {
    const dispatch = useDispatch()
    const coins = useSelector(store => store.coins);
    const [showSearchPopup, setSearchPopup] = useState(false);
    const [searchText, setSearchText] = useState('')

    const handleSearch = (input) => {
        if(coins.length === 0) dispatch(getCoins());
        if(input.length === 0) {
            setSearchPopup(false)
        } else {
            setSearchPopup(true)
        }
        setSearchText(input);
    }

    return (
        <div className="search">
            <div className="search-input">
                <Input placeholder="Search" onChange={e => handleSearch(e.target.value)} />
                {
                    showSearchPopup && <SearchPopup input={searchText} searchItems={coins} />
                }
            </div>

            <Link to={
                {
                    pathname: `/coins/${searchText}`,
                }
            }><Button>Search</Button></Link>
        </div>
    );

}

export default Search;