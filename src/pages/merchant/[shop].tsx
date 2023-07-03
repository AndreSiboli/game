import styles from '@/styles/pages/shop.module.scss';
import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { calculatePrice } from '@/utils/cart';

import Container from '@/components/styles/Container';
import Message from '@/components/styles/Message';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import SubmitButton from '@/components/form/SubmitAnima';
import Img from '@/components/styles/Img';

import { productsList } from '@/fake-api/mechantItems';
import { CartContext } from '@/context/Cart';

interface productTypes {
    id: string;
    src: string;
    alt: string;
    name: string;
    price: string;
    types: string[];
}

interface ItemProp {
    id: string;
    size: string;
    howmany: number | string;
    total: string;
}

export default function Shop() {
    const { shop } = useRouter().query;
    const { items, setItems } = useContext(CartContext);
    const [product, setProduct] = useState<productTypes | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ title: '', text: '' });
    const [value, setValue] = useState({
        size: '0',
        howmany: 1,
    });
    const imageStyle = { width: '100%', height: '100%' };
    const selectSizes = [
        { name: 'S', value: 's' },
        { name: 'M', value: 'm' },
        { name: 'L', value: 'l' },
        { name: 'GG', value: 'gg' },
    ];

    useEffect(() => {
        const pdct = productsList.filter((it) => it.id === shop);
        if (!pdct || pdct.length === 0) return;
        setProduct(pdct[0]);
    }, [shop]);

    function settingValue(e: ChangeEvent<HTMLInputElement>) {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const closeMessage = () => {
        setMessage({ title: '', text: '' });
    };

    function checkInput() {
        const size = value.size;
        const howmany = Number(value.howmany);
        const validSizes = ['s', 'm', 'l', 'gg'];

        if (!validSizes.includes(size)) {
            setMessage({
                title: 'NÃO É POSSÍVEL ADICIONAR O ITEM',
                text: 'Selecione a opção Tamanho.',
            });
            return false;
        }
        if (howmany <= 0) {
            setMessage({
                title: 'NÃO É POSSÍVEL ADICIONAR O ITEM',
                text: 'Você deve adicionar uma quantidade maior que zero.',
            });
            return false;
        }
        if (howmany >= 100) {
            setMessage({
                title: 'NÃO É POSSÍVEL ADICIONAR O ITEM',
                text: 'Você não pode adicionar essa quantidade de itens. Você pode ter até 99 itens no seu carrinho.',
            });
            return false;
        }
        console.log('pass');
        return true;
    }

    function defineData(local: string) {
        const items: ItemProp = {
            ...value,
            id: shop as any,
            total: '0',
        };
        const data: ItemProp[] = JSON.parse(local);
        const index = data.findIndex((i: ItemProp) => i.id === items.id && i.size === items.size);

        if (index > -1) {
            const totalItems = Number(items.howmany) + Number(data[index].howmany);
            data[index] = {
                size: items.size,
                howmany: totalItems,
                id: items.id,
                total: calculatePrice(items.id, totalItems),
            };
        } else {
            data.push({
                ...items,
                total: calculatePrice(items.id, Number(items.howmany)),
            });
        }

        return data;
    }

    const submit = () => {
        if (typeof shop !== 'string') return;

        if (!checkInput()) return;

        const local = localStorage.getItem('items') || '[]';

        try {
            JSON.parse(local);
        } catch (error) {
            setItems([]);
        }

        closeMessage();
        setLoading(true);

        const data = defineData(local);

        setItems(data);
        setValue({ ...value, howmany: 1 });
    };

    return (
        <>
            <main className={styles.shop}>
                <Container>
                    <div className={styles.shop_container}>
                        {product && (
                            <div className={styles.shop_item}>
                                <div className={styles.shop_image}>
                                    <div className={styles.image_container}>
                                        <Img
                                            src={product.src}
                                            alt={product.alt}
                                            style={imageStyle}
                                        />
                                    </div>
                                </div>
                                <div className={styles.shop_infos}>
                                    <div className={styles.shop_infos_wrapper}>
                                        <div className={styles.info_name}>
                                            <h2>{product.name}</h2>
                                        </div>
                                        <div className={styles.info_price}>
                                            <p>R$ {product.price}</p>
                                        </div>
                                        <div className={styles.info_type}>
                                            {product.types.map((type, index) => (
                                                <p key={type + index}>• {type}</p>
                                            ))}
                                        </div>
                                        <div className={styles.info_size}>
                                            <label htmlFor="size">Tamanho:</label>
                                            <Select
                                                id="size"
                                                text=" Selecione um tamanho"
                                                handleInput={settingValue}
                                                options={selectSizes}
                                            />
                                        </div>
                                        <div className={styles.info_howmany}>
                                            <label htmlFor="howmany">Quantidade:</label>
                                            <Input
                                                type="number"
                                                value={value.howmany}
                                                id="howmany"
                                                handleInput={settingValue}
                                                min={1}
                                                max={99}
                                            />
                                        </div>
                                        <div className={styles.info_button}>
                                            <SubmitButton
                                                text="Adicionar ao carrinho"
                                                textLoading="Adicionando..."
                                                textFinish="Adicionado!"
                                                useLoading={{ loading, setLoading }}
                                                theme="blueish"
                                                handleSubmit={submit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </main>
            {message.title && (
                <Message
                    title={message.title}
                    text={message.text}
                    type="err"
                    handleMessage={closeMessage}
                />
            )}
        </>
    );
}
