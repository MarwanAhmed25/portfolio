import dotenv from 'dotenv';

dotenv.config();


const config_ = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL:'postgres://wfkkinnnkefafq:31c2876ec28eec63a14fac8005a22fd9e0f0201d12a100522e4cad46c7cd1456@ec2-63-32-248-14.eu-west-1.compute.amazonaws.com:5432/d5p5fq9nb0t2k4',  
    

};


export default config_;
//heroku pg:psql postgresql-slippery-64667 --app profile-db1