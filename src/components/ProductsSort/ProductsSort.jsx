"use client";

// Dependencies
import Image from "next/image";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateOrder } from "../../redux/features/homeSlice";

// Styles
import styles from "./ProductsSort.module.css";

// Constants
import { GLOBAL_ICONS } from "../../constants";

export default function ProductsSort() {
  // Redux State
  const { orderType } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  // Handlers
  const updateOrderType = (paramObj) => {
    dispatch(updateOrder(paramObj));
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sortBlock} style={{ flexGrow: 1 }}>
        <label className={styles.sortBlock__label}>Sort By</label>
        <div className={styles.sortBlock__buttonGroup}>
          <button
            className={`${styles.sortBlock__button} ${
              orderType.type === "name" ? styles.sortBlock__buttonActive : ""
            }`}
            onClick={() => updateOrderType({ type: "name" })}
            data-testid="sort-nameBtn"
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
            data-testid="sort-descBtn"
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
          data-testid="sort-orderBtn"
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
  );
}
