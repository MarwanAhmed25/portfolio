"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const work_1 = require("../models/work");
const work_obj = new work_1.Work();
//return all brands in database
/* async function index(req: Request, res: Response) {
    
    try {
        const resault = await work_obj.index();
        res.status(200).render('works', {works:resault});
    } catch (e) {
        res.status(400).json(`${e}`);
    }
} */
//return only one brand from databse using id in request params
async function show(req, res) {
    try {
        const resault = await work_obj.show(req.params.slug);
        if (resault == undefined)
            return res.status(400).json('row not exist');
        res.status(200).render('work', { work: resault });
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
///////////////////////////////////////////////////////
async function create(req, res) {
    try {
        const p = {
            begin: req.body.begin,
            end: req.body.end,
            description: req.body.description,
            company: req.body.company,
            link: req.body.link,
            title: req.body.title,
            slug: ''
        };
        //create the product in database and return the product to front
        const result = await work_obj.create(p);
        res.status(200).render('create_work', { result });
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
async function get_create(req, res) {
    try {
        res.render('create_work');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
function mainRoutes(app) {
    // app.get('/works', index);
    app.get('/works/:slug', show);
    app.post('/create_work', create);
    app.get('/works/create', get_create);
}
exports.default = mainRoutes;
