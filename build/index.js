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
dotenv_1.default.config();
//initial port and app
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
//usig middel ware cors and body parser
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
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
    res.render('index', { skills, projects, works, types, project_skills });
});
app.post('/send_mail', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});
(0, skill_2.default)(app);
(0, work_2.default)(app);
(0, project_2.default)(app);
(0, type_2.default)(app);
//export the app to use when importing the file
exports.default = app;
