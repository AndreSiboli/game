import Container from '@/components/styles/Container';
import styles from '@/styles/pages/404.module.scss';
import Link from 'next/link';

export default function Error404() {
    return (
        <div className={styles.err404}>
            <Container>
                <div className={styles.err404_container}>
                    <div className={styles.err404_text}>
                        <p>404</p>
                        <p>{'>:('}</p>
                    </div>
                    <div className={styles.err404_advice}>
                        <p>
                            Onde pensa que vai? O site fica por <Link href="/">aqui</Link>!
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
