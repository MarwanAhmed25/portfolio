"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("../models/project");
const work_1 = require("../models/work");
const type_1 = require("../models/type");
const project_obj = new project_1.Project();
const work_obj = new work_1.Work();
const type_obj = new type_1.Type();
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
async function show(req, res) {
    try {
        const resault = await project_obj.show(req.params.slug);
        if (resault == undefined)
            return res.status(400).json('row not exist');
        const res1 = await work_obj.show(resault.work_slug);
        const res2 = await type_obj.show(resault.type_slug);
        res.status(200).render('project', { project: resault, work_company: res1.company, type: res2.name });
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
function mainRoutes(app) {
    //app.get('/projects', index);
    app.get('/projects/:slug', show);
}
exports.default = mainRoutes;
