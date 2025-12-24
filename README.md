# Shopora

Shopora is a high-performance, full-stack marketplace ecosystem engineered to bridge the gap between curated product discovery and professional inventory management.

## The Experience
- **Buyers**: browse curated products and shop securely.
- **Sellers**: manage inventory, publish products, and handle orders from a dedicated dashboard.
- **Admins**: monitor users and products, moderate the platform, and oversee operations.

The project is split into two apps inside a single repo:

- `Backend/` – Node + Express API
- `frontend/` – Next.js 

---

## Project Structure

```text
Shopora/
├── Backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema (users, products, etc.)
│   │   └── migrations/            # Prisma migrations
│   ├── src/
│   │   ├── app.ts                 # Express app setup
│   │   ├── server.ts              # HTTP server bootstrap
│   │   ├── routes/                # Route groups (auth, buyer, seller, admin)
│   │   ├── controllers/           # HTTP controllers per domain
│   │   ├── services/              # Business logic services
│   │   ├── repository/            # DB access using Prisma
│   │   ├── middlewares/           # Auth, upload, rate limiting
│   │   ├── utils/                 # Email, crypto, JWT, cloudinary, etc.
│   │   └── lib/                   # Shared schemas (Zod), Prisma client
│   └── package.json
└── frontend/
		├── app/
		│   ├── (auth)/                # login, signup, reset password, email verify
		│   ├── (dashboard)/           # admin & seller dashboards
		│   ├── (shop)/browse          # buyer browsing experience
		│   └── about                  # about page
		├── components/
		│   ├── landing/               # Hero, features, dual‑user, etc.
		│   └── ui/                    # shadcn‑ui components (button, card, navbar, footer…)
		└── package.json
```

---

## Tech Stack

**Backend**

- **Node.js + Express** – HTTP server and routing.
- **Prisma** – ORM for Postgres (via `schema.prisma` + migrations).
- **Zod** – request validation (e.g. `searchSchema`, `idSchema`, env schema).
- **JWT + Cookies** – auth & role‑based access (`BUYER`, `SELLER`, `ADMIN`).
- **Cloudinary** – product image upload.
- **Resend** – email verification and password reset flows.

**Frontend**

- **Next.js** – React server components, layouts & routing.
- **TypeScript** – end‑to‑end typing.
- **Tailwind CSS** – styling and layout.
- **shadcn‑ui** – headless UI primitives (cards, buttons, dialogs, tables, tabs, etc.).
- **lucide‑react** – icon set.

---

## Backend – Getting Started

From the repo root:

```bash
cd Backend
npm install
```

### Environment

Create `.env` in `Backend/` (or follow `ENV` schema in `src/lib/schemas/env.ts`) with at least:

```env
DATABASE_URL="postgres://user:password@localhost:5432/shopora"
FRONTEND_URL="http://localhost:3001"
JWT_SECRET="super-secret-key"
...
```

### Database & Prisma

```bash
cd Backend
npm prisma migrate dev --name init
npm prisma generate
```

### Run the API

```bash
cd Backend
npm dev
```

The server will:

- mount auth routes at `/auth` (login, signup, logout, `/auth/me`, reset, verify, etc.)
- expose buyer routes at `/product` (list, get by id, search)
- expose seller routes at `/seller` (list products, create, delete)
- expose admin routes at `/admin` (users & products overview)

---

## Frontend – Getting Started

From the repo root:

```bash
cd frontend
pnpm install
```

### Environment

Create `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"  # Express backend URL
```

### Run the Frontend

```bash
cd frontend
pnpm dev
```

This will start Next.js.

---

## Development Notes

- Frontend and backend communicate via `NEXT_PUBLIC_BACKEND_URL` and CORS is configured in the backend to allow the frontend origin with credentials.
- Role‑based redirects on login:
  - `ADMIN` → `/admin`
  - `SELLER` → `/seller`
  - `BUYER` → `/browse`
- Most backend input validation uses Zod; invalid inputs should be surfaced as clear JSON errors.

---

## Contribute
We’re building the future of commerce, and we'd love your help!

```
* Fork the repository.

* Create a feature branch: git checkout -b feature/amazing-feature.

* Commit your changes: git commit -m 'Add amazing feature'.

* Push to the branch: git push origin feature/amazing-feature.

* Open a Pull Request.
```
Found a bug? Open an issue and we'll tackle it together!