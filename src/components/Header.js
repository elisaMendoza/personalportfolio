import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.profile}>
        <Image
          src="/file.png" // /public
          alt="Foto de Elisa"
          width={120}
          height={120}
          className={styles.avatar}
        />
        <div>
          <h1 className={styles.name}>Elisa Mendoza</h1>
          <p className={styles.bio}>
            Desarrolladora web y entusiasta de la ciberseguridad. Apasionada por crear soluciones innovadoras y seguras.
          </p>
        </div>
      </div>
    </header>
  );
}
