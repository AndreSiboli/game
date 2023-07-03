import styles from '@/styles/styles/Container.module.scss';
import { ReactElement } from 'react';

export default function Container({ children }: { children: ReactElement }) {
    return <div className={styles.container}>{children}</div>;
}
