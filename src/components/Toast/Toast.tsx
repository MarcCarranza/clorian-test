// Dependencies
import { ReactElement } from "react";

// Styles
import styles from "./Toast.module.css";

type Props = {
  children: ReactElement;
};

export default function Toast({ children }: Props): ReactElement {
  return <div className={styles.toast}>{children}</div>;
}
