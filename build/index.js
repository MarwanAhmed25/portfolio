"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const skill_1 = require("./models/skill");
const project_1 = require("./models/project");
const type_1 = require("./models/type");
const project_skill_1 = require("./models/project_skill");
const work_1 = require("./models/work");
const skill_2 = __importDefault(require("./handlars/skill"));
const project_2 = __importDefault(require("./handlars/project"));
const type_2 = __importDefault(require("./handlars/type"));
const work_2 = __importDefault(require("./handlars/work"));
const config_1 = __importDefault(require("./config/config"));
const connect_flash_1 = __importDefault(require("connect-flash"));
dotenv_1.default.config();
const production = config_1.default.production;
//initial port and app
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
//usig middel ware cors and body parser
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, connect_flash_1.default)());
app.use((0, cookie_parser_1.default)());
app.set('view engine', 'ejs');
app.set('views', 'front');
const p = path_1.default.join(__dirname, 'static/../../static');
app.use(express_1.default.static(p));
//configre the server to listen to port and running it
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
});
const skill_obj = new skill_1.Skill(), project_obj = new project_1.Project(), type_obj = new type_1.Type(), project_skill_obj = new project_skill_1.Project_skill(), work_obj = new work_1.Work();
app.get('/', async (req, res) => {
    const skills = await skill_obj.index();
    const projects = await project_obj.index();
    const types = await type_obj.index();
    const project_skills = await project_skill_obj.index();
    const works = await work_obj.index();
    res.render('index', { skills, projects, works, types, project_skills, user: production });
});
app.post('/send_mail', (req, res) => {
    const mailOptions = {
        from: 'marwan4125882@gmail.com',
        to: 'marwan4125881@gmail.com',
        subject: 'Message from your website...',
        text: ` ${req.body.name}  + ${req.body.email} + ${req.body.subject} + ${req.body.message}`
    };
    config_1.default.transporter.sendMail(mailOptions, function (error, info) { if (error) {
        console.log(error);
    }
    else {
        console.log('Email sent: ' + info.response);
    } });
    res.redirect('/message');
});
app.get('/message', (req, res) => {
    req.flash('success', 'Email sent successfully.');
    res.redirect('/');
});
app.get('/works/create', (req, res) => {
    try {
        res.render('create_work');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
});
app.get('/projects/create', async (req, res) => {
    try {
        const types = await type_obj.index();
        const works = await work_obj.index();
        res.render('create_project', { types: types, works: works });
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
});
(0, skill_2.default)(app);
(0, work_2.default)(app);
(0, project_2.default)(app);
(0, type_2.default)(app);
//export the app to use when importing the file
exports.default = app;
