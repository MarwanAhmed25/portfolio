import { Application, Response, Request } from 'express';
import { Type } from '../models/type';



const type_obj = new Type();
//return all brands in database
async function index(req: Request, res: Response) {
    
    try {
        const resault = await type_obj.index();
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await type_obj.show(req.params.slug);
        if(resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}



function mainRoutes(app: Application) {
    app.get('/types', index);
    app.get('/types/:slug', show);
}

export default mainRoutes;
 