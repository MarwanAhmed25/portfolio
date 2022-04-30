import Client from '../database';



export type type = {
    id?: number;
    name: string;
  };

export class Type {
    async index(): Promise<type[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from types;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(slug: string): Promise<type> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from types where slug =($1);';
            const res = await conn.query(sql, [slug]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}