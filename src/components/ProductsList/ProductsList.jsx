"use client";

// Dependencies
import Image from "next/image";

// Redux
import { addItemToCart } from "../../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateProductsQty, updateOrder } from "../../redux/features/homeSlice";

// Styles
import styles from "./ProductsList.module.css";

// Constants
import { GLOBAL_ICONS, QUANTITY_LIST } from "../../constants";

export default function ProductsList({ data, isLoading = false }) {
  // Redux
  const { productsQty, searchValue, orderType } = useAppSelector(
    (state) => state.home
  );
  const dispatch = useAppDispatch();

  // Handlers
  const onChangeQuantity = (productId, qty) => {
    dispatch(updateProductsQty({ productId, qty }));
  };

  const onAddProduct = (product) => {
    const qty = productsQty[product.id] || 1;
    dispatch(addItemToCart({ ...product, qty }));
  };

  const updateOrderType = (paramObj) => {
    dispatch(updateOrder(paramObj));
  };

  // Functionalities
  const filterBySearch = (product) => {
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

  const orderProducts = () => {
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

  const checkValid = (date) => {
    const validDate = new Date(date).valueOf();
    const now = new Date().valueOf();
    return validDate - now < 0;
  };

  const getSelectedQty = (productId) => {
    if (productsQty[productId]) {
      return productsQty[productId];
    }
    return "";
  };

  return (
    <div className={styles.list_container}>
      <div className={styles.list__sort}>
        <div className={styles.list__sortBlock} style={{ flexGrow: 1 }}>
          <label className={styles.sortBlock__label}>Sort By</label>
          <div className={styles.sortBlock__buttonGroup}>
            <button
              className={`${styles.sortBlock__button} ${
                orderType.type === "name" ? styles.sortBlock__buttonActive : ""
              }`}
              onClick={() => updateOrderType({ type: "name" })}
            >
              Name
            </button>
            <button
              className={`${styles.sortBlock__button} ${
                orderType.type === "description"
                  ? styles.sortBlock__buttonActive
                  : ""
              }`}
              onClick={() => updateOrderType({ type: "description" })}
            >
              Description
            </button>
          </div>
        </div>
        <div className={styles.list__sortBlock}>
          <label className={styles.sortBlock__label}>Order</label>
          <button
            className={styles.sortBlock__button}
            onClick={() => updateOrderType({ sort: !orderType.sort })}
          >
            <Image
              src={GLOBAL_ICONS.order.src}
              alt={GLOBAL_ICONS.order.altText}
              width={15}
              height={15}
              style={{
                transform: `scaleY(${orderType.sort ? "-1" : "1"})`,
              }}
            />
          </button>
        </div>
      </div>
      <ul className={styles.list}>
        {!isLoading &&
          orderProducts().map((product) => {
            return (
              <li className={styles.list__product} key={product.id}>
                <div className={styles.list__info}>
                  <h4 className={styles.info__name}>{product.name}</h4>
                  <p className={styles.info__desc}>{product.description}</p>
                </div>
                <div className={styles.list__qty}>
                  <select
                    className={styles.qty__select}
                    id="qty"
                    onChange={(e) =>
                      onChangeQuantity(product.id, e.currentTarget.value)
                    }
                    disabled={checkValid(product.valid_until)}
                    value={getSelectedQty(product.id)}
                  >
                    {QUANTITY_LIST.map((qty) => (
                      <option key={`${product.id}-${qty}`} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  <button
                    className={styles.qty__addBtn}
                    onClick={() => onAddProduct(product)}
                    disabled={checkValid(product.valid_until)}
                  >
                    <Image
                      src={GLOBAL_ICONS.add.src}
                      alt={GLOBAL_ICONS.add.altText}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
