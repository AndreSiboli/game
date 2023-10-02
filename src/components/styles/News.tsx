import styles from '@/styles/styles/News.module.scss';
import { FaLongArrowAltRight } from 'react-icons/fa';

interface PropTypes {
    date: string;
    title: string;
    to: string;
    style: {};
}

export default function News(props: PropTypes) {
    const { date, title, to, style } = props;

    return (
        <>
            {date || title || to ? (
                <div className={styles.news}>
                    <div className={styles.news_container}>
                        <div className={styles.news_date}>
                            <span>{date}</span>
                        </div>
                        <div className={styles.news_title}>
                            <p>{title}</p>
                        </div>
                        <div className={styles.read_more}>
                            <span>
                                Ler mais <FaLongArrowAltRight />
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ ...style, width: '100%' }}></div>
            )}
        </>
    );
}
