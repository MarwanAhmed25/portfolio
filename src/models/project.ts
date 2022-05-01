import Client from '../database';



export type project = {
    id?: number,
    name: string,
    description?: string,
    images:Array<string>,
    link: string,
    work_slug: string,
    code: string,
    type_slug:string
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
}