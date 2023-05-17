"use client";

// Dependencies
import Image from "next/image";

// Styles
import styles from "./Header.module.css";

// Constants
import { GLOBAL_ICONS } from "../../constants";

export default function Header({ text, toggleCart }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__main}>
        <h1 className={styles.header__text}>{text}</h1>
        <div className={styles.header__search}>
          <Image
            src={GLOBAL_ICONS.search.src}
            alt={GLOBAL_ICONS.search.altText}
            width={20}
            height={20}
          />
          {/* TODO: OnChange dispatch search */}
          {/* <input onChange={} type="text"/> */}
        </div>
        <div className={styles.header__cart} onClick={toggleCart}>
          <Image
            src={GLOBAL_ICONS.cart.src}
            alt={GLOBAL_ICONS.cart.altText}
            width={20}
            height={20}
          />
        </div>
      </div>
      <div>{/* <input></input> */}</div>
    </header>
  );
}
