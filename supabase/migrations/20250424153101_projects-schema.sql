DROP TABLE IF EXISTS projects;

DROP TYPE IF EXISTS current_status;

CREATE TYPE current_status as enum('in-progress', 'completed');

CREATE TABLE projects (
  id bigint primary key generated always as identity not null,
  created_at timestamptz default now() not null,
  name text not null,
  slug text unique not null,
  description text default '' not null,
  status current_status default 'in-progress' not null,
  collaborators text array default array[]::varchar[] not null
);
