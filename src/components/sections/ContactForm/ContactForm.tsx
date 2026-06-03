import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Input } from "@/components/ui/Input/Input";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import styles from "./ContactForm.module.scss";

export function ContactForm() {
  return (
    <section className={styles.section} id="contact">
      <Container className={styles.panel}>
        <div className={styles.copy}>
          <SectionTitle title="Обсудим ваш бизнес?" />
          <p>
            Оставьте заявку, проведем короткий созвон на 15-20 минут и поймем, есть ли смысл в глубокой диагностике.
          </p>
          <div className={styles.links}>
            <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram-канал</a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <form className={styles.form}>
          <Input type="text" name="name" placeholder="Ваше имя" aria-label="Ваше имя" />
          <Input type="text" name="company" placeholder="Компания" aria-label="Компания" />
          <Input type="text" name="contact" placeholder="Email / Телефон" aria-label="Email или телефон" />
          <Textarea name="message" placeholder="Коротко о вашем запросе" aria-label="Коротко о вашем запросе" />
          <Button type="submit">Отправить заявку</Button>
          <small>Ваши данные в безопасности и не передаются третьим лицам</small>
        </form>
      </Container>
    </section>
  );
}
