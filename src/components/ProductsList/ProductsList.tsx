"use client";

// Dependencies
import { ReactElement, useMemo, useRef, useState } from "react";
import Image from "next/image";

// Components
import ProductsSort from "../ProductsSort/ProductsSort";
import Loader from "../Loader/Loader";
import Toast from "../Toast/Toast";

// Redux
import { addItemToCart } from "../../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateProductsQty } from "../../redux/features/homeSlice";

// Custom Hooks
import { useProductsList } from "../../hooks/useProductsList";

// Helpers
import { isNotValid } from "../../helpers";

// Styles
import styles from "./ProductsList.module.css";

// Constants
import { GLOBAL_ICONS, QUANTITY_LIST } from "../../constants";

// Types
import { Product } from "../../types/Home";
import { AppState } from "../../types/Redux";

type Props = {
  data: Product[];
  isLoading?: boolean;
};

export default function ProductsList({
  data,
  isLoading = false,
}: Props): ReactElement {
  // Redux
  const {
    productsQty,
    search: searchValue,
    orderType,
  } = useAppSelector((state: AppState) => state.home);
  const dispatch = useAppDispatch();

  // State
  const [showToast, setToast] = useState<boolean>(false);
  const toastMsg = useRef<string>("");
  const sortedList = useProductsList({ data, searchValue, orderType });

  // Handlers
  const onChangeQuantity = (productId: string, qty: string): void => {
    dispatch(updateProductsQty({ productId, qty }));
  };

  const onAddProduct = (product: Product): void => {
    const qty = parseInt(productsQty[product.id]) || 1;
    dispatch(addItemToCart({ ...product, qty }));
    toastMsg.current = `${qty}x ${product.name} Added`;
    setToast(true);
  };

  // Functionalities
  const getSelectedQty = (productId: string): string => {
    if (productsQty[productId]) {
      return productsQty[productId];
    }
    return "";
  };

  // Render
  const memoizedRender = useMemo(
    () =>
      sortedList.map((product) => {
        return (
          <li
            className={styles.list__product}
            key={product.id}
            data-testid="item-product"
          >
            <div className={styles.list__info}>
              <h4 className={styles.info__name}>{product.name}</h4>
              <p className={styles.info__desc}>{product.description}</p>
            </div>
            <div className={styles.list__qty}>
              <select
                className={styles.qty__select}
                id="qty"
                onChange={(e) =>
                  onChangeQuantity(product.id, e.currentTarget.value)
                }
                disabled={isNotValid(product.valid_until)}
                value={getSelectedQty(product.id)}
                data-testid="product-qtySelector"
              >
                {QUANTITY_LIST.map((qty) => (
                  <option key={`${product.id}-${qty}`} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
              <button
                className={styles.qty__addBtn}
                onClick={() => onAddProduct(product)}
                disabled={isNotValid(product.valid_until)}
                data-testid="product-addBtn"
              >
                <Image
                  src={GLOBAL_ICONS.add.src}
                  alt={GLOBAL_ICONS.add.altText}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </li>
        );
      }),
    [data, searchValue, orderType, productsQty]
  );

  return (
    <div className={styles.list_container}>
      <ProductsSort />
      {isLoading && <Loader />}
      <ul className={styles.list} data-testid="products-list">
        {!isLoading && memoizedRender}
      </ul>
      <Toast
        message={toastMsg.current}
        isOpen={showToast}
        setToast={setToast}
      />
    </div>
  );
}
