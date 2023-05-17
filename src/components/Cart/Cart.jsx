"use client";

// Dependencies
import Image from "next/image";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Styles
import styles from "./Cart.module.css";

// Constants
import { GLOBAL_ICONS } from "../../constants";
import { clearCart } from "../../redux/features/cartSlice";

export default function Cart({ toggleCart }) {
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // Handling
  const stopBubbling = (e) => {
    e.stopPropagation();
  };

  const onClickClear = () => {
    dispatch(clearCart());
    toggleCart();
  };

  // Functionalities
  const getAllTotal = () => {
    if (!cartData.items.length) {
      return 0;
    }
    let totalSum = cartData.items.reduce(
      (acc, curr) => acc + curr.price * curr.qty,
      0
    );
    return totalSum.toFixed(2);
  };

  return (
    <div className={styles.cart_container} onClick={toggleCart}>
      <div className={styles.cart} onClick={stopBubbling}>
        <div className={styles.cart__header}>
          <div className={styles.cart__header_title}>
            <h2 className={styles.cart__header_text}>Cart</h2>
            <Image
              src={GLOBAL_ICONS.cart.src}
              alt={GLOBAL_ICONS.cart.altText}
              width={20}
              height={20}
            />
          </div>
          <button className={styles.cart__header_closeBtn} onClick={toggleCart}>
            <Image
              src={GLOBAL_ICONS.close.src}
              alt={GLOBAL_ICONS.close.altText}
              width={20}
              height={20}
            />
          </button>
        </div>
        <span className={styles.cart__total_text}>Total</span>
        <ul className={styles.cart__list}>
          {cartData.items.map((item) => {
            return (
              <li className={styles.cart__item} key={item.id}>
                <div className={styles.item__info}>
                  <span className={styles.item__name}>{item.name}</span>
                  <span className={styles.item__price}>{item.price}€</span>
                </div>
                <div className={styles.item__pricing}>
                  <span className={styles.item__qty}>{item.qty}</span>
                  <span className={styles.item__total}>
                    {(item.price * item.qty).toFixed(2)}€
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.cart__footer}>
          <button
            className={styles.footer__clearBtn}
            disabled={!cartData.items.length}
            onClick={onClickClear}
          >
            Clear Cart
          </button>
          <span className={styles.footer__totalPrice}>{getAllTotal()}€</span>
        </div>
      </div>
    </div>
  );
}
