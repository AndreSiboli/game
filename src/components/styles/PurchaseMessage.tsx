import styles from '@/styles/styles/PurchaseMessage.module.scss';

interface PropTypes {
    title: string;
    text: string;
}

export default function PurchaseMessage(props: PropTypes) {
    const { title, text } = props;

    return (
        <div className={styles.purchase}>
            <div className={styles.purchase_container}>
                <div>
                    <h2>{title}</h2>
                </div>
                <div>
                    <p>{text}</p>
                </div>
                <div className={styles.loading}>
                    <div className={styles.loading_bar}></div>
                </div>
            </div>
        </div>
    );
}
