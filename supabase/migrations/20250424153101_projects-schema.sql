DROP TABLE IF EXISTS projects;

DROP TYPE IF EXISTS current_status;

CREATE TYPE current_status as enum('em-progresso', 'finalizado');

CREATE TABLE projects (
  id bigint primary key generated always as identity not null,
  created_at timestamptz default now() not null,
  name text not null,
  slug text unique not null,
  status current_status default 'em-progresso' not null,
  collaborators text array default array[]::varchar[] not null
);
