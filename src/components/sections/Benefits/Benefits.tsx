import { Container } from "@/components/ui/Container/Container";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { benefits } from "@/constants/content";
import styles from "./Benefits.module.scss";

export function Benefits() {
  return (
    <section className={styles.section} id="benefits">
      <Container className={styles.grid}>
        <div className={styles.card}>
          <SectionTitle title="Что вы получаете" />
          <ul>
            {benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <span>Видимость</span>
          <span>Контроль</span>
          <span>Эффективность</span>
          <strong>Результат</strong>
        </div>
      </Container>
    </section>
  );
}
