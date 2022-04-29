import { Application, Response, Request } from 'express';
import { Project_skill } from '../models/project_skill';



const t_obj = new Project_skill();
//return all brands in database
async function index(req: Request, res: Response) {
    
    try {
        const resault = await t_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await t_obj.show(req.params.id as unknown as number);
        if(resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}



function mainRoutes(app: Application) {
    app.get('/project_skill', index);
    app.get('/project_skill/:id', show);
}

export default mainRoutes;
 