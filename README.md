## Personal Portfolio - Futuristic Tron Style

This is a personal portfolio built with [Next.js](https://nextjs.org), featuring a futuristic Tron-inspired design with a fully functional contact form connected to PostgreSQL database. The portfolio showcases:

- **Your name, photo, and short bio**
- **Static links to your social networks**
- **A grid of web development and cybersecurity projects**
- **🆕 Contact form with frontend validation and PostgreSQL integration**
- **🐳 Fully containerized with Docker** (Next.js app + PostgreSQL + PgAdmin)
- **Reusable React components** (`Header`, `SocialLinks`, `Projects`, `ContactForm`)
- **Modern UI with Flexbox, CSS Grid, and custom global styles**
- **Google Fonts: Orbitron & Roboto** for a cyber look
- **🆕 Full-stack functionality with API routes and database**
- **🚀 Auto-migrations** on container startup

---
## Getting Started

### 🐳 Quick Start with Docker (Recommended)

The easiest way to run the entire application:

```powershell
# Clone the repository
git clone https://github.com/elisaMendoza/personalportfolio.git
cd personalportfolio

# Start all services (app + database + pgadmin)
docker-compose up -d

# View logs
docker-compose logs -f app
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

### 💻 Local Development (Without Docker)

Alternatively, run the development server locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Main files to customize:
- `src/app/page.js` (main page layout)
- `src/components/Header.js` (name, photo, bio)
- `src/components/SocialLinks.js` (social media links)
- `src/components/Projects.js` (project cards)
- `src/components/ContactForm.js` (contact form with validation)
- `src/app/globals.css` (global Tron-like styles)
- `src/app/api/contact/route.js` (contact form API endpoint)


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Orbitron](https://fonts.google.com/specimen/Orbitron) and [Roboto](https://fonts.google.com/specimen/Roboto) for a futuristic look.


---

## Customization & Deployment

- Update your photo in `public/file.svg` or replace with your own image
- Edit your bio and social links in the respective components
- Add or modify projects in `Projects.js`
- Customize the contact form validation in `ContactForm.js`
- Modify database models in `prisma/schema.prisma`

To deploy, use [Vercel](https://vercel.com/) or your preferred platform. See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

**Important for deployment:** Update your `DATABASE_URL` environment variable with your production PostgreSQL database credentials.

---

## Database Setup (PostgreSQL + Prisma)

This project includes a complete Prisma setup with PostgreSQL to store `Project` and `Contact` records. The contact form is fully integrated with the database.

> 🐳 **¡Nuevo!** Ahora puedes usar Docker para una configuración más fácil y consistente.

### 🐳 Option 1: Docker Setup (Recomendado)

**Todo en un comando - Aplicación completa containerizada:**

```powershell
# Levantar todos los servicios
docker-compose up -d

# Verificar que los contenedores estén corriendo
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f app
docker-compose logs -f postgres
```

**🎯 Servicios incluidos:**

1. **📱 Portfolio App (Next.js 15)**
   - URL: `http://localhost:3000`
   - Auto-ejecuta migraciones de Prisma al iniciar
   - Production-ready build con standalone output
   - Healthcheck automático de PostgreSQL

2. **🗄️ PostgreSQL 18**
   - Puerto: `5437` (host) → `5432` (container)
   - Database: `portfolio_db`
   - User: `postgres` / Password: `admin`
   - Persistencia con volumen Docker

3. **🖥️ PgAdmin 4**
   - URL: `http://localhost:8080`
   - Login: `admin@example.com` / `admin`
   - Conectar a host: `postgres`, port: `5432`

**Variables de entorno (automáticas en Docker):**
```env
# Dentro del contenedor (usa nombre de servicio)
DATABASE_URL="postgresql://postgres:admin@postgres:5432/portfolio_db?schema=public"

# Para desarrollo local (usa localhost)
DATABASE_URL="postgresql://postgres:admin@localhost:5437/portfolio_db?schema=public"
```

### 🖥️ Option 2: Local Setup

### 📋 Prerequisites

1. **PostgreSQL Database**: Make sure you have PostgreSQL installed and running
2. **Database Creation**: Create a database named `portfolio_db` (or update the name in `.env`)

### 🚀 Quick Setup

#### Para Docker (Recomendado):

1. **Install Dependencies**:
```powershell
npm install
```

2. **Levantar contenedores**:
```powershell
docker-compose up -d
```

3. **Configure Environment Variables** (`.env`):
```env
DATABASE_URL="postgresql://postgres:admin@localhost:5437/portfolio_db?schema=public"
```

4. **Generate Prisma Client & Run Migrations**:
```powershell
npx prisma generate
npx prisma migrate deploy
```

#### Para instalación local:

1. **Install Dependencies**:
```powershell
npm install
```

2. **Configure Environment Variables** (`.env`):
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/portfolio_db?schema=public"
```

3. **Generate Prisma Client**:
```powershell
npx prisma generate
```

4. **Run Database Migrations**:

```powershell
npx prisma migrate dev
```

5. **🎯 Test the Setup**:

```powershell
# Test database functions
node index.js

# Test the contact API (with server running)
node test-api.js
```

### 📊 Database Models

#### Contact Model
Stores messages from the contact form:
```prisma
model Contact {
  id        Int      @id @default(autoincrement())
  name      String   // User's full name
  email     String   // User's email address  
  subject   String   // Message subject
  message   String   // Message content
  read      Boolean  @default(false) // Admin read status
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Project Model
Stores portfolio projects:
```prisma
model Project {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  image       String?  // path or URL to project image
  repo        String?  // repository URL
  tags        Json?    // array of technology tags
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 🛠️ Available Scripts

#### Desarrollo:
```powershell
# Start development server
npm run dev

# Test database connection and CRUD operations
node index.js

# Test contact API endpoint
node test-api.js

# Open Prisma Studio (database GUI)
npx prisma studio
```

#### Base de datos:
```powershell
# Generate Prisma client
npx prisma generate

# Deploy migrations (production)
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Create new migration after schema changes
npx prisma migrate dev --name your_migration_name
```

#### Docker:
```powershell
# Levantar todos los servicios (App + PostgreSQL + PgAdmin)
docker-compose up -d

# Levantar con rebuild (después de cambios en código)
docker-compose up --build -d

# Ver estado de todos los contenedores
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f app
docker-compose logs -f postgres
docker-compose logs -f pgadmin

# Detener contenedores (mantiene datos)
docker-compose down

# Detener y eliminar volúmenes (⚠️ elimina datos)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart app

# Reconstruir solo la app
docker-compose up --build app -d

# Acceder al contenedor de la app
docker exec -it portfolio_app sh

# Acceder al contenedor PostgreSQL
docker exec -it portfolio_postgres psql -U postgres -d portfolio_db

# Ver uso de recursos
docker stats

# Limpiar sistema Docker completo
docker system prune -a --volumes
```

### 📁 Database-Related Files

- `prisma/schema.prisma` — Database schema and models
- `src/lib/prisma.js` — Prisma client singleton
- `src/server/contact.js` — Contact CRUD operations
- `src/server/project.js` — Project CRUD operations  
- `src/app/api/contact/route.js` — Contact form API endpoint
- `.env` — Local development database connection
- `.env.docker` — Docker container database connection
- `docker-compose.yml` — Docker services orchestration
- `Dockerfile` — Multi-stage Next.js container build
- `docker-entrypoint.sh` — Startup script (migrations + app)
- `.dockerignore` — Files excluded from Docker build

### 🐳 Docker Configuration

#### Services:

**1. app (Next.js Application)**
  - Container: `portfolio_app`
  - Port: `3000` (host) → `3000` (container)
  - URL: `http://localhost:3000`
  - Features:
    - ✅ Multi-stage build (deps → builder → runner)
    - ✅ Auto-executes Prisma migrations on startup
    - ✅ Production-ready with standalone output
    - ✅ Waits for PostgreSQL health check
    - ✅ Non-root user (nextjs:nodejs)
  - Environment:
    - `NODE_ENV=production`
    - `DATABASE_URL=postgresql://postgres:admin@postgres:5432/portfolio_db?schema=public`

**2. postgres (PostgreSQL 18)**
  - Container: `portfolio_postgres`
  - Port: `5437` (host) → `5432` (container)
  - User: `postgres` / Password: `admin`
  - Database: `portfolio_db`
  - Volume: `db_data` → `/var/lib/postgresql`
  - Healthcheck: `pg_isready -U postgres` every 5s

**3. pgadmin (PgAdmin 4)**
  - Container: `portfolio_pgadmin`
  - Port: `8080` (host) → `80` (container)
  - URL: `http://localhost:8080`
  - Login: `admin@example.com` / `admin`
  - Volume: `pgadmin_data` → `/var/lib/pgadmin`

#### Network:
- Custom bridge network: `portfolio_network`
- All services communicate using service names

#### Connection in PgAdmin:
- Host: `postgres` (service name, not localhost)
- Port: `5432` (internal container port)
- Database: `portfolio_db`
- Username: `postgres` / Password: `admin`

### 🔧 API Endpoints

#### POST `/api/contact`
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "contact": {
    "id": 1,
    "createdAt": "2025-11-12T21:34:01.112Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message description"
}
```

### 🔍 Contact Form Features

The contact form (`src/components/ContactForm.js`) includes:

- ✅ **Frontend Validation**: Real-time validation for all fields
- ✅ **Backend Validation**: Server-side validation and sanitization  
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Loading States**: Visual feedback during form submission
- ✅ **Success Animation**: Confirmation message with auto-reset
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Tron Aesthetic**: Matches the futuristic portfolio theme

### 🚨 Troubleshooting

**Docker Issues:**
- **App container won't start**: `docker-compose logs app`
  - Check if migrations failed
  - Verify DATABASE_URL is correct
  - Ensure PostgreSQL is healthy: `docker-compose ps`
- **Build failures**: `docker-compose build --no-cache app`
- **Port conflicts**: Change ports in `docker-compose.yml`
- **Data corruption**: `docker-compose down -v && docker volume prune -f`
- **Permission issues**: Run PowerShell as Administrator
- **Slow builds**: Use `docker system prune` to free space
- **Migration errors**: Check `docker logs portfolio_app` for Prisma errors

**Database Connection Issues:**
- **Docker**: Verify containers running with `docker-compose ps`
- **Local**: Verify PostgreSQL is running: `Get-Service *postgresql*`
- Check credentials in `.env` file
- Ensure database `portfolio_db` exists

**Prisma Issues:**
- Run `npx prisma generate` after schema changes
- Use `npx prisma migrate reset` for fresh start (⚠️ deletes data)
- Check `npx prisma studio` to browse database
- **Docker**: Ensure containers are running before Prisma commands

**API Issues:**
- Verify server is running on `http://localhost:3000`
- **Docker**: Ensure database container is healthy
- Check browser developer tools for network errors
- Test API directly with `node test-api.js`

**Migration Conflicts:**
```powershell
# If you get provider mismatch errors:
rm -rf prisma/migrations  # Delete migration history
npx prisma migrate dev --name init  # Create fresh migrations

# For Docker reset:
docker-compose down -v
docker volume prune
docker-compose up -d
```

**PgAdmin Issues:**
- Can't access `http://localhost:8080`: Check if container is running
- Connection refused: Use host `postgres`, not `localhost`
- Login issues: Default credentials are `admin@example.com` / `admin`

---

## 📁 Project Structure

```
personalportfolio/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   └── 📁 contact/
│   │   │       └── route.js          # Contact API endpoint
│   │   ├── globals.css               # Global Tron styles
│   │   ├── layout.js                 # Root layout
│   │   └── page.js                   # Main page
│   ├── 📁 components/
│   │   ├── ContactForm.js            # Contact form with validation
│   │   ├── ContactForm.module.css    # Contact form styles
│   │   ├── Header.js                 # Portfolio header
│   │   ├── Projects.js               # Project showcase
│   │   └── SocialLinks.js            # Social media links
│   ├── 📁 lib/
│   │   └── prisma.js                 # Prisma client singleton
│   └── 📁 server/
│       ├── contact.js                # Contact CRUD operations
│       └── project.js                # Project CRUD operations
├── 📁 prisma/
│   ├── 📁 migrations/                # Database migration files
│   └── schema.prisma                 # Database schema
├── 📁 public/                        # Static assets
├── 🐳 docker-compose.yml             # Docker services orchestration
├── 🐳 Dockerfile                     # Multi-stage Next.js build
├── 🐳 docker-entrypoint.sh           # Container startup script
├── 🐳 .dockerignore                  # Docker build exclusions
├── .env                              # Local environment variables
├── .env.docker                       # Docker environment variables
├── index.js                          # Database test script
├── test-api.js                       # API test script
├── next.config.mjs                   # Next.js config (standalone)
└── package.json                      # Dependencies and scripts
```

## 🔄 Data Flow

### Application Request Flow:
```
Browser → Next.js App (Container) → API Route → Prisma Client → PostgreSQL (Container)
   ↓             ↓                       ↓            ↓               ↓
User      ContactForm.js            route.js    createContact()  portfolio_db
```

### Docker Container Flow:
```
docker-compose up -d
     ↓
1. PostgreSQL starts → Creates database → Healthcheck passes
     ↓
2. App container starts → Waits for PostgreSQL → Runs migrations → Starts Next.js
     ↓
3. PgAdmin starts → Available for database management
     ↓
4. All services connected via portfolio_network
```

### Contact Form Data Flow:
```
Contact Form → Frontend Validation → API Route → Backend Validation → PostgreSQL → Response → UI Update
     ↓                ↓                  ↓              ↓              ↓           ↓         ↓
ContactForm.js   validateForm()    route.js    createContact()   PostgreSQL   JSON    Success/Error
```

## 🎨 Component Architecture

### React Components:
- **`ContactForm.js`**: Smart component with state management, validation, and API calls
- **`ContactForm.module.css`**: Isolated styles with Tron aesthetic
- **`Header.js`**: Portfolio header with bio and photo
- **`Projects.js`**: Grid of project cards
- **`SocialLinks.js`**: Social media icons and links

### Backend:
- **`route.js`**: API endpoint handling HTTP requests and database operations
- **`contact.js`**: Database abstraction layer with CRUD operations
- **`project.js`**: Project database operations
- **`prisma.js`**: Database client singleton for connection management

### Docker Architecture:
```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Compose Stack                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────┐ │
│  │  Next.js App     │  │  PostgreSQL 18   │  │ PgAdmin  │ │
│  │  (portfolio_app) │  │ (portfolio_pg)   │  │          │ │
│  ├──────────────────┤  ├──────────────────┤  ├──────────┤ │
│  │ Port: 3000       │  │ Port: 5437→5432  │  │ Port: 80 │ │
│  │ Node 20 Alpine   │  │ Postgres 18      │  │ PgAdmin4 │ │
│  │ Multi-stage      │  │ Volume: db_data  │  │ Web GUI  │ │
│  │ Standalone build │  │ Healthcheck ✓    │  │          │ │
│  └────────┬─────────┘  └────────┬─────────┘  └─────┬────┘ │
│           │                     │                   │      │
│           └─────────────────────┴───────────────────┘      │
│                    portfolio_network (bridge)              │
└─────────────────────────────────────────────────────────────┘
```

### Dockerfile Multi-Stage Build:
```
Stage 1 (deps):     Install dependencies → node_modules
       ↓
Stage 2 (builder):  Copy deps → Generate Prisma → Build Next.js
       ↓
Stage 3 (runner):   Copy only production files → Install Prisma CLI
       ↓            → Setup entrypoint script → Run as non-root
       ↓
   Production Image: Optimized, secure, ready to deploy
```

---

## 🚀 Ready for Production

This portfolio is production-ready with:

✅ **Modern Tech Stack**: Next.js 15 + React 19 + PostgreSQL 18 + Prisma 6  
✅ **Full-Stack Functionality**: Frontend + Backend + Database  
✅ **Fully Containerized**: App + Database + Admin Panel with Docker  
✅ **Auto-Migrations**: Database migrations run automatically on startup  
✅ **Multi-Stage Builds**: Optimized Docker images with standalone output  
✅ **Type Safety**: Prisma generated types  
✅ **Error Handling**: Comprehensive error management  
✅ **Responsive Design**: Mobile-first approach  
✅ **Performance**: Optimized builds and database queries  
✅ **Security**: Input validation, sanitization, non-root containers  
✅ **Development Experience**: Hot reload, database GUI, container orchestration  

### 🎯 Deployment Options:

**Option 1: Docker Deployment (Full Control)**
```powershell
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Use managed databases for production
# Update DATABASE_URL to point to cloud PostgreSQL
```
- Deploy to any VPS (DigitalOcean, AWS EC2, Azure VM)
- Use `docker-compose.yml` for consistent environments
- Consider managed PostgreSQL (AWS RDS, DigitalOcean Managed DB)
- Set secure passwords in production `.env`

**Option 2: Platform Deployment (Serverless)**
- Deploy Next.js to **Vercel** (automatic from Git)
- Use cloud databases: **Supabase**, **Railway**, **Neon**
- Update `DATABASE_URL` in platform environment variables
- Run `npx prisma migrate deploy` in build step

**Option 3: Hybrid (App on Platform + Dockerized DB)**
- Next.js on Vercel/Netlify
- PostgreSQL on Docker in VPS
- PgAdmin for database management

### 🔐 Production Checklist:

- [ ] Change default passwords in `docker-compose.yml`
- [ ] Use strong `POSTGRES_PASSWORD` and `PGADMIN_DEFAULT_PASSWORD`
- [ ] Set `NODE_ENV=production`
- [ ] Configure SSL for PostgreSQL connections
- [ ] Set up automatic backups for `db_data` volume
- [ ] Configure firewall rules (only expose necessary ports)
- [ ] Use secrets management (Azure Key Vault, AWS Secrets Manager)
- [ ] Set up monitoring and logging (Prometheus, Grafana)
- [ ] Enable HTTPS with reverse proxy (nginx, Traefik)
- [ ] Configure rate limiting on API routes
- [ ] Set up CI/CD pipeline (GitHub Actions, GitLab CI)
- [ ] Enable Docker health checks in production
- [ ] Configure resource limits in docker-compose

---

## 🛠️ Technical Highlights

### Docker Features:
- ✨ **Multi-stage builds** for minimal image size
- ✨ **Non-root user** for enhanced security
- ✨ **Health checks** to ensure service availability
- ✨ **Named volumes** for data persistence
- ✨ **Custom network** for service isolation
- ✨ **Automatic migrations** via entrypoint script
- ✨ **Standalone output** for optimal Next.js deployment

### Next.js Features:
- 🚀 **Turbopack** for faster builds and HMR
- 🚀 **App Router** with Server Components
- 🚀 **API Routes** for backend functionality
- 🚀 **Module CSS** for component-scoped styles
- 🚀 **Font optimization** with next/font

### Database Features:
- 💾 **Prisma ORM** for type-safe database access
- 💾 **Migration system** for version control
- 💾 **Connection pooling** via Prisma Client
- 💾 **PostgreSQL 18** with latest features
- 💾 **PgAdmin 4** for visual database management

### Development Experience:
- 🔧 **Hot Module Replacement** in development
- 🔧 **Docker Compose** for one-command setup
- 🔧 **Prisma Studio** for database browsing
- 🔧 **TypeScript support** (easily upgradable)
- 🔧 **ESLint** for code quality

---

## 📚 Learn More

### Documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

### Tutorials:
- [Next.js Learn](https://nextjs.org/learn)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)
- [Docker for Beginners](https://docker-curriculum.com/)

---

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

### How to contribute:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📝 License

This project is open source and available for personal and commercial use.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Prisma Team** for the excellent ORM
- **Docker** for containerization technology
- **PostgreSQL** for the robust database
- **Google Fonts** for Orbitron and Roboto

---

**Made with ❤️ and ☕ by Elisa Mendoza**

Just update your environment variables and deploy! 🚀

