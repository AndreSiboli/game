import { createContext, ReactElement, useEffect, useState } from 'react';

export const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: ReactElement }) {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        try {
            const local = localStorage.getItem('items');
            if (!local) return;
            const data: [] = JSON.parse(local);
            setItems(data);
        } catch (err) {
            localStorage.setItem('items', '[]');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items]);

    return <CartContext.Provider value={{ items, setItems }}>{children}</CartContext.Provider>;
}
