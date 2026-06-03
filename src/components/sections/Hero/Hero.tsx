import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <Container className={styles.grid}>
        <div className={styles.content}>
          <p className={styles.badge}>
            Диагностика и оптимизация бизнес-процессов
          </p>
          <h1>
            Превращаю хаос в систему, которая приносит <span>результат</span>
          </h1>
          <p className={styles.lead}>
            Помогаю собственникам производственных компаний находить точки
            роста, устранять потери и наводить порядок в процессах.
          </p>
          <div className={styles.points}>
            <span>Вижу корень проблем</span>
            <span>Показываю, где теряются деньги</span>
            <span>Предлагаю решения, которые работают</span>
          </div>
          <div className={styles.actions}>
            <Button href="#contact">Заказать диагностику</Button>
            <Button href="#process" variant="secondary">
              Узнать больше
            </Button>
          </div>
        </div>
        <div
          className={styles.visual}
          aria-label="Бизнес-консультант за рабочим столом"
        >
          <div className={styles.portrait}>
            <div className={styles.face} />
            <div className={styles.body} />
          </div>
          <div className={styles.note}>
            <strong>Евгений Борисевич</strong>
            <span>Основатель Kaizero</span>
            <span>Бизнес-архитектор и консультант</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
