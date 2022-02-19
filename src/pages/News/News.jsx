import React from 'react';
import { useEffect } from 'react';

import './News.css';
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../redux/actions/actions";

function News() {
    const dispatch = useDispatch()
    const { news } = useSelector(store => store.news);

    useEffect(() => {
        dispatch(getNews());
    }, [])

    return (
        <div className="news">
            <div className="news__hero">
                <div className="news__text">
                    <h1 className="news__title">
                        Crypto News
                    </h1>
                    <p className="news__subtitle">
                        All crypto news from past month in one place
                    </p>
                </div>
            </div>
            <div className="news__items">
                {
                    news?.map(item => {
                        return <div class="card" key={item.id}>
                            <img class="card-img-top" src={!item.imgURL ? 'https://www.entspecialistspc.com/wp-content/uploads/2018/12/no-image.jpg': item.imgURL} />
                            <div class="card-body">
                                <h5 class="card-title">{item.title}</h5>
                                <p class="card-text">{item.description}</p>
                                <p className="card-text">Page Source: {item.source}</p>
                                <a href={item.link} class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default News;