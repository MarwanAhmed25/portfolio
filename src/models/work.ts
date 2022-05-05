import Client from '../database';

export type work = {
    id?: number;
    begin: Date,
    end: Date,
    description: Text,
    company: string,
    link: string,
    title: string,
    slug?:string
  };

export class Work {
    async index(): Promise<work[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from work;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(slug: string): Promise<work> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from work where slug =($1);';
            const res = await conn.query(sql, [slug]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    ////////////////////////////////////

    async create(p: work): Promise<work> {
        try {
            const conn = await Client.connect();
            const s = p.company;
            if(s != undefined)
                p.slug = s.toLowerCase().split(' ').join('-');
            else throw new Error('not valid company name.');
            
            const sql =
    'insert into work (title,  link,  finish, description,company, start,slug) values($1,$2,$3,$4,$5,$6,$7)RETURNING *;';
            const res = await conn.query(sql, [
                p.title,
                p.link,
                p.end,
                p.description,
                p.company,
                p.begin,
                p.slug
            ]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}

