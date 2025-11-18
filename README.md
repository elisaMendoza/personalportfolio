## Personal Portfolio - Futuristic Tron Style

This is a personal portfolio built with [Next.js](https://nextjs.org), featuring a futuristic Tron-inspired design with a fully functional contact form connected to PostgreSQL database. The portfolio showcases:

- **Your name, photo, and short bio**
- **Static links to your social networks**
- **A grid of web development and cybersecurity projects**
- **🆕 Contact form with frontend validation and PostgreSQL integration**
- **Reusable React components** (`Header`, `SocialLinks`, `Projects`, `ContactForm`)
- **Modern UI with Flexbox, CSS Grid, and custom global styles**
- **Google Fonts: Orbitron & Roboto** for a cyber look
- **🆕 Full-stack functionality with API routes and database**

---
## Getting Started

First, install dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

Usa Docker Compose para levantar PostgreSQL y PgAdmin automáticamente:

```powershell
# Levantar PostgreSQL + PgAdmin
docker-compose up -d

# Verificar que los contenedores estén corriendo
docker-compose ps

# Ver logs si hay problemas
docker-compose logs postgres
docker-compose logs pgadmin
```

**Servicios incluidos:**
- **PostgreSQL 18**: Base de datos en puerto `5437`
- **PgAdmin 4**: Interfaz web en `http://localhost:8080`
  - Email: `admin@example.com`
  - Password: `admin`

**Variables de entorno para Docker:**
```env
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
# Levantar contenedores (PostgreSQL + PgAdmin)
docker-compose up -d

# Detener contenedores
docker-compose down

# Ver logs de contenedores
docker-compose logs postgres
docker-compose logs pgadmin

# Reiniciar servicios
docker-compose restart

# Acceder al contenedor PostgreSQL
docker exec -it postgres psql -U postgres -d portfolio_db

# Limpiar volúmenes (⚠️ elimina datos persistentes)
docker-compose down -v
docker volume prune
```

### 📁 Database-Related Files

- `prisma/schema.prisma` — Database schema and models
- `src/lib/prisma.js` — Prisma client singleton
- `src/server/contact.js` — Contact CRUD operations
- `src/server/project.js` — Project CRUD operations  
- `src/app/api/contact/route.js` — Contact form API endpoint
- `.env` — Database connection string
- `docker-compose.yml` — Docker services configuration

### 🐳 Docker Configuration

#### Services:
- **postgres**: PostgreSQL 18 database
  - Port: `5437` (host) → `5432` (container)
  - User: `postgres` / Password: `admin`
  - Database: `portfolio_db`
  - Volume: `db_data` for data persistence

- **pgadmin**: PgAdmin 4 web interface
  - Port: `8080` (host) → `80` (container)
  - URL: `http://localhost:8080`
  - Login: `admin@example.com` / `admin`
  - Volume: `pgadmin_data` for settings persistence

#### Connection in PgAdmin:
- Host: `postgres` (service name)
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
- Container won't start: `docker-compose logs postgres`
- Port conflicts: Change ports in `docker-compose.yml`
- Data corruption: `docker-compose down -v && docker volume prune`
- Permission issues: Run PowerShell as Administrator

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
├── .env                              # Environment variables
├── index.js                          # Database test script
├── test-api.js                       # API test script
└── package.json                      # Dependencies and scripts
```

## 🔄 Data Flow

```
Contact Form → Frontend Validation → API Route → Backend Validation → PostgreSQL → Response → UI Update
     ↓                ↓                  ↓              ↓              ↓           ↓         ↓
ContactForm.js   validateForm()    route.js    createContact()   PostgreSQL   JSON    Success/Error
```

## 🎨 Component Architecture

- **`ContactForm.js`**: Smart component with state management, validation, and API calls
- **`ContactForm.module.css`**: Isolated styles with Tron aesthetic
- **`route.js`**: API endpoint handling HTTP requests and database operations
- **`contact.js`**: Database abstraction layer with CRUD operations
- **`prisma.js`**: Database client singleton for connection management

---

## 🚀 Ready for Production

This portfolio is production-ready with:

✅ **Modern Tech Stack**: Next.js 15 + React 19 + PostgreSQL + Prisma  
✅ **Full-Stack Functionality**: Frontend + Backend + Database  
✅ **Docker Support**: Containerized database with PgAdmin  
✅ **Type Safety**: Prisma generated types  
✅ **Error Handling**: Comprehensive error management  
✅ **Responsive Design**: Mobile-first approach  
✅ **Performance**: Optimized builds and database queries  
✅ **Security**: Input validation and sanitization  
✅ **Development Experience**: Hot reload, database GUI, container orchestration  

### 🎯 Deployment Options:

**Option 1: Docker Deployment**
- Use `docker-compose.yml` for consistent environments
- Update environment variables for production
- Consider managed PostgreSQL for production databases

**Option 2: Traditional Deployment**
- Deploy to Vercel, Netlify, or similar platforms
- Use cloud databases (AWS RDS, Railway, Supabase)
- Update `DATABASE_URL` for production

Just update your environment variables and deploy! 🚀

