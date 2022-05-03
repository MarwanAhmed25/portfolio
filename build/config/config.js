"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const config_ = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: 'postgres://xlsijqqtdbrihi:2d100978831ba0471d713b1d989418b7e531f70c3e9df221fdb1ab6345523479@ec2-34-242-8-97.eu-west-1.compute.amazonaws.com:5432/d8k4umiqsageeo',
    production: true,
    transporter: nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'marooa305@gmail.com',
            pass: 'Marooo4125881'
        }
    })
};
exports.default = config_;
//heroku pg:psql postgresql-slippery-64667 --app profile-db1
