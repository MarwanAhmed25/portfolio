import Client from '../database';



export type project = {
    id?: number,
    name: string,
    description: string,
    images:Array<string>,
    link: string,
    work_slug: string,
    code: string,
    type_slug:string,
    slug:string
  };

export class Project {
    async index(): Promise<project[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from project;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(slug: string): Promise<project> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from project where slug =($1);';
            const res = await conn.query(sql, [slug]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(p: project): Promise<project> {
        try {
            const conn = await Client.connect();
            const s = p.name;
            if(s != undefined)
                p.slug = s.toLowerCase().split(' ').join('-');
            else throw new Error('not valid name.');
            console.log(p.slug);
            
            
            const sql =
    'insert into project (name,  link,  code, description,images, type_slug, work_slug,slug) values($1,$2,$3,$4,$5,$6,$7,$8)RETURNING *;';
            const res = await conn.query(sql, [
                p.name,
                p.link,
                p.code,
                p.description,
                p.images,
                p.type_slug,
                p.work_slug,
                p.slug
            ]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}