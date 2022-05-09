import { Application, Response, Request } from 'express';
import { project, Project } from '../models/project';
import { Work } from '../models/work';
import { Type } from '../models/type';

const project_obj = new Project();
const work_obj = new  Work();
const type_obj = new  Type();
//return all brands in database
/* async function index(req: Request, res: Response) {
    
    try {
        const resault = await project_obj.index();
        res.status(200).render('projects',{projects:resault});
    } catch (e) {
        res.status(400).json(`${e}`);
    }
} */
//return only one brand from databse using id in request params
async function show(req: Request, res: Response) {
    try {
        const resault = await project_obj.show(req.params.slug);
        if(resault == undefined)
            return res.status(400).json('row not exist');
        
        const res1 = await work_obj.show(resault.work_slug);
        const res2 = await type_obj.show(resault.type_slug);
        
        res.status(200).render('project',{project:resault, work_company: res1.company, type: res2.name});
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}


async function create(req: Request, res: Response) {
    
    try {
        const images = [req.body.image1,req.body.image2,req.body.image3,req.body.image4,req.body.image5];
        const p: project = {
            description: req.body.description,
            link: req.body.link,
            slug: '',
            name: req.body.name,
            images: images,
            work_slug: req.body.work_slug,
            code: req.body.code,
            type_slug: req.body.type_slug
        };
        console.log(p);
       
        //create the product in database and return the product to front
        await project_obj.create(p);
        
        const types = await type_obj.index();
        const works = await work_obj.index();
        
        res.render('create_project',{types:types, works:works});

    } catch (e) {
        res.status(400).json(`${e}`);
    }
}


function mainRoutes(app: Application) {
    //app.get('/projects', index);
    app.get('/:slug', show);
    app.post('/create_project',create);
}

export default mainRoutes;
 