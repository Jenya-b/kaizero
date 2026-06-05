import { navigation } from '@/constants/navigation';
import { Container } from '@/components/ui/Container/Container';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <div>
          <a className={styles.logo} href="#top">
            KAIZERO
          </a>
          <p>
            Навожу порядок в процессах. Помогаю бизнесу расти осознанно и
            системно.
          </p>
        </div>
        <nav aria-label="Навигация в подвале">
          <h2>Навигация</h2>
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <address>
          <h2>Контакты</h2>
          <a href="mailto:hello@kaizero.by">evgeniy_borisevich@outlook.com</a>
          <a href="tel:+375291234567">+375 (33) 642-22-45</a>
        </address>
      </Container>
      <Container className={styles.bottom}>
        <span>© 2025 Kaizero. Все права защищены.</span>
        {/* <a href="#contact">Политика конфиденциальности</a> */}
      </Container>
    </footer>
  );
}
