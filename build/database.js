"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("./config/config"));
const Client = new pg_1.Pool({
    connectionString: config_1.default.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
exports.default = Client;
