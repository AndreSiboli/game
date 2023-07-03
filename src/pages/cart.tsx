import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context/Cart';
import { productsList } from '@/fake-api/mechantItems';

import Button from '@/components/buttons/Button';
import Container from '@/components/styles/Container';
import styles from '@/styles/pages/cart.module.scss';
import Submit from '@/components/form/Submit';
import Img from '@/components/styles/Img';
import PurchaseMessage from '@/components/styles/PurchaseMessage';

import { FaPlus, FaMinus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { calculatePrice } from '@/utils/cart';

interface ItemProp {
    id: string;
    size: string;
    howmany: number | string;
    total: string;
}

export default function Cart() {
    const prod = productsList;
    const { items, setItems } = useContext(CartContext);
    const [copy, setCopy] = useState<ItemProp[]>(items);
    const [total, setTotal] = useState<any>(0);
    const [loading, setLoading] = useState(false);
    const [purchase, setPurchase] = useState(false);
    const [timerId, setTimerId] = useState<any>();

    useEffect(() => {
        subtotal();
        setCopy(items);
    }, [items]);

    const item = (id: string) => {
        const filter = prod.filter((it) => it.id === id);
        if (filter.length !== 1) return { src: '', name: '' };
        return filter[0];
    };

    function subtotal() {
        let subtot = 0;

        items.forEach((element: ItemProp) => {
            let tot = element.total.replace(/\./g, '');
            tot = tot.replace(/,/g, '.');
            subtot += parseFloat(tot);
        });

        const totalPrice = subtot.toLocaleString(undefined, {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        setTotal(totalPrice);
    }

    //Delete an item from cart
    const deleteItem = (item: ItemProp) => {
        setLoading(true);

        setTimeout(() => {
            const copyItems = [...items];
            const index = copy.findIndex((it) => it.id === item.id && it.size === item.size);
            copyItems.splice(index, 1);

            setCopy(copyItems);
            setItems(copyItems);

            setLoading(false);
        }, 1000);
    };

    const menageAmount = (item: ItemProp, quantity: number) => {
        const copyItems = [...copy];
        const index = copy.findIndex((it) => it.id === item.id && it.size === item.size);
        let foundItem = copyItems[index];
        let h = Number(foundItem.howmany) + quantity;

        if (h > 99 || h < 0) return;

        copyItems[index] = {
            ...foundItem,
            howmany: h,
            total: calculatePrice(item.id, h),
        };

        setCopy(copyItems);
        return copyItems;
    };

    const menageAmountInput = (item: any, quantity: number) => {
        const copyItems = [...copy];
        const index = copy.findIndex((it) => it.id === item.id && it.size === item.size);
        let foundItem = copyItems[index];

        if (quantity === 0) {
            const prev = copyItems[index].total;
            copyItems[index] = {
                ...foundItem,
                howmany: '',
                total: prev,
            };
            setCopy(copyItems);
            return false;
        }

        if (quantity < 0) quantity = 1;
        else if (quantity > 99) quantity = 99;

        copyItems[index] = {
            ...foundItem,
            howmany: quantity,
            total: calculatePrice(item.id, quantity),
        };

        setCopy(copyItems);
        return copyItems;
    };

    const putInServer = (item: ItemProp) => {
        setLoading(true);

        setTimeout(() => {
            setItems(item);
            setLoading(false);
        }, 500);

        //The server doesn't exist, it's just a comparison
    };

    const timerToSend = (handleFunction: Function) => {
        clearTimeout(timerId);
        const updtadeItem = handleFunction();
        if (!updtadeItem) return;
        setTimerId(setTimeout(() => putInServer(updtadeItem), 400));
    };

    const shopping = () => {
        //Simulating a server requisition
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setPurchase(true);

            setTimeout(() => {
                setPurchase(false);
                setItems([]);
                setCopy([]);
            }, 3100);
        }, 2000);
    };

    return (
        <div className={styles.cart}>
            <Container>
                <div className={styles.cart_container}>
                    <h2>Carrinho de compras</h2>
                    {copy.length === 0 ? (
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
                            {copy.map((el: any) => (
                                <div className={styles.cart_item} key={el.id + el.size}>
                                    <div className={styles.item_image}>
                                        <Img
                                            src={item(el.id).src}
                                            alt=""
                                            style={{ width: '100%', height: '100%' }}
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
                                                onClick={() =>
                                                    timerToSend(() => menageAmount(el, -1))
                                                }
                                            >
                                                <FaMinus />
                                            </button>
                                        </div>
                                        <div className={styles.howmany_input}>
                                            <input
                                                type="number"
                                                min={0}
                                                max={99}
                                                id="howmany"
                                                value={el.howmany}
                                                onChange={(e) => {
                                                    timerToSend(() =>
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
                                                onClick={() =>
                                                    timerToSend(() => menageAmount(el, 1))
                                                }
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.item_price}>
                                        <p>R$ {el.total}</p>
                                    </div>
                                    <div className={styles.item_delete}>
                                        <button onClick={() => deleteItem(el)}>
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.cart_buying}>
                                <div className={styles.cart_buying_container}>
                                    <div className={styles.cart_total}>
                                        <p>
                                            <span>Subtotal:</span>
                                            <span>{`R$ ${total}`}</span>
                                        </p>
                                    </div>
                                    <div className={styles.cart_submit}>
                                        <Submit
                                            text="Finalização de compras"
                                            theme="blueish"
                                            handleSubmit={() => shopping()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {purchase && (
                        <PurchaseMessage
                            title="Compra efetuada"
                            text={`Sua compra no valor de R$ ${total} foi efetuada.`}
                        />
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
