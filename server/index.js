import  express  from "express";
import cors from 'cors'
import bodyParser from 'body-parser'

import mysql from 'mysql';
const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

// T10:00:00.000Z
// let userDate = {
//     date:"2023/05/10",
//     time:"11:00"
// }
// let userobj = [
//     {
//         name:'TimtheTatMan',
//         currAppointments:['2023/05/10','2023/05/12'],
//         currAppointmentsTime:['11:00','13:00'],
//     }
// ]

// app.get('/app',(req,res)=>{
   
// userobj.map((item) => {
// let dates = item.currAppointments
// dates.forEach((date) => {
// if (date===userDate.date){
//     console.log('date already booked')
// }
// })
// })
// })



const connection = mysql.createConnection({
  host: 'mobile-application-database.cglewgbpldmx.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'eetmyasb:)',
  database: 'mobiledevelopmentdb'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to Amazon RDS:', error);
  } else {
    console.log('Connected to Amazon RDS database.');
  }
});

// const query = 'INSERT INTO users(column1, column2, column3) VALUES (?, ?, ?)';
// const values = ['value1', 'value2', 'value3'];
const query = 'SELECT * FROM users';
connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error executing query:', error);
  } else {
    console.log('Query results:', results);
  }
});

app.listen(3001,()=>console.log(`Listening on port ${3001}`))