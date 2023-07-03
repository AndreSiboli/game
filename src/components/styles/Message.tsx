import styles from '@/styles/styles/Message.module.scss';

interface PropTypes {
    title: string;
    text: string;
    type: string;
    handleMessage: Function;
}

export default function SubmitButton(props: PropTypes) {
    const { title, text, type, handleMessage } = props;

    const close = () => {
        handleMessage();
    };

    return (
        <div className={`${styles.message} ${styles[type]}`}>
            <div className={styles.message_wrapper}>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
            <div className={styles.message_button}>
                <button onClick={close}>OK</button>
            </div>
        </div>
    );
}
