import dotenv from 'dotenv';

dotenv.config();


const config_ = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL ||  'postgres://uwsxfxtepjrjcc:88751bb457ee2dc2062f90c3b540c3d9de6bc607e7004dcde1d6e67e36daa65f@ec2-63-32-248-14.eu-west-1.compute.amazonaws.com:5432/d19jvk7ihrvn82',  
    

};


export default config_;