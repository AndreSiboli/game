import styles from '@/styles/pages/blog.module.scss';
import Head from 'next/head';
import Container from '@/components/styles/Container';

export default function Blog() {
    return (
        <>
            <Head>
                <title>Blog | Arcade</title>
            </Head>
            <div className={styles.blog}>
                <Container>
                    <div className={styles.blog_container}>
                        <h1>Blog em construção.</h1>
                    </div>
                </Container>
            </div>
        </>
    );
}
