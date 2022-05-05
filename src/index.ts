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
import config from './config/config';
dotenv.config();

const production = config.production;

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
    
    res.render('index', {skills, projects, works, types, project_skills,user:production});
});

 
app.post('/send_mail',(req, res)=>{
    
    const mailOptions = {
        from: 'marwan4125882@gmail.com',
        to: 'marwan4125881@gmail.com',
        subject: 'Message from your website...',
        text: ` ${req.body.name}  + ${req.body.email} + ${req.body.subject} + ${req.body.message}`
    };

    config.transporter.sendMail(mailOptions, 
        function(error, info){if (error) { console.log(error); } else {console.log('Email sent: ' + info.response); }});
    res.redirect('/message');
    
});
app.get('/message',(req, res)=>{
    res.render('message');

    
}); 

app.get('/works/create', (req, res)=> {
    
    try {
        res.render('create_work');

    } catch (e) {
        res.status(400).json(`${e}`);
    }
});

app.get('/projects/create', async (req, res)=> {
    
    try {
        const types = await type_obj.index();
        const works = await work_obj.index();
        
        res.render('create_project',{types:types, works:works});

    } catch (e) {
        res.status(400).json(`${e}`);
    }
});

skillsRoutes(app);
worksRoutes(app);
projectsRoutes(app);
typesRoutes(app);

//export the app to use when importing the file
export default app;
