-- Enable pgvector (Free-tier OK)
create extension if not exists vector;

-- Public investor docs registry
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text,
  visibility text check (visibility in ('public','investor','admin')) not null default 'investor',
  created_at timestamptz default now()
);

-- Chunked content for RAG
create table if not exists doc_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents(id) on delete cascade,
  content text not null,
  embedding vector(384),
  created_at timestamptz default now()
);

-- SIMPLE text index for keyword fallback
create index if not exists idx_doc_chunks_content_fts on doc_chunks using gin (to_tsvector('english', content));

-- Vector match RPC (cosine distance)
create or replace function match_chunks(query_embedding vector, match_count int)
returns table(id uuid, content text, similarity float)
language sql stable as $$
  select c.id, c.content, 1 - (c.embedding <#> query_embedding) as similarity
  from doc_chunks c
  where c.embedding is not null
  order by c.embedding <#> query_embedding
  limit match_count;
$$;

-- Keyword search RPC (fallback)
create or replace function keyword_chunks(q text, match_count int)
returns table(id uuid, content text, rank real)
language sql stable as $$
  select c.id, c.content,
         ts_rank(to_tsvector('english', c.content), plainto_tsquery('english', q)) as rank
  from doc_chunks c
  where to_tsvector('english', c.content) @@ plainto_tsquery('english', q)
  order by rank desc
  limit match_count;
$$;

-- Roles table
create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text check (role in ('visitor','investor','admin')) not null default 'visitor',
  created_at timestamptz default now()
);

-- Roadmap table
create table if not exists roadmap (
  id uuid primary key default gen_random_uuid(),
  quarter text not null,
  title text not null,
  status text check (status in ('planned','in-progress','done')) default 'planned',
  created_at timestamptz default now()
);
