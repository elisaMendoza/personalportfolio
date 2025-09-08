import styles from './SocialLinks.module.css';

const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/elisaMendoza',
    icon: '/globe.svg',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/elisa-mendoza-developer',
    icon: '/window.svg',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/lamonaelisax',
    icon: '/insta.png',
  },
];

export default function SocialLinks() {
  return (
    <nav className={styles.socialNav} aria-label="Redes sociales">
      <ul className={styles.socialList}>
        {links.map(link => (
          <li key={link.name}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <img src={link.icon} alt={link.name} className={styles.icon} />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
