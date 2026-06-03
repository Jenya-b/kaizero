import { Accordion } from "@/components/ui/Accordion/Accordion";
import { Container } from "@/components/ui/Container/Container";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { faq } from "@/constants/content";
import styles from "./FAQ.module.scss";

export function FAQ() {
  return (
    <section className={styles.section} id="faq">
      <Container>
        <SectionTitle title="Частые вопросы" align="center" />
        <div className={styles.grid}>
          {faq.map((item) => (
            <Accordion key={item.question} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
