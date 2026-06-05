import { Container } from '@/components/ui/Container/Container';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { processSteps } from '@/constants/content';
import styles from './HowItWorks.module.scss';

export function HowItWorks() {
  return (
    <section className={styles.section} id="process">
      <Container>
        <div className={styles.panel}>
          <SectionTitle title="Как работаю" align="center" />
          <ol className={styles.steps}>
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.number}>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
