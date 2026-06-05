import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <Container className={styles.grid}>
        <div className={styles.content}>
          <p className={styles.badge}>Оптимизация бизнес-процессов</p>
          <h1>
            Превращаю хаос в систему, которая приносит <span>результат</span>
          </h1>
          <p className={styles.lead}>
            Помогаю собственникам производственных и B2B компаний находить точки
            роста, устранять потери и наводить порядок в процессах.
          </p>
          <div className={styles.points}>
            <div className={styles.pointsItem}>
              <Image
                className={styles.pointsImage}
                alt=""
                src="icons/problem_hero.svg"
                width={30}
                height={30}
              />
              <span>Вижу корень проблем</span>
            </div>
            <div className={styles.pointsItem}>
              <Image
                className={styles.pointsImage}
                alt=""
                src="icons/money_hero.svg"
                width={30}
                height={30}
              />
              <span>Показываю, где теряются деньги</span>
            </div>
            <div className={styles.pointsItem}>
              <Image
                className={styles.pointsImage}
                alt=""
                src="icons/solution_hero.svg"
                width={30}
                height={30}
              />
              <span>Предлагаю рабочие решения</span>
            </div>
          </div>
          <div className={styles.actions}>
            <Button href="#contact">Заказать диагностику</Button>
            <Button href="#process" variant="secondary">
              Узнать больше
            </Button>
          </div>
        </div>
        <div className={styles.visual}>
          <Image
            src="/hero.webp"
            alt="Основатель Kaizero за рабочим столом"
            fill
            priority
            sizes="(max-width: 959px) calc(100vw - 32px), 58vw"
            className={styles.image}
          />
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
