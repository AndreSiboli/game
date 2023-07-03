import styles from '@/styles/bars/Menu.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaInstagram, FaTwitch, FaTwitter } from 'react-icons/fa';
import Button from '../buttons/Button';

interface PropTypes {
    isActive: boolean;
    handleMenu: Function;
}

export default function Menu(props: PropTypes) {
    const { isActive, handleMenu } = props;
    const { pathname } = useRouter();

    return (
        <div className={isActive ? `${styles.menu} ${styles.active}` : styles.menu}>
            <div className={styles.menu_container}>
                <div className={styles.menu_wrapper}>
                    <nav className={styles.menu_navigation}>
                        <Link
                            href="/"
                            className={pathname === '/' ? `${styles.trace}` : ''}
                            onClick={() => handleMenu()}
                        >
                            Início
                        </Link>
                        <Link
                            href="/schedule"
                            className={pathname === '/schedule' ? `${styles.trace}` : ''}
                            onClick={() => handleMenu()}
                        >
                            Agenda
                        </Link>
                        <Link
                            href="/merchant"
                            className={pathname === '/merchant' ? `${styles.trace}` : ''}
                            onClick={() => handleMenu()}
                        >
                            Merchant
                        </Link>
                        <Link
                            href="/blog"
                            className={pathname === '/blog' ? `${styles.trace}` : ''}
                            onClick={() => handleMenu()}
                        >
                            Blog
                        </Link>
                    </nav>

                    <div className={styles.menu_social}>
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
                        <div className={styles.transmition_container}>
                            <Button
                                text="Assistir ao vivo"
                                to="https://www.twitch.com"
                                theme="blueish"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
