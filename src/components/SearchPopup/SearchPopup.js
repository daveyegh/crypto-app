import React from 'react';

import "./SearchPopup.css"
import {Link} from "react-router-dom";

const SearchPopup = ({searchItems, input}) => {
    const filteredSearch = searchItems.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))

    return (
        <div className="search-popup">
            <ul className="search-popup__items">
                {
                    filteredSearch.length ? filteredSearch?.map((item, index) => (
                        <li key={index} className="search-popup__item">
                            <img src={item.image} />
                            <Link to={`/coins/${item.id}`} className="search-popup__link">
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    )) : <p>There are no results.</p>
                }
            </ul>
        </div>
    )
};

export default SearchPopup;