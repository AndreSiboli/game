import styles from '@/styles/form/SubmitButton.module.scss';
import { useEffect, useState } from 'react';

interface PropTypes {
    text: string;
    theme: string;
    handleSubmit: Function;
}

export default function SubmitButton(props: PropTypes) {
    const { text, theme, handleSubmit } = props;

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
            {text}
        </button>
    );
}
