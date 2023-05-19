// Dependencies
import { ReactElement } from "react";

// Styles
import styles from "./Loader.module.css";

export default function Loader(): ReactElement {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__static}>
        <div className={styles.loader__dynamic} />
      </div>
    </div>
  );
}
