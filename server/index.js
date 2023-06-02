import  express  from "express";
import cors from 'cors'
import bodyParser from 'body-parser'

import mysql from 'mysql';
const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(express.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'goosy156817:)',
  database: 'mobile_dev'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to Amazon RDS:', error);
  } else {
    console.log('Connected to Amazon RDS database.');
  }
});

app.get('/getuserappointments',(req,res) => {
const id = '1'
const query = `Select * from appointments where user_id = ${id}`;

connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
    res.status(200).send(results);
  }
})
})

app.get('/getpracs',(req,res) => {

const query = `Select * from healthprac`;

connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
    res.status(200).send(results);
  }
})
})


app.get('/fetch', (req, res) =>{
const id = '1';

const query = `Select * from schedule where HealthPracID = ${id}`;
const query2 = `Select * from appointments where HealthPracID = ${id}`;



connection.query(query, (err, results1) => {
    if (err) {
      console.error('Error executing query 1:', err);
      return;
    }
    // console.log('Query 1 results:', results1);
    
    connection.query(query2, (err, results2) => {
      if (err) {
        console.error('Error executing query 2:', err);
        return;
      }
      // console.log('Query 2 results:', results2);
      
      // Send the results to the user
      const combinedResults = {
        query1Results: results1,
        query2Results: results2
      };
      res.json(combinedResults);
    });
  });
// connection.end()

})
app.post('/appointment', (req, res) =>{
  console.log('whatssuppers',req.body)
const  {date,time,userid,healthpracID}=req.body
console.log(date,time,userid,healthpracID)
const query = `INSERT INTO appointments (user_id,healthpracID,time,day) VALUES (?,?,?,?)`;
let values = [userid,healthpracID,time,date]
connection.query(query,values, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
    res.status(200).send(results);
  }
})
// connection.end()

})
app.post('/user', (req, res) => {
  //get al users
  const userId = 1;
  const arr=[]

  const data = req.body;
  // arr.push(data)

const days = Object.keys(data);
const times = Object.values(data);

console.log('Days:', days);
console.log('Times:', times);
const columns = days.join(', ');
const placeholders = times.map(() => '?').join(', ');
// console.log('Placeholders:', placeholders);
// const values = times.flat() ;
// const values = [times[0],times[1],times[2]]
const vals=[]
for (let i = 0; i < times.length; i++) {

vals.push(times[i])
}
// const val1 =times[0]
// const val2 = times[1]
// const val3 =times[2]
// const vals = [val1,val2,val3]
const serializedArrays = vals.map(arr => JSON.stringify(arr));
console.log('serializedArrays:', serializedArrays,days,placeholders)
// const values = ['times[0]','times[0]','times[0]','times[1]','times[2]']

// console.log(columns);
// const placeholders = times.map((time) => '(' + Array(time.length).fill('?').join(', ') + ')').join(', ');
// console.log((values.length),(placeholders.length))
const query = `INSERT INTO schedule (${days},HealthPracID) VALUES (${placeholders},1)`;
// // const query = `INSERT INTO schedule (Friday) VALUES (?)`;
// // const values = ['18:00', '19:00'];
// // const serializedArray = JSON.stringify(values);
// // // const values = [name, age, email];

connection.query(query,serializedArrays, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', results);
  }
})
// connection.end()

// Close the database connection

// arr.forEach((item)=>{
//     const {day,times}=item;
//     console.log(item)
//   })
  // console.log('yeyeyeyyeyey')
  // console.log(req)
//   const query = 'SELECT * users';
//   connection.query(query, (error, results, fields) => {
//   if (error) {
//     console.error('Error executing query:', error);
//   } else {
//     console.log('Query results:', results);
//    res.status(200).send(results);
//   }
// });
})
//   const query = 'SELECT * from user';
//   connection.query(query, (error, results, fields) => {
//   if (error) {
//     console.error('Error executing query:', error);
//   } else {
//     console.log('Query results:', results);
//   //  res.status(200).send(results);
//   }
// });

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

// app.get('/', (req, res) => {
//   //get al users

//   const query = 'SELECT * users';
//   connection.query(query, (error, results, fields) => {
//   if (error) {
//     console.error('Error executing query:', error);
//   } else {
//     console.log('Query results:', results);
//    res.status(200).send(results);
//   }
// });
// })


// // const query = 'INSERT INTO users(column1, column2, column3) VALUES (?, ?, ?)';
// // const values = ['value1', 'value2', 'value3'];
// const query = 'SELECT * FROM users';
// connection.query(query, (error, results, fields) => {
//   if (error) {
//     console.error('Error executing query:', error);
//   } else {
//     console.log('Query results:', results);
//   }
// });

app.listen(3001,()=>console.log(`Listening on port ${3001}`))