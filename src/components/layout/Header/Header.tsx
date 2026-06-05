import { navigation } from '@/constants/navigation';
import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import styles from './Header.module.scss';
import Image from 'next/image';

export function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a className={styles.logo} href="#top" aria-label="Kaizero">
          <Image
            alt="Kaizero Logo"
            src="/images/logo.png"
            width={40}
            height={40}
          />
          <strong>KAIZERO</strong>
        </a>
        <nav className={styles.nav} aria-label="Основная навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <Button href="#contact">Связаться со мной</Button>
      </Container>
    </header>
  );
}
