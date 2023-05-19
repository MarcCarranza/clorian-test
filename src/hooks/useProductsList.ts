"use client";

import { useMemo } from "react";
// Redux
import { useAppSelector } from "../redux/hooks";

// Types
import { Product } from "../types/Home";
import { AppState } from "../types/Redux";

type Props = {
  data: Product[];
  searchValue: string;
  orderType: { type: string; sort: boolean };
};

export const useProductsList = ({
  data,
  searchValue,
  orderType,
}: Props): Product[] => {
  // Redux

  const filterBySearch = (product: Product): Product | boolean => {
    if (!searchValue) {
      return product;
    }
    const productName = product.name.toLowerCase();
    const productDesc = product.description.toLowerCase();
    return (
      productName.includes(searchValue.toLowerCase()) ||
      productDesc.includes(searchValue.toLowerCase())
    );
  };

  const orderProducts = (): Product[] => {
    const sortedProducts = data.filter(filterBySearch);
    sortedProducts.sort((a, b) => {
      const prodAName = a[orderType.type].toUpperCase();
      const prodBName = b[orderType.type].toUpperCase();

      if (prodAName < prodBName) {
        return orderType.sort ? -1 : 1;
      }
      if (prodAName > prodBName) {
        return orderType.sort ? 1 : -1;
      }
      return 0;
    });
    return sortedProducts;
  };

  return orderProducts();
};
