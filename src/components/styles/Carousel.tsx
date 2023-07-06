import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/styles/Carousel.module.scss';

import Img from './Img';
import Link from 'next/link';

import { FaLongArrowAltRight } from 'react-icons/fa';
import arcade1 from '@/assets/arcade-1.png';
import arcade2 from '@/assets/arcade-2.png';
import arcadeSpace from '@/assets/arcade-space.png';

export default function Carousel() {
    const carousel: any = useRef();
    const image: any = useRef();
    const [img, setImg] = useState(-1);
    const style = { width: '100%', height: '100%' };

    useEffect(() => {
        function resize() {
            carousel.current.style.left = -(img * -image.current.clientWidth) + 'px';
        }

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [img]);

    useEffect(() => {
        carousel.current.style.left = -image.current.clientWidth + 'px';
    }, []);

    function menageCarousel(value: number) {
        const imageWidth = image.current.clientWidth;

        if (img === 0 && value === 1) {
            carousel.current.style.left = -2 * imageWidth + 'px';
            setImg(-2);
        } else if (img === -2 && value === -1) {
            carousel.current.style.left = 0 * imageWidth + 'px';
            setImg(0);
        } else {
            carousel.current.style.left = (img + value) * imageWidth + 'px';
            setImg((prevValue) => prevValue + value);
        }
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.carousel_button}>
                <div className={styles.button_container}>
                    <button onClick={() => menageCarousel(1)}>
                        <FaLongArrowAltRight />
                    </button>
                </div>
                <div className={styles.button_container}>
                    <button onClick={() => menageCarousel(-1)}>
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
