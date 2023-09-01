import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/styles/Carousel.module.scss';

import Img from './Img';
import Link from 'next/link';

import { FaLongArrowAltRight } from 'react-icons/fa';
import arcade1 from '@/assets/arcade-1.png';
import arcade2 from '@/assets/arcade-2.png';
import arcadeSpace from '@/assets/arcade-space.png';

export default function Carousel() {
    const carousel = useRef<HTMLDivElement>(null);
    const image = useRef<HTMLDivElement>(null);
    // const [img, setImg] = useState(-1);
    const [currentSlide, setCurrentSlide] = useState(1);
    const style = { width: '100%', height: '100%' };

    useEffect(() => {
        function resize() {
            if (!carousel.current || !image.current) return;
            carousel.current.style.scrollBehavior = 'auto';
            carousel.current.scrollLeft = image.current.offsetWidth * currentSlide;
            carousel.current.style.scrollBehavior = 'smooth';
        }

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [currentSlide]);

    useEffect(() => {
        if (!carousel.current || !image.current) return;
        // carousel.current.style.scrollBehavior = 'auto';
        carousel.current.scrollLeft = image.current.offsetWidth * currentSlide;
        // carousel.current.style.scrollBehavior = 'smooth';
    }, []);

    function manageCarousel(value: number) {
        if (!image.current || !carousel.current) return;
        const imageWidth = image.current.offsetWidth;

        const next = currentSlide + value;

        if (next <= -1) {
            carousel.current.scrollLeft = imageWidth * 2;
            setCurrentSlide(2);
            return;
        }
        if (next >= 3) {
            carousel.current.scrollLeft = 0;
            setCurrentSlide(0);
            return;
        }

        carousel.current.scrollLeft = imageWidth * next;
        setCurrentSlide(next);
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.carousel_button}>
                <div className={styles.button_container}>
                    <button onClick={() => manageCarousel(-1)}>
                        <FaLongArrowAltRight />
                    </button>
                </div>
                <div className={styles.button_container}>
                    <button onClick={() => manageCarousel(1)}>
                        <FaLongArrowAltRight />
                    </button>
                </div>
            </div>
            <div className={styles.carousel_container} ref={carousel}>
                <div className={styles.carousel_image} ref={image}>
                    <Link href="/merchant/3">
                        <Img src={arcade1.src} alt="" style={style} />
                    </Link>
                </div>
                <div className={styles.carousel_image}>
                    <Link href="/merchant/2">
                        <Img src={arcade2.src} alt="" style={style} />
                    </Link>
                </div>
                <div className={styles.carousel_image}>
                    <Link href="/merchant/1">
                        <Img src={arcadeSpace.src} alt="" style={style} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
