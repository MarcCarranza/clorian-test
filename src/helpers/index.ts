import { Item } from "../types/Cart";

export const getItemIndexById = (items: Item[], itemId: string) => {
  return items.findIndex((item) => item.id === itemId);
};

export const sumAllItems = (items: Item[]) => {
  return items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
};
