import type { CardItem } from '@/types/common';
import styles from './Card.module.scss';
import Image from 'next/image';

export function Card({ title, text, icon }: CardItem) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <Image alt="" src={icon} width={30} height={30} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
