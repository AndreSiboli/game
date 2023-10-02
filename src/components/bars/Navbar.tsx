import styles from '@/styles/bars/Navbar.module.scss';
import { useRouter } from 'next/router';
import { use, useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context/Cart';
import { ProductType } from '@/@types/types';

import Link from 'next/link';
import Menu from './Menu';
import Container from '../styles/Container';
import Button from '../buttons/Button';
import Img from '../styles/Img';

import logo from '@/assets/logo.png';
import { FaInstagram, FaTwitter, FaTwitch } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';

export default function Navbar() {
    const { pathname } = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [windowSize, setWindowSize] = useState(0);
    const [numberItems, setNumberItems] = useState('0');
    const [isTop, setIsTop] = useState(true);
    const { items, setItems }: any = useContext(CartContext);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth);
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const top = window.scrollY;
            if (top === 0) return setIsTop(true);
            setIsTop(false);
        });
    }, [isTop]);

    useEffect(() => {
        if (window.innerWidth >= 1000) setIsActive(false);
    }, [windowSize]);

    useEffect(() => {
        if (isActive) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isActive]);

    useEffect(() => {
        if (!items) return;
        let i = 0;
        items.forEach((it: ProductType) => (i += Number(it.howmany)));
        if (i > 99) return setNumberItems('99+');
        setNumberItems(`${i}`);
    }, [items]);

    const closeMenu = () => {
        setIsActive(false);
    };

    return (
        <header className={isTop ? `${styles.header} ${styles.top}` : styles.header}>
            <Container>
                <div className={styles.header_container}>
                    <nav className={styles.header_navigation}>
                        <Link href="/" className={pathname === '/' ? `${styles.trace}` : ''}>
                            Início
                        </Link>
                        <Link
                            href="/schedule"
                            className={pathname === '/schedule' ? `${styles.trace}` : ''}
                        >
                            Agenda
                        </Link>
                        <Link
                            href="/merchant"
                            className={pathname === '/merchant' ? `${styles.trace}` : ''}
                        >
                            Merchant
                        </Link>
                        <Link
                            href="/blog"
                            className={pathname === '/blog' ? `${styles.trace}` : ''}
                        >
                            Blog
                        </Link>
                    </nav>
                    <div className={styles.header_logo}>
                        <Link href="/">
                            <div className={styles.logo_wrapper}>
                                <Img
                                    src={logo.src}
                                    alt="Logo"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className={styles.header_social}>
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

                        <div className={styles.cart_container}>
                            <Link href="/cart">
                                <span>
                                    <HiOutlineShoppingCart />
                                    <span>{numberItems}</span>
                                </span>
                            </Link>
                        </div>

                        <div className={styles.transmition_container}>
                            <Button
                                text="Assistir ao vivo"
                                to="https://www.twitch.com"
                                theme="blueish"
                                target="_blank"
                            />
                        </div>
                    </div>

                    <div
                        className={
                            isActive ? `${styles.hamburger} ${styles.active}` : styles.hamburger
                        }
                        onClick={() => setIsActive(!isActive)}
                    >
                        <span className={styles.trace}></span>
                        <span className={styles.trace}></span>
                        <span className={styles.trace}></span>
                    </div>

                    <Menu isActive={isActive} handleMenu={closeMenu} />
                </div>
            </Container>
        </header>
    );
}
