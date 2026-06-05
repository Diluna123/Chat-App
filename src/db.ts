import mysql from 'mysql2';

const db = mysql.createConnection
({
    host:'localhost',
    user:'root',
    password:'Corei7diluna09',
    database:'chat-app'
});

db.connect((err)=>{
    if(err){
        console.error('Error connecting to MySQL database:', err);
        return;

    }
        console.log('Connected to MySQL database');
    

});
export default db;
