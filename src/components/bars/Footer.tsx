import styles from '@/styles/bars/Footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../styles/Container';

import logoDots from '@/assets/logo-dots.png';
import { FaInstagram, FaTwitch, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footer_container}>
                    <div className={styles.footer_wrapper}>
                        <div className={styles.footer_contact}>
                            <h4>Contato</h4>
                            <p>example@email.com</p>
                        </div>
                        <div className={styles.footer_logo}>
                            <div className={styles.logo_container}>
                                <Image
                                    src={logoDots.src}
                                    alt=""
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '200px', height: '200px' }}
                                />
                            </div>
                        </div>
                        <div className={styles.footer_follow}>
                            <h4>Siga-nos</h4>

                            <div className={styles.socialMedia_container}>
                                <Link href="https://www.instagram.com" target="_blank">
                                    <FaInstagram />
                                </Link>
                                <Link href="https://www.twitter.com" target="_blank">
                                    <FaTwitter />
                                </Link>
                                <Link href="https://www.twitch.com" target="_blank">
                                    <FaTwitch />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer_author}>
                        <p>
                            Feito com base em um site do <Link href="#">Squarespace</Link>
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
