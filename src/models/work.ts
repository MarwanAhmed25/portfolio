import Client from '../database';



export type work = {
    id?: number;
    begin: Date,
    end: Date,
    description: Text,
    company: string,
    link: string,
    title: string
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

    async show(id: number): Promise<work> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from work where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}