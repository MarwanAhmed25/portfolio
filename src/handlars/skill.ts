import { Application, Response, Request } from 'express';
import { Skill } from '../models/skill';



const skill_obj = new Skill();
//return all brands in database
async function index(req: Request, res: Response) {
    
    try {
        const resault = await skill_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await skill_obj.show(req.params.id as unknown as number);
        if(resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}



function mainRoutes(app: Application) {
    app.get('/skills', index);
    app.get('/skills/:id', show);
}

export default mainRoutes;
 