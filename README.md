# Blog App

A blog application built with Next.js, React, Tailwind CSS, PostgreSQL, and Prisma ORM. Users can create an account, manage their profile, publish and manage blog posts.

## Features

- Register with a username, email, and password, or log in with an existing account.
- Update your username and email address.
- Change your password.
- View blog posts.
- Create, edit, and delete your own blog posts. Each post has a required title and optional content and category.

Passwords must be at least 8 characters and contain a letter, a number, and a special character.

## Tech Stack
- Next.js
- Tailwind CSS
- PostgreSQL
- Prisma ORM

## Requirements

- Node.js compatible with Next.js 16
- PostgreSQL 15 or newer

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file in the project root and configure your PostgreSQL connection and session secret:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/blog"
   SESSION_SECRET="replace-with-a-long-random-secret"
   ```

   Replace the database credentials with your local PostgreSQL values. Generate a session secret with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Initialize the database tables:

   ```bash
   pnpm prisma db init
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm contract:emit` | Regenerate Prisma contract files |

## Routes

| Route | Description |
| --- | --- |
| `/` | Log in |
| `/register` | Create an account |
| `/blog` | Browse blog posts |
| `/blog/user` | View your own posts |
| `/blog/create` | Create a post |
| `/profile` | View profile details |
| `/profile/edit` | Update profile details |
| `/profile/password` | Change password |

## Screenshot
### Login
![login](docs/login.png)

### Register
![register](docs/register.png)

### Blog List
![home](docs/home.png)

### My Blog
![home](docs/myblog.png)

### Profile
![home](docs/profile.png)