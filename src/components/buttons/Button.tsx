import Link from 'next/link';
import styles from '@/styles/buttons/Button.module.scss';

interface PropTypes {
    text: string;
    theme: string;
    to: string;
    target?: string;
}

export default function Button(props: PropTypes) {
    const { text, theme, to, target } = props;

    return (
        <Link
            href={to}
            target={!target ? '_self' : target}
            className={`${styles.button} ${styles[theme]}`}
        >
            <p>{text}</p>
        </Link>
    );
}
