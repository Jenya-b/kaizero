"use client";

import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Input } from "@/components/ui/Input/Input";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { Textarea } from "@/components/ui/Textarea/Textarea";
import Image from "next/image";
import { type FormEvent, useState } from "react";
import styles from "./ContactForm.module.scss";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }
    } catch {
      setStatus("error");
    }

    setStatus("error");
  }

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
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Ваше имя"
            aria-label="Ваше имя"
            required
          />
          <Input
            type="text"
            name="company"
            placeholder="Компания"
            aria-label="Компания"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Телефон"
            aria-label="Телефон"
            required
          />
          <Textarea
            name="message"
            placeholder="Коротко о вашем запросе"
            aria-label="Коротко о вашем запросе"
          />
          <label className={styles.consent}>
            <input
              type="checkbox"
              name="personalDataConsent"
              required
              aria-label="Согласие на обработку персональных данных"
            />
            <span>
              Согласен на обработку персональных данных и получение ответа на
              заявку
            </span>
          </label>
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Отправляем..." : "Отправить заявку"}
          </Button>
          {status === "success" && (
            <p className={styles.success}>Заявка отправлена. Скоро свяжемся с вами.</p>
          )}
          {status === "error" && (
            <p className={styles.error}>
              Не удалось отправить заявку. Проверьте данные и попробуйте еще раз.
            </p>
          )}
          <small>
            Ваши данные в безопасности и не передаются третьим лицам
          </small>
        </form>
      </Container>
    </section>
  );
}
