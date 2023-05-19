import { Item } from "../types/Cart";

export const isNotValid = (date: string): boolean => {
  const validDate = new Date(date).valueOf();
  const now = new Date().valueOf();
  return validDate - now < 0;
};

export const getItemIndexById = (items: Item[], itemId: string) => {
  return items.findIndex((item) => item.id === itemId);
};

export const sumAllItems = (items: Item[]) => {
  return items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
};
