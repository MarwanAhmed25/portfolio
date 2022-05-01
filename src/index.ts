import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {Skill} from './models/skill';
import { Project } from './models/project';
import {Type} from './models/type';
import { Project_skill } from './models/project_skill';
import {Work} from './models/work';
import skillsRoutes from './handlars/skill';
import projectsRoutes from './handlars/project';
import typesRoutes from './handlars/type';
import worksRoutes from './handlars/work';
import fs from 'fs';
dotenv.config();



//initial port and app
const PORT = process.env.PORT ||5000;
const app = express();
//usig middel ware cors and body parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', 'front');
const p = path.join(__dirname, 'static/../../static');
app.use(express.static(p));
//configre the server to listen to port and running it
app.listen(PORT, (): void => {
    console.log(`server running on port ${PORT}...`);
});

const skill_obj = new Skill(), project_obj = new Project(), type_obj = new Type(), project_skill_obj = new Project_skill(), work_obj = new Work();


app.get('/',async (req,res)=>{
    const skills = await skill_obj.index();
    const projects = await project_obj.index();
    const types = await type_obj.index();
    const project_skills = await project_skill_obj.index();
    const works = await work_obj.index();
    
    res.render('index', {skills, projects, works, types, project_skills});
});

 
app.post('/send_mail',(req, res)=>{
    res.redirect('/');
    
});

app.get('/contact',(req, res)=>{
    res.render('contact');
    
});

skillsRoutes(app);
worksRoutes(app);
projectsRoutes(app);
typesRoutes(app);

//export the app to use when importing the file
export default app;
