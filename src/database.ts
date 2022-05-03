import { Pool } from 'pg';
import config_ from './config/config';


const Client = new Pool({
    connectionString: config_.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default Client;
//export NODE_TLS_REJECT_UNAUTHORIZED='0'
