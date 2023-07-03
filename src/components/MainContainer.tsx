import { ReactElement } from 'react';
import { CartProvider } from '@/context/Cart';
import Footer from './bars/Footer';
import Navbar from './bars/Navbar';

export default function MainContainer({ children }: { children: ReactElement }) {
    const styles: any = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        minHeight: '100vh',
    };

    return (
        <CartProvider>
            <div style={styles}>
                <Navbar />
                {children}
                <Footer />
            </div>
        </CartProvider>
    );
}
