import { productsList as prodList } from '@/fake-api/mechantItems';

export const calculatePrice = (id: any, quantity: number) => {
    const product: any = prodList.filter((it) => it.id === id);

    if (!product) return 'NaN';

    const howmany = Number(quantity);
    const prodPrice = parseFloat(product[0].price.replace(/,/, '.'));
    
    const price = (howmany * prodPrice).toLocaleString(undefined, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return `${price}`;
};
