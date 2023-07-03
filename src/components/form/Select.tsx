import styles from '@/styles/form/Select.module.scss';
import { ChangeEvent } from 'react';

interface PropTypes {
    id: string;
    options: { name: string; value: string }[];
    handleInput: Function;
    text?: string;
    value?: string | number;
}

export default function Input(props: PropTypes) {
    const { text, id, value, handleInput, options } = props;

    function input(e: ChangeEvent) {
        handleInput(e);
    }

    return (
        <select
            id={id}
            name={id}
            className={styles.select}
            value={value}
            defaultValue="0"
            onChange={(e: ChangeEvent) => input(e)}
        >
            <option value="0" disabled>
                {text}
            </option>
            {options.length != 0 ? (
                options.map((opt, index) => (
                    <option value={opt.value} key={opt.value + index}>
                        {opt.name}
                    </option>
                ))
            ) : (
                <></>
            )}
        </select>
    );
}
