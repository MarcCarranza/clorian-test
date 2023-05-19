"use client";

// Dependencies
import { ReactElement, useEffect, useState } from "react";

// Styles
import styles from "./Toast.module.css";

type Props = {
  isOpen: boolean;
  message: string;
  setToast: Function;
};

export default function Toast({
  isOpen,
  message,
  setToast,
}: Props): ReactElement {
  // Use Effects
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setToast(false);
      }, 1000);
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div className={styles.toast_wrapper}>
          <div className={styles.toast}>{message}</div>
        </div>
      )}
    </div>
  );
}
