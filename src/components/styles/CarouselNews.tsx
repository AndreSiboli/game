import { useEffect, useRef, useState } from 'react';
import { news as items } from '@/fake-api/news';
import styles from '@/styles/styles/CarouselNews.module.scss';
import News from './News';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function CarouselNews() {
    const newItems = [...items, ...items, ...items];
    const parentNews = useRef<HTMLDivElement>(null);
    const newsEl = useRef<HTMLDivElement>(null);
    const [currentNews, setCurrentNews] = useState(0);
    const [config, setConfig] = useState(4);

    useEffect(() => {
        function resize() {
            if (!parentNews.current) return;
            parentNews.current.style.scrollBehavior = 'auto';
            parentNews.current.scrollLeft = parentNews.current.offsetWidth * currentNews;
            parentNews.current.style.scrollBehavior = 'smooth';
        }

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [currentNews]);

    useEffect(() => {
        function defineConfig() {
            const width = window.innerWidth;
            if (width > 1000) setConfig(4);
            else if (width > 500) setConfig(3);
            else setConfig(2);
        }

        window.addEventListener('resize', defineConfig);
        defineConfig();

        return () => {
            window.removeEventListener('resize', defineConfig);
        };
    }, []);

    function carousel(value: number) {
        if (!parentNews.current) return;

        const imageWidth = parentNews.current.offsetWidth;

        const next = currentNews + value;
        const count = Math.floor((newItems.length - 1) / config);

        if (next <= -1) {
            parentNews.current.scrollLeft = imageWidth * count;
            setCurrentNews(count);
            return;
        }
        if (next > count) {
            parentNews.current.scrollLeft = 0;
            setCurrentNews(0);
            return;
        }

        parentNews.current.scrollLeft = imageWidth * next;
        setCurrentNews(next);
    }

    function renderNews() {
        // while (newItems.length % 4 != 0) {
        //     newItems.push({
        //         date: '',
        //         title: '',
        //         to: '',
        //     });
        // }

        return newItems.map((item, index) => (
            <News
                date={item.date}
                title={item.title}
                to={item.to}
                key={item.title + index}
                style={{}}
            />
        ));
    }

    return (
        <>
            <div className={styles.blog_button}>
                <button onClick={() => carousel(-1)}>
                    <FaAngleLeft />
                </button>
                <button onClick={() => carousel(1)}>
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
