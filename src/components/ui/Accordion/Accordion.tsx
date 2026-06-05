import styles from "./Accordion.module.scss";

type AccordionProps = {
  question: string;
  answer: string;
};

export function Accordion({ question, answer }: AccordionProps) {
  return (
    <details className={styles.accordion}>
      <summary>
        <span>{question}</span>
        <span aria-hidden="true">+</span>
      </summary>
      <p>{answer}</p>
    </details>
  );
}
