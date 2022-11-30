export default (): any =>{
    const config : any = {

        sql:{
            host: 'localhost',
            port: '3308',
            username: process.env.ORM_USERNAME ||'root',
            password: process.env.ORM_PASSWORD ||'password',
            database: process.env.ORM_DATABASE ||'pos'
        }
    }
    return config;
}