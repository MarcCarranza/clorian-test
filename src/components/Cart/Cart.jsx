"use client";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Cart() {
  const cartData = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // Functionalities

  return <div></div>;
}
