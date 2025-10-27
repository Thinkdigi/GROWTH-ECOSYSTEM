-- Seed data for roadmap and roles

-- Roadmap seed
insert into roadmap (quarter, title, status) values
  ('2026-Q1', 'MVP architecture & UI demo', 'in-progress'),
  ('2026-Q2', 'Shopify data connectors + Pay&Earn calc', 'planned'),
  ('2026-Q3', 'Pilot cohort (3–5 merchants)', 'planned'),
  ('2026-Q4', 'Seed round & Slush launch', 'planned'),
  ('2027-Q2', 'EU expansion + Series A', 'planned');

-- Roles seed (replace emails as appropriate)
insert into roles (email, role) values
  ('samuli@example.com', 'admin'),
  ('investor@example.com', 'investor')
on conflict (email) do nothing;

-- Documents (placeholders; may already exist via upload script)
insert into documents (title, url, visibility) values
  ('Investor_Memo.md', '/docs/Investor_Memo.md', 'investor'),
  ('Whitepaper_Outline.md', '/docs/Whitepaper_Outline.md', 'investor'),
  ('FAQ.md', '/docs/FAQ.md', 'investor'),
  ('Risks_and_Mitigations.md', '/docs/Risks_and_Mitigations.md', 'investor'),
  ('Rounds_and_Valuation.md', '/docs/Rounds_and_Valuation.md', 'investor'),
  ('FAQ_PayAndEarn.md', '/docs/FAQ_PayAndEarn.md', 'investor')
on conflict (title) do nothing;
