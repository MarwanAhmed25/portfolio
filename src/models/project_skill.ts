import Client from '../database';



export type project_skill = {
    id?: number;
    project_id: number;
    skill_id:number
  };

export class Project_skill {
    async index(): Promise<project_skill[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from project_skill;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(id: number): Promise<project_skill> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from project_skill where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}