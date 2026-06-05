import styles from "./SectionTitle.module.scss";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, align = "left" }: SectionTitleProps) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
    </div>
  );
}
