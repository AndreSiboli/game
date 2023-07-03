import styles from '@/styles/styles/Schedules.module.scss';
import Button from '../buttons/Button';
import Img from './Img';

interface PropTypes {
    title: string;
    src: string;
    date: string;
    hours: string;
    to: string;
}

export default function Schedules(props: PropTypes) {
    const { title, date, hours, src, to } = props;

    const imageStyle = { width: '100%', height: '100%' };

    return (
        <div className={styles.schedules}>
            <div className={styles.schedules_image}>
                <Img src={src} alt="" style={imageStyle} />
                <span className={styles.date}>{date}</span>
            </div>
            <div className={styles.schedules_info}>
                <div className={styles.schedules_title}>
                    <h1>{title}</h1>
                </div>
                <div className={styles.schedules_hours}>
                    <p>{hours}</p>
                </div>
                <div className={styles.schedules_button}>
                    <Button text="Exibir evento" theme="blueish" to={to} />
                </div>
            </div>
        </div>
    );
}
