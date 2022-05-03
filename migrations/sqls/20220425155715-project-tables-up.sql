
create table work(id serial primary key, slug varchar(150)unique not null, link varchar(100), start date, finish date, description text, company varchar(250), title varchar(200));
create table project(id serial primary key, slug varchar(150)unique not null, name varchar(100) unique not null, link varchar(300), images text[], code varchar(300),description text, work_slug varchar references work(slug)on delete set null, type_slug varchar references types(slug)on delete set null);
create table types(id serial primary key, slug varchar(150)unique not null, name varchar(100) unique not null);
create table skill(id serial primary key, slug varchar(150)unique not null, name varchar(100) unique not null, persantge int not null);
create table project_skill(id serial primary key, slug varchar(150)unique not null, skill_id bigint references skill(id)on delete cascade, project_id bigint references project(id)on delete cascade);


/*
*/