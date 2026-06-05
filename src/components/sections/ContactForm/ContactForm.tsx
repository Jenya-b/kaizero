import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import { Input } from '@/components/ui/Input/Input';
import { SectionTitle } from '@/components/ui/SectionTitle/SectionTitle';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import styles from './ContactForm.module.scss';
import Image from 'next/image';

export function ContactForm() {
  return (
    <section className={styles.section} id="contact">
      <Container className={styles.panel}>
        <div className={styles.copy}>
          <SectionTitle title="Обсудим ваш бизнес?" />
          <p>
            Оставьте заявку, проведем короткий созвон на 15-20 минут и поймем,
            есть ли смысл в глубокой диагностике.
          </p>
          <div className={styles.links}>
            <a
              href="https://t.me/evgeny_borisevich"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt="" src="icons/telegram.svg" width={20} height={20} />
              Telegram-канал
            </a>
            <a
              href="https://www.linkedin.com/in/evgeny-borisevich/"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt="" src="icons/linkedin.svg" width={20} height={20} />
              LinkedIn
            </a>
          </div>
        </div>
        <form className={styles.form}>
          <Input
            type="text"
            name="name"
            placeholder="Ваше имя"
            aria-label="Ваше имя"
          />
          <Input
            type="text"
            name="company"
            placeholder="Компания"
            aria-label="Компания"
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            aria-label="Email"
          />
          <Input
            type="text"
            name="tel"
            placeholder="Телефон"
            aria-label="Телефон"
          />
          <Textarea
            name="message"
            placeholder="Коротко о вашем запросе"
            aria-label="Коротко о вашем запросе"
          />
          <Button type="submit">Отправить заявку</Button>
          <small>
            Ваши данные в безопасности и не передаются третьим лицам
          </small>
        </form>
      </Container>
    </section>
  );
}
