"use client";

// Dependencies
import { useState } from "react";
import Image from "next/image";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchProduct } from "../../redux/features/homeSlice";

// Styles
import styles from "./Header.module.css";

// Constants
import { GLOBAL_ICONS } from "../../constants";

export default function Header({ text, toggleCart }) {
  // Redux
  const searchValue = useAppSelector((state) => state.home.search);
  const dispatch = useAppDispatch();

  // State
  const [isSearchOpen, setSearchOpen] = useState(false);

  // Handlers
  const onSearchProduct = (e) => {
    dispatch(searchProduct(e.currentTarget.value));
  };

  const onClearSearch = () => {
    dispatch(searchProduct(""));
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__main}>
        <h1 className={styles.header__text}>{text}</h1>
        <div
          className={styles.header__search_icon}
          onClick={() => setSearchOpen(!isSearchOpen)}
        >
          <Image
            src={GLOBAL_ICONS.search.src}
            alt={GLOBAL_ICONS.search.altText}
            width={20}
            height={20}
          />
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
      <div
        className={`${styles.header__search} ${
          isSearchOpen ? styles.header__searchOpen : ""
        }`}
      >
        <input
          className={styles.search__input}
          type="text"
          onChange={onSearchProduct}
          placeholder="Search product"
          value={searchValue}
        />
        <Image
          src={GLOBAL_ICONS.clear.src}
          alt={GLOBAL_ICONS.clear.altText}
          height={20}
          width={20}
          onClick={onClearSearch}
        />
      </div>
    </header>
  );
}
