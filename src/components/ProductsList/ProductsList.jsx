"use client";

// Dependencies
import { useState } from "react";
import Image from "next/image";

// Redux
import { addItemToCart } from "../../redux/features/cartSlice";

// Styles
import styles from "./ProductsList.module.css";
import { useAppDispatch } from "../../redux/hooks";

const QUANTITY_LIST = [1, 2, 3, 4, 5];

export default function ProductsList({ data, isLoading = false }) {
  // Redux
  const dispatch = useAppDispatch();

  // productsQty would be too much if the list is too large?
  const [productsQty, setProductsQty] = useState({});

  // Functionalities
  const onChangeQuantity = (productId, qty) => {
    const updatedProductsQty = {
      ...productsQty,
      [productId]: qty,
    };

    setProductsQty(updatedProductsQty);
  };

  const onAddProduct = (product) => {
    const qty = productsQty[product.id] || 1;
    dispatch(addItemToCart({ ...product, qty }));
  };

  return (
    <div className={styles.list_wrapper}>
      <ul className={styles.list}>
        {!isLoading &&
          data.map((product) => {
            return (
              <li className={styles.list__product} key={product.id}>
                <div className={styles.list__info}>
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                </div>
                <div className={styles.list__qty}>
                  <select
                    className={styles.qty__select}
                    id="qty"
                    onChange={(e) =>
                      onChangeQuantity(product.id, e.currentTarget.value)
                    }
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
                  >
                    <Image
                      src="/plus.svg"
                      alt="Add icon"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
