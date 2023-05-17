"use client";

// Dependencies
import { useEffect, useState } from "react";

// Components
import Header from "../components/Header/Header";

// Redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProducts } from "../redux/features/homeSlice";

// Styles
import styles from "./page.module.css";
import ProductsList from "../components/ProductsList/ProductsList";

export default function Home() {
  const productsData = useAppSelector((state) => state.home.products);
  const dispatch = useAppDispatch();

  // State
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProducts());
    setLoading(false);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <Header text={"DiscDogs"} />
        <ProductsList data={productsData} isLoading={isLoading} />
      </div>
    </main>
  );
}
