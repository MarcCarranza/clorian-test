"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
// Styles
import styles from "./page.module.css";
import { getProducts } from "../redux/features/homeSlice";

export default function Home() {
  const productsData = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return <main className={styles.main}></main>;
}
