import styles from '@/styles/form/SubmitButton.module.scss';
import { useEffect, useState } from 'react';

interface PropTypes {
    text: string;
    textLoading: string;
    textFinish: string;
    theme: string;
    useLoading: {
        loading: Boolean;
        setLoading: Function;
    };
    handleSubmit: Function;
}

export default function SubmitButton(props: PropTypes) {
    const { text, theme, handleSubmit, textLoading, textFinish, useLoading } = props;
    const { loading, setLoading } = useLoading;
    const [load, setLoad] = useState<Boolean | null>(null);

    useEffect(() => {
        if (!loading) return;
        setLoad(false);

        setTimeout(() => {
            setLoad(true);
        }, 1000);

        setTimeout(() => {
            setLoad(null);
            setLoading(false);
        }, 2500);
    }, [loading, setLoading]);

    const submit = () => {
        handleSubmit();
    };

    return (
        <button
            className={`${styles.button} ${styles[theme]}`}
            onClick={() => {
                submit();
            }}
        >
            {load === null && text}
            {load === false && textLoading}
            {load === true && textFinish}
        </button>
    );
}
