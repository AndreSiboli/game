//------------------------------------ Imports ------------------------------------
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';

//------------------------------------ Components ------------------------------------
import Head from 'next/head';
import Container from '@/components/styles/Container';
import ImageContainer from '@/components/styles/ImageContainer';
import Button from '@/components/buttons/Button';
import Calendaio from '@/components/styles/Calendario';
import Carousel from '@/components/styles/Carousel';
import CarouselNews from '@/components/styles/CarouselNews';
import Input from '@/components/form/Input';
import Img from '@/components/styles/Img';

//------------------------------------ images ------------------------------------
import gif from '@/assets/home/home.gif';
import register from '@/assets/home/register.jpg';

import tasha from '@/assets/team/tasha.jpeg';
import lee from '@/assets/team/lee.jpeg';
import nunez from '@/assets/team/nunez.jpeg';
import ash from '@/assets/team/ash.jpeg';

import logo1 from '@/assets/logotipo/logo-lorita.png';
import logo2 from '@/assets/logotipo/logo-xcetra.png';
import logo3 from '@/assets/logotipo/logo-saranac.png';
import logo4 from '@/assets/logotipo/logo-cord.png';


const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const logoList = [logo1, logo2, logo3, logo4];

    return (
        <>
            <Head>
                <title>Arcade</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={`${styles.main} ${inter.className}`}>
                <Container>
                    <div
                        className={styles.main_container}
                        style={{ backgroundImage: `url(${gif.src})` }}
                    >
                        <h1>GAMER LEAGUE</h1>
                        <p>Transmissão ao vivo todas as terças às 16h EST</p>
                        <div className={styles.transmition_container}>
                            <Button
                                text="Fique de olho"
                                to="https://www.twitch.com"
                                theme="white"
                            />
                        </div>
                    </div>
                </Container>
            </main>

            <section className={styles.merchant}>
                <Container>
                    <div className={styles.merchant_container}>
                        <p>
                            O Team Arcade é uma equipe de esports mundialmente respeitada. Estamos
                            classificados em 7º lugar nos EUA e 15º na tabela internacional. Para
                            apoiar nossa equipe, confira nosso canal, compre nossos produtos e nos
                            siga nas mídias sociais.
                        </p>
                    </div>
                </Container>
            </section>

            <section className={styles.team}>
                <Container>
                    <div className={styles.team_container}>
                        <h3>EQUIPE</h3>
                        <div className={styles.image_container}>
                            <ImageContainer img={tasha.src} name="Tasha Bell" />
                            <ImageContainer img={nunez.src} name="Veronica Nunez" />
                            <ImageContainer img={lee.src} name="Channing Lee" />
                            <ImageContainer img={ash.src} name="Ash Valencia" />
                        </div>
                    </div>
                </Container>
            </section>

            <section className={styles.carousel}>
                <Container>
                    <div className={styles.carousel_container}>
                        <h3>MERCHANT</h3>
                        <Carousel />
                    </div>
                </Container>
            </section>

            {/*It's disabled cause a bug */}

            {/* <section className={styles.blog}>
                <Container>
                    <div className={styles.blog_container}>
                        <h3>BLOG</h3>
                        <CarouselNews />
                    </div>
                </Container>
            </section> */}

            <section className={styles.calendar}>
                <Container>
                    <div className={styles.calendar_container}>
                        <h3>PRÓXIMOS EVENTOS</h3>
                        <Calendaio />
                    </div>
                </Container>
            </section>

            <section className={styles.sponsor}>
                <Container>
                    <div className={styles.sponsor_container}>
                        <h3>NOSSOS PARCEIROS</h3>
                        <div className={styles.sponsor_image}>
                            {logoList.map((logo, index) => (
                                <div className={styles.image_container} key={logo.src + index}>
                                    <Img
                                        src={logo.src}
                                        alt=""
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className={styles.register}>
                <Container>
                    <div className={styles.register_container}>
                        <div
                            style={{ backgroundImage: `url(${register.src})` }}
                            className={styles.register_container_after}
                        />
                        <div className={styles.register_title}>
                            <h2>Assine</h2>
                        </div>
                        <div className={styles.register_merchant}>
                            <p>
                                Cadastre seu endereço de e-mail para receber novidades e
                                atualizações.
                            </p>
                        </div>
                        <div className={styles.register_input}>
                            <Input type="text" text="E-mail" id="email" handleInput={() => {}} />
                        </div>
                        <div className={styles.register_button}>
                            <Button text="Cadastre-se" theme="white" to="#" />
                        </div>
                        <div className={styles.register_respect}>
                            <p>respeitamos sua privacidade</p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}