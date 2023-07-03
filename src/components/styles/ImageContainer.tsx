import styles from '@/styles/styles/ImageContainer.module.scss';
import Img from './Img';

interface PropTypes {
    img: string;
    name: string;
}

export default function ImageContainer(props: PropTypes) {
    const { img, name } = props;

    return (
        <div className={styles.image}>
            <div className={styles.image_container}>
                <Img src={img} alt="" style={{ width: '100%', height: '100%' }} />
            </div>
            <p>{name}</p>
        </div>
    );
}
