import { Container } from "@/components/ui/Container/Container";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { formats } from "@/constants/content";
import styles from "./WorkFormats.module.scss";

export function WorkFormats() {
  return (
    <section className={styles.section} id="formats">
      <Container>
        <SectionTitle title="Форматы работы" align="center" />
        <div className={styles.grid}>
          {formats.map((format) => (
            <article className={styles.format} key={format.title}>
              <span className={styles.icon}>{format.icon}</span>
              <div>
                <h3>{format.title}</h3>
                <p>{format.text}</p>
              </div>
              <strong>{format.price}</strong>
            </article>
          ))}
        </div>
        <p className={styles.note}>Можно адаптировать формат под ваш бизнес</p>
      </Container>
    </section>
  );
}
