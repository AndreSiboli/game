import MainContainer from '@/components/MainContainer';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Arcade</title>
            </Head>
            <MainContainer>
                <Component {...pageProps} />
            </MainContainer>
        </>
    );
}
