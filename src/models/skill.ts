import Client from '../database';



export type skill = {
    id?: number;
    name: string;
  };

export class Skill {
    async index(): Promise<skill[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from skill;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(slug: string): Promise<skill> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from skill where slug =($1);';
            const res = await conn.query(sql, [slug]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}