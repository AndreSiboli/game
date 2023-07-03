import Button from '@/components/buttons/Button';
import Container from '@/components/styles/Container';
import { CartContext } from '@/context/Cart';
import { productsList } from '@/fake-api/mechantItems';
import styles from '@/styles/pages/cart.module.scss';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import { FaPlus, FaMinus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

export default function cart() {
    const { items, setItems }: any = useContext(CartContext);
    const prod = productsList;
    const [loading, setLoading] = useState(false);
    const [timerId, setTimerId] = useState<any>();

    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    const item = (id: string) => {
        const filter = prod.filter((it) => it.id === id);
        if (filter.length !== 1) return { src: '', name: '' };
        return filter[0];
    };

    const deleteItem = (item: any) => {
        setLoading(true);
        setTimeout(() => {
            const copyItems = [...items];
            const index = items.findIndex((it: any) => it.id === item.id && it.size === item.size);
            copyItems.splice(index, 1);
            setItems(copyItems);
            localStorage.setItem('items', JSON.stringify(copyItems));
            setLoading(false);
        }, 1000);
    };

    const menageAmount = (item: any, q: number) => {
        const copyItems = [...items];
        const index = items.findIndex((it: any) => it.id === item.id && it.size === item.size);
        let foundItem = copyItems[index];
        let h = Number(foundItem.howmany) + q;

        if (h > 99 || h < 1) return;

        copyItems[index] = {
            ...foundItem,
            howmany: h,
        };

        setItems(copyItems);

        return copyItems;
    };

    const menageAmountInput = (item: any, q: number) => {
        const copyItems = [...items];
        const index = items.findIndex((it: any) => it.id === item.id && it.size === item.size);
        let foundItem = copyItems[index];

        if (q < 1) q = 1;
        else if (q > 99) q = 99;

        copyItems[index] = {
            ...foundItem,
            howmany: q,
        };

        setItems(copyItems);

        return copyItems;
    };

    const putInServer = (item: any) => {
        //The server doesn't exist, it's just a comparison
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('items', JSON.stringify(item));
            setLoading(false);
        }, 500);
    };

    const timer = (handleFunction: Function) => {
        clearTimeout(timerId); // Clean the anterior interval if exists
        const item = handleFunction();
        setTimerId(setTimeout(() => putInServer(item), 400));
    };

    const calculatePrice = (item: any) => {
        const pricee: any = prod.filter((it) => it.id === item.id);
        console.log(pricee);
        if (!pricee) return 'NaN';
        const howmany = Number(item.howmany);
        const prodPrice = parseFloat(pricee[0].price.replace(/,/, '.'));
        let price = (howmany * prodPrice).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return `${price}`;
    };

    return (
        <div className={styles.cart}>
            <Container>
                <div className={styles.cart_container}>
                    <h2>Carrinho de compras</h2>
                    {items.length === 0 ? (
                        <div className={styles.cart_notfound}>
                            <p>Não há nenhum item no carrinho de compras.</p>
                            <div className={styles.cart_button}>
                                <Button
                                    text="Continuar as compras"
                                    to="/merchant"
                                    theme="blueish"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.cart_items}>
                            {items.map((el: any) => (
                                <div className={styles.cart_item} key={el.id + el.size}>
                                    <div className={styles.item_image}>
                                        <Image
                                            src={item(el.id).src}
                                            alt=""
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            style={{ width: '100%', height: '100%' }}
                                            priority
                                        />
                                    </div>
                                    <div className={styles.item_info}>
                                        <div className={styles.info_name}>
                                            <p>{item(el.id).name}</p>
                                        </div>
                                        <div className={styles.info_size}>
                                            <p>
                                                Tamanho: <span>{el.size}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.item_howmany}>
                                        <div className={styles.howmany_button}>
                                            <button
                                                disabled={Number(el.howmany) <= 1 ? true : false}
                                                onClick={() => timer(() => menageAmount(el, -1))}
                                            >
                                                <FaMinus />
                                            </button>
                                        </div>
                                        <div className={styles.howmany_input}>
                                            <input
                                                type="number"
                                                min={1}
                                                max={99}
                                                id="howmany"
                                                value={el.howmany}
                                                onChange={(e) => {
                                                    timer(() =>
                                                        menageAmountInput(
                                                            el,
                                                            Number(e.target.value)
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className={styles.howmany_button}>
                                            <button
                                                disabled={Number(el.howmany) >= 99 ? true : false}
                                                onClick={() => timer(() => menageAmount(el, 1))}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.item_price}>
                                        <p>{calculatePrice(el)}</p>
                                    </div>
                                    <div className={styles.item_delete}>
                                        <button onClick={() => deleteItem(el)}>
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
            {loading && (
                <div className={styles.loading}>
                    <div className={styles.loading_div}></div>
                </div>
            )}
        </div>
    );
}
