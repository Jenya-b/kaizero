import { Card } from "@/components/ui/Card/Card";
import { Container } from "@/components/ui/Container/Container";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { helpCards } from "@/constants/content";
import styles from "./WhoWeHelp.module.scss";

export function WhoWeHelp() {
  return (
    <section className={styles.section} id="who">
      <Container>
        <SectionTitle title="Кому помогаю" align="center" />
        <div className={styles.grid}>
          {helpCards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
