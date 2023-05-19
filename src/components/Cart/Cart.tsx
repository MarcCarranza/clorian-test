"use client";

// Dependencies
import Image from "next/image";
import { MouseEvent, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart } from "../../redux/features/cartSlice";
import { clearProductsQty, resetOrder } from "../../redux/features/homeSlice";

// Styles
import styles from "./Cart.module.css";

// Constants
import { GLOBAL_ICONS } from "../../constants";

// Types
import { AppState, CartState } from "../../types/Redux";

export default function Cart({ toggleCart }) {
  // Redux State
  const cartData: CartState = useAppSelector((state: AppState) => state.cart);
  const dispatch = useAppDispatch();

  // State
  const [closingCart, setClosingCart] = useState<boolean>(false);

  // Handling
  const stopBubbling = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const onClickClose = (): void => {
    setClosingCart(true);
    setTimeout(() => {
      toggleCart();
      setClosingCart(false);
    }, 200);
  };

  const onClickClear = (): void => {
    setClosingCart(true);
    dispatch(resetOrder());
    dispatch(clearCart());
    dispatch(clearProductsQty());
    // Timeout for slideOut animation
    setTimeout(() => {
      toggleCart();
      setClosingCart(false);
    }, 200);
  };

  return (
    <div className={styles.cart_container} onClick={toggleCart}>
      <div
        className={`${styles.cart_containerBg} ${
          closingCart ? styles.cart_containerBg_closing : ""
        }`}
      />
      <div
        className={`${styles.cart} ${closingCart ? styles.cart_closing : ""}`}
        onClick={stopBubbling}
        data-testid="cart"
      >
        <div className={styles.cart__header} data-testid="cart-header">
          <div className={styles.cart__header_title}>
            <h2 className={styles.cart__header_text}>Cart</h2>
            <Image
              src={GLOBAL_ICONS.cart.src}
              alt={GLOBAL_ICONS.cart.altText}
              width={20}
              height={20}
            />
          </div>
          <button
            className={styles.cart__header_closeBtn}
            onClick={onClickClose}
            data-testid="cart-closeBtn"
          >
            <Image
              src={GLOBAL_ICONS.close.src}
              alt={GLOBAL_ICONS.close.altText}
              width={20}
              height={20}
            />
          </button>
        </div>
        <span className={styles.cart__total_text}>Total</span>
        <ul className={styles.cart__list} data-testid="cart-list">
          {cartData.items.map((item) => {
            return (
              <li
                className={styles.cart__item}
                key={item.id}
                data-testid="cart-item"
              >
                <div className={styles.item__info}>
                  <span className={styles.item__name}>{item.name}</span>
                  <span className={styles.item__price}>{item.price}€</span>
                </div>
                <div className={styles.item__pricing}>
                  <span className={styles.item__qty} data-testid="cart-itemQty">
                    {item.qty}
                  </span>
                  <span
                    className={styles.item__total}
                    data-testid="cart-totalPrice"
                  >
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
            data-testid="cart-clearBtn"
          >
            Clear Cart
          </button>
          <span className={styles.footer__totalPrice}>
            {cartData.totalPrice}€
          </span>
        </div>
      </div>
    </div>
  );
}
