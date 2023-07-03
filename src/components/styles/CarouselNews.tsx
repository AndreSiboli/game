import { useEffect, useRef, useState } from 'react';
import { news as items } from '@/fake-api/news';
import styles from '@/styles/styles/CarouselNews.module.scss';
import News from './News';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function CarouselNews() {
    const parentNews: any = useRef();
    const newsEl: any = useRef();
    const [news, setNews] = useState(0);
    const [config, setConfig] = useState(4);

    function defineCell() {
        const width = window.innerWidth
        if (width > 768) setConfig(4);
        // if (width <= 768 && width > 500) setConfig(3);
        if (width <= 500) setConfig(2);
    }

    useEffect(() => {
        const getChildrens = newsEl.current.children[0]
        const totalChildren = getChildrens.children.length; //get the children length
        parentNews.current.style.left = -newsEl.current.clientWidth * 0 + 'px';
        parentNews.current.style.width = `${Math.floor(totalChildren / config) * 100}%`;
        defineCell();
    }, []);

    useEffect(() => {
        function resize() {
            console.log(newsEl.current.clientWidth)
            parentNews.current.style.left = -(news * -newsEl.current.clientWidth) + 'px';
            defineCell();
        }

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [news]);

    function carousel(value: number) {
        const imageWidth = newsEl.current.clientWidth;
        const totalChildren = newsEl.current.children[0].children.length;
        const totalNews = Math.ceil(totalChildren / config) - 1;

        if (news === 0 && value === 1) {
            parentNews.current.style.left = -totalNews * imageWidth + 'px';
            setNews(-totalNews);
        } else if (news === -totalNews && value === -1) {
            parentNews.current.style.left = 0 * imageWidth + 'px';
            setNews(0);
        } else {
            parentNews.current.style.left = (news + value) * imageWidth + 'px';
            setNews((prevValue) => prevValue + value);
        }
    }

    function renderNews() {
        const newItems = [...items, ...items, ...items];
        while (newItems.length % 4 != 0) {
            newItems.push({
                date: '',
                title: '',
                to: '',
            });
        }

        console.log(1240 / config);
        return newItems.map((item, index) => (
            <News
                date={item.date}
                title={item.title}
                to={item.to}
                key={item.title + index}
                style={{ maxWidth: `calc((1240px / ${config}) - 1.5em)` }}
            />
        ));
    }

    return (
        <>
            <div className={styles.blog_button}>
                <button onClick={() => carousel(1)}>
                    <FaAngleLeft />
                </button>
                <button onClick={() => carousel(-1)}>
                    <FaAngleRight />
                </button>
            </div>
            <div className={styles.news_container} ref={newsEl}>
                <div className={styles.carousel_news} ref={parentNews}>
                    {config && renderNews()}
                </div>
            </div>
        </>
    );
}
