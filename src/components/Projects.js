import styles from './Projects.module.css';

const projects = [
  {
    title: 'WebApp Segura',
    description: 'Aplicación web con autenticación y cifrado de datos.',
    tags: ['Web', 'Ciberseguridad'],
  },
  {
    title: 'Pentesting Toolkit',
    description: 'Herramientas para pruebas de penetración y análisis de vulnerabilidades.',
    tags: ['Ciberseguridad'],
  },
  {
    title: 'Portfolio Next.js',
    description: 'Sitio personal construido con Next.js y diseño futurista.',
    tags: ['Web'],
  },
];

export default function Projects() {
  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.title}>Proyectos</h2>
      <div className={styles.grid}>
        {projects.map((project, idx) => (
          <article key={idx} className={styles.card}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDesc}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
