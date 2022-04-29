import Client from '../database';



export type project = {
    id?: number,
    name: string,
    description?: string,
    images:Array<string>,
    link: string,
    work_id: number,
    code: string,
    type_id:number
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

    async show(id: number): Promise<project> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from project where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}