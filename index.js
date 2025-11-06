// Importa y crea la instancia del cliente desde módulo prisma.js
import { prisma } from './src/lib/prisma.js';
// Importa las funciones CRUD desde los módulos del servidor
import { createProject, listProjects } from './src/server/project.js';
import { createContact, listContacts } from './src/server/contact.js';

// Función 'main' asíncrona para ejecutar nuestras consultas
async function main() {
  // Ejemplo mínimo: crear registros y listarlos
  const p = await createProject({ title: 'Proyecto demo', description: 'Demo desde index' });
  console.log('Created project', p);

  const projects = await listProjects({ publishedOnly: false });
  console.log('All projects', projects.length);

  const c = await createContact({ name: 'Usuario', email: 'u@example.com', message: 'Hola desde index' });
  console.log('Created contact', c.id);

  const contacts = await listContacts({ onlyUnread: true });
  console.log('Unread contacts', contacts.length);
}

// Llama a 'main' y manejar errores y desconexión
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Muy importante: cerrar la conexión
    await prisma.$disconnect();
  });