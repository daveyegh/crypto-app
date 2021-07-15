import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import './NewsPage.css';

function News() {
    const [newsData, setNews] = useState(null);
    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        const result = await axios.get('https://api.coinstats.app/public/v1/news?skip=10&limit=100');
        const news = await result.data;
        setNews(news)
    }

    console.log(newsData)

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
                    newsData?.news.map(item => {
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