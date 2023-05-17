"use client";

// Dependencies
import { useEffect, useState } from "react";

// Components
import Header from "../components/Header/Header";
import ProductsList from "../components/ProductsList/ProductsList";

// Redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProducts } from "../redux/features/homeSlice";

// Styles
import styles from "./page.module.css";
import Cart from "../components/Cart/Cart";

export default function Home() {
  const productsData = useAppSelector((state) => state.home.products);
  const dispatch = useAppDispatch();

  // State
  const [isLoading, setLoading] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    setLoading(false);
  }, []);

  // Functionalities
  const toggleCartPopup = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <Header text={"DiscDogs"} toggleCart={toggleCartPopup} />
        <ProductsList data={productsData} isLoading={isLoading} />
        {isCartOpen && <Cart toggleCart={toggleCartPopup} />}
      </div>
    </main>
  );
}
