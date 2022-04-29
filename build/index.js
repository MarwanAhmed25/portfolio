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
const work_1 = __importDefault(require("./handlars/work"));
const skill_1 = __importDefault(require("./handlars/skill"));
const type_1 = __importDefault(require("./handlars/type"));
const project_skill_1 = __importDefault(require("./handlars/project_skill"));
const project_1 = __importDefault(require("./handlars/project"));
const skill_2 = require("./models/skill");
const project_2 = require("./models/project");
dotenv_1.default.config();
//initial port and app
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
//usig middel ware cors and body parser
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.set('view engine', 'ejs');
app.set('views', 'front');
const p = path_1.default.join(__dirname, 'static/../../static');
app.use(express_1.default.static(p));
//configre the server to listen to port and running it
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
});
app.get('/', async (req, res) => {
    const skill_obj = new skill_2.Skill();
    const skills = await skill_obj.index();
    const project_obj = new project_2.Project();
    const projects = await project_obj.index();
    res.render('index', { skills: skills, projects: projects });
});
(0, work_1.default)(app);
(0, project_1.default)(app);
(0, skill_1.default)(app);
(0, type_1.default)(app);
(0, project_skill_1.default)(app);
//export the app to use when importing the file
exports.default = app;
