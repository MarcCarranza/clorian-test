"use client";

// Dependencies
import { useState } from "react";

// Styles
import styles from "./ProductsList.module.css";
import Image from "next/image";

const QUANTITY_LIST = [1, 2, 3, 4, 5];

export default function ProductsList({ data, isLoading = false }) {
  const [productToAdd, setProductToAdd] = useState(null);
  // TODO: productsQty would be too much if the list is too large?
  const [productsQty, setProductsQty] = useState({});

  // Functionalities
  const onChangeQuantity = (productId, qty) => {
    const updatedProductsQty = {
      ...productsQty,
      [productId]: qty,
    };

    setProductsQty(updatedProductsQty);
  };

  const onAddProduct = (id) => {
    // TODO: If ID is in, if not qty is the default value ()
  };

  return (
    <div className={styles.list_wrapper}>
      <ul className={styles.list}>
        {!isLoading &&
          data.map(({ id, name, description, valid_date, price }) => {
            return (
              <li className={styles.list__product} key={id}>
                <div className={styles.list__info}>
                  <h4>{name}</h4>
                  <p>{description}</p>
                </div>
                <div className={styles.list__qty}>
                  <select
                    className={styles.qty__select}
                    id="qty"
                    onChange={(e) =>
                      onChangeQuantity(id, e.currentTarget.value)
                    }
                  >
                    {QUANTITY_LIST.map((qty) => (
                      <option key={`${id}-${qty}`} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  <button
                    className={styles.qty__addBtn}
                    onClick={() => onAddProduct(id)}
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
