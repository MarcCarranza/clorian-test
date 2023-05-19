"use client";

// Dependencies
import { ReactElement, useEffect, useState } from "react";

// Components
import Header from "../components/Header/Header";
import ProductsList from "../components/ProductsList/ProductsList";
import Cart from "../components/Cart/Cart";

// Redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProducts } from "../redux/features/homeSlice";

// Styles
import styles from "./page.module.css";

// Types
import { AppState } from "../types/Redux";
import { Product } from "../types/Home";

export default function Home(): ReactElement {
  const productsData: Product[] = useAppSelector(
    (state: AppState) => state.home.products
  );
  const dispatch = useAppDispatch();

  // State
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);

  // Use Effects
  useEffect(() => {
    dispatch(getProducts());
    setLoading(false);
  }, []);

  // Functionalities
  const toggleCartPopup = (): void => {
    setCartOpen(!isCartOpen);
  };

  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <Header text={"Marcket"} toggleCart={toggleCartPopup} />
        <ProductsList data={productsData} isLoading={isLoading} />
        {isCartOpen && <Cart toggleCart={toggleCartPopup} />}
      </div>
    </main>
  );
}
