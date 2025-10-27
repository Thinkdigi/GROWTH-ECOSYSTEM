# Thinkdigi Growth Ecosystem

This project is a **Next.js** application built to demonstrate the **Thinkdigi Growth Ecosystem**, including a public marketing site and a private investor portal with a simple RAG‑based FAQ/chat system. It combines modern web technologies such as Next.js, TailwindCSS, Supabase and pgvector to showcase how a growth‑finance platform could be built.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy the example env file and fill in your Supabase credentials:

   ```bash
   cp .env.example .env.local
   ```

   Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` using values from your Supabase dashboard. You can leave `SUPABASE_SERVICE_ROLE_KEY` blank unless you plan to run server‑side scripts.

3. **Create database schema**

   Run the SQL script found in `/supabase/schema.sql` inside your Supabase project. This will create the necessary tables, indices and RPC functions for vector and keyword search. You can also seed some example data by running `/supabase/seed.sql`.

4. **Generate document embeddings (optional)**

   To create embeddings for the documents used by the investor chat, run the offline embedding script on your local machine:

   ```bash
   python scripts/offline_embedding.py public/docs/ .tmp/chunks.json
   ```

   If you set the environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` along with `UPLOAD_TO_SUPABASE=1` before running the script, the script will automatically upload the chunks and create document records in your Supabase database.

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` to view the site.

## Directory structure

- `app` – Next.js app router pages.
- `components` – Shared React components like navigation and footer.
- `data` – Quick prompt definitions for the chat.
- `lib` – Helper modules for Supabase, search functions, and local embeddings.
- `public/docs` – Markdown documents used for seeding the investor chat.
- `scripts` – Offline embedding and upload scripts.
- `supabase` – SQL schema and seed data.

## Disclaimer

This project is a prototype and demonstration. It should not be used in production without thorough security, compliance, and privacy reviews. All financial models and projections are illustrative only and not intended as investment advice.
