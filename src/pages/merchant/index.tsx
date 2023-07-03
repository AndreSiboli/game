import { productsList as products } from '@/fake-api/mechantItems';
import styles from '@/styles/pages/merchant.module.scss';

import Head from 'next/head';
import Container from '@/components/styles/Container';
import Link from 'next/link';
import Img from '@/components/styles/Img';

export default function merchant() {
    const imageStyle = { width: '100%', height: '100%', objectFit: 'cover' };

    return (
        <>
            <Head>
                <title>Merch | Arcade</title>
            </Head>
            <main className={styles.merchant}>
                <Container>
                    <div className={styles.merchant_container}>
                        {products.map((prod, index) => (
                            <Link
                                href={`/merchant/${prod.id}`}
                                key={prod.alt + index}
                                className={styles.merchant_item}
                            >
                                <div className={styles.merchant_prod} key={prod.src + index}>
                                    <div className={styles.prod_image}>
                                        <Img src={prod.src} alt={prod.alt} style={imageStyle} />
                                    </div>
                                    <div className={styles.prod_info}>
                                        <h2>{prod.name}</h2>
                                        <p>R${prod.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </main>
        </>
    );
}
