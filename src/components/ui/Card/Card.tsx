import type { CardItem } from "@/types/common";
import styles from "./Card.module.scss";

const iconLabels: Record<CardItem["icon"], string> = {
  factory: "PR",
  people: "B2B",
  building: "UP",
  owner: "CEO",
  search: "AN",
  map: "MAP",
  idea: "IDEA",
  check: "OK",
  rocket: "GO",
  shield: "SEC",
};

export function Card({ title, text, icon }: CardItem) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        {iconLabels[icon]}
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
