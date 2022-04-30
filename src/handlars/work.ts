import { Application, Response, Request } from 'express';
import { Work } from '../models/work';



const work_obj = new Work();
//return all brands in database
async function index(req: Request, res: Response) {
    
    try {
        const resault = await work_obj.index();
        res.status(200).render('index',{result:resault});
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return only one brand from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await work_obj.show(req.params.slug);
        if(resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).json(resault);
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}



function mainRoutes(app: Application) {
    app.get('/works', index);
    app.get('/works/:slug', show);
}

export default mainRoutes;
 