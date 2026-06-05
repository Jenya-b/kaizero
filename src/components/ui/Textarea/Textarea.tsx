import type { TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.scss";

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={styles.textarea} {...props} />;
}
