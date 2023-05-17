"use client";

// Dependencies
import Image from "next/image";

// Styles
import styles from "./Header.module.css";

const HEADER_ICONS = {
  search: {
    src: "/search.svg",
    altText: "Search icon",
  },
  cart: {
    src: "/shopping-cart.svg",
    altText: "Shopping Cart icon",
  },
};

export default function Header({ text }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__main}>
        <h1 className={styles.header__text}>{text}</h1>
        <div className={styles.header__search}>
          <Image
            src={HEADER_ICONS.search.src}
            alt={HEADER_ICONS.search.altText}
            width={20}
            height={20}
          />
          {/* TODO: OnChange dispatch search */}
          {/* <input onChange={} type="text"/> */}
        </div>
        <div className={styles.header__cart}>
          <Image
            src={HEADER_ICONS.cart.src}
            alt={HEADER_ICONS.cart.altText}
            width={20}
            height={20}
          />
        </div>
      </div>
      <div>{/* <input></input> */}</div>
    </header>
  );
}
