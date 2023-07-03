import styles from '@/styles/form/Input.module.scss';
import { ChangeEvent } from 'react';

interface PropTypes {
    type: string;
    id: string;
    handleInput: Function;
    text?: string;
    value?: string | number;

    max?: number;
    min?: number;
}

export default function Input(props: PropTypes) {
    const { type, text, id, value, handleInput, min, max } = props;

    function input(e: ChangeEvent) {
        handleInput(e);
    }

    return (
        <input
            type={type}
            id={id}
            name={id}
            className={styles.input}
            value={value}
            onChange={(e: ChangeEvent) => input(e)}
            placeholder={text}
            min={min}
            max={max}
        />
    );
}
