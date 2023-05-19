"use client";

// Dependencies
import { ReactElement, useState } from "react";
import Image from "next/image";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchProduct } from "../../redux/features/homeSlice";

// Styles
import styles from "./Header.module.css";

// Constants
import { GLOBAL_ICONS } from "../../constants";
import { AppState, HomeState } from "../../types/Redux";

export default function Header({ text, toggleCart }): ReactElement {
  // Redux
  const { search: searchValue }: HomeState = useAppSelector(
    (state: AppState) => state.home
  );
  const dispatch = useAppDispatch();

  // State
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);

  // Handlers
  const onSearchProduct = (e): void => {
    dispatch(searchProduct(e.currentTarget.value));
  };

  const onClearSearch = (): void => {
    if (!searchValue) {
      setSearchOpen(!isSearchOpen);
      return;
    }
    dispatch(searchProduct(""));
  };

  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.header__main}>
        <h1 className={styles.header__text}>{text}</h1>
        <button
          className={styles.header__search_icon}
          onClick={() => setSearchOpen(!isSearchOpen)}
          data-testid="header-searchBtn"
        >
          <Image
            src={GLOBAL_ICONS.search.src}
            alt={GLOBAL_ICONS.search.altText}
            width={20}
            height={20}
          />
        </button>
        <button
          className={styles.header__cart}
          onClick={toggleCart}
          data-testid="header-cartBtn"
        >
          <Image
            src={GLOBAL_ICONS.cart.src}
            alt={GLOBAL_ICONS.cart.altText}
            width={20}
            height={20}
          />
        </button>
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
          data-testid="header-searchInput"
        />
        <Image
          src={GLOBAL_ICONS.clear.src}
          alt={GLOBAL_ICONS.clear.altText}
          height={20}
          width={20}
          onClick={onClearSearch}
          data-testid="header-searchClear"
        />
      </div>
    </header>
  );
}
