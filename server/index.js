import  express  from "express";
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from "multer";
import mysql from 'mysql';
import fileUpload from "express-fileupload";
import fs from 'fs-extra';
import appointmentRoutes from './routes/appointmentsRoutes.js'
import loginRegisterRoutes from './routes/loginRegisterRoutes.js'

const app = express();
import * as path from 'path';
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(express.json());

app.use('/appointments',appointmentRoutes)
app.use('/verify',loginRegisterRoutes)
export const connection = mysql.createConnection({
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
// app.use('/uploads', express.static('./uploads'));

// API endpoint to fetch file names (or paths)
app.get('/files/:id', (req, res) => {
  const {id} =req.params

  const files = fs.readdirSync('./uploads');
      const matchingFiles = files.filter((file) => {
      const fileNameParts = file.split('_');
  console.log(fileNameParts,'partsssssss')
      const fileId = fileNameParts[0];
      console.log(fileId,'id')
      return fileId === id;
    });

  res.json(matchingFiles);
});
app.delete('/delete/msg/:id', (req, res) => {
  const {id} = req.params
  const query =  `Delete  from messages where idMessages = ${id}`

    
connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
console.log('deleted')
    res.status(200).send(results);
  }
})
});

// API endpoint to download a specific file 
  app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join('uploads', filename);
  console.log('path',filePath);
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Set appropriate headers for the file download
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Send the file as the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Set the destination folder where the files will be stored
  },
  filename: function(req, file, cb){
const userId = req.body.userId
console.log(req.body);
const original = file.originalname
const fileName = `${userId}-${original}`
    cb(null, fileName); // Use the original filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

app.post('/upload',upload.single('document') ,(req, res) => {

  const userId = req.body.userId
  const uploadedFile = req.file;
  const newFilename = userId + '_'+ Date.now() + '_' + uploadedFile.originalname; //make file unique
  const newFilePath = './uploads/'+newFilename;

   fs.rename(uploadedFile.path, newFilePath, function(err) {
    if (err) {                                                                 //rename doc to more unique  name
      // Handle the error
      console.error('Error renaming file:', err);
      res.status(500).json({ error: 'Failed to rename file' });
    } else {
      // File renamed successfully
   return res.json({ message: 'File uploaded and renamed successfully' });
    }
  });
});

app.get('/fetchdocs/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const folderPath = './uploads'; // Replace with the actual path to your Multer folder

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch documents' });
    }

    const documents = files.filter((file) => file.startsWith(userId));

    // Create an array of document objects with file paths
    const documentList = documents.map((file) => {
      const filePath = path.join(folderPath, file);
      return { filename: file, path: filePath };
    });

    return res.json({ documents: documentList });
  });
});
app.get('/fetchSchedule', (req, res) => {
//   connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to Amazon RDS:', error);
//   } else {
//     console.log('Connected to Amazon RDS database.');
//   }
// });

  const id = '1'

  const query = `Select * from schedule where HealthPracID = ${id}`


  
connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
console.log('sched',results)
    res.status(200).send(results);
  }
})
    //  connection.end((error) => {
    //   if (error) {
    //     console.error('Error closing the database connection:', error);
    //     return;
    //   }
    //   console.log('Database connection closed.');
    // });
});





























app.get('/fetchmsg',(req,res) => {
  const id = req.query.id;
  const useradd = req.query.useradd;
  try{
   if (useradd ==='yes'){

const query = `Select * from messages where healthPracId =${id} and useradd = 'yes'`;
connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
    res.status(200).send(results);
  }
})
   }else{
  const query = `Select * from messages where user_id =${id} and useradd = 'no'`;  
connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
    res.status(200).send(results);
  }
})   
}


  } catch (error) {
    console.error('Error fetching data:', error);
  
  }
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


app.get('/fetch/:id', (req, res) =>{
const id = req.params.id;
//select query to select appointment fro healthprac and shcedule
const query = `Select * from schedule where HealthPracID = ${id}`;
const query2 = `Select * from appointments where HealthPracID = ${id}`;



connection.query(query, (err, results1) => {
    if (err) {
      console.error('Error executing query 1:', err);
      return;
    }

      //execute query
    connection.query(query2, (err, results2) => {
      if (err) {
        console.error('Error executing query 2:', err);
        return;
      }

      
      // Send the results to the user
      const combinedResults = {
        query1Results: results1,
        query2Results: results2
      };
      console.log(combinedResults,'combination');
      res.json(combinedResults);
    });
  });
// connection.end()

})


app.get('/fetchPatients',(req,res)=>{
//     connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to Amazon RDS:', error);
//   } else {
//     console.log('Connected to Amazon RDS database.');
//   }
// });
  const healthPracID = '1'
  async function fetchData() {
    try {
    const query2 = `SELECT * FROM patients WHERE HealthPracID = '${healthPracID}'`;
    const results = await new Promise((resolve, reject) => {
      connection.query(query2, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      // exists= true
      return results 
      // console.log('Value of exists:', exists);
    }else{
      return false
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
(async () => {
  try {
    let values = []
    const results = await fetchData();
   
    if (results.length>0){
      results.map((item)=>{
        values.push(item.user_id)
      })
      const vals = values.join(',');
      const query2 = `SELECT * FROM user WHERE user_id IN (${vals})`;
  
   connection.query(query2, (error, results) => {
  if (error) {
    console.error('Error fetching data:', error);
  } else {
   res.status(200).send(results);
    // Handle the fetched data as needed
  }
});

    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

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


app.post('/user', (req, res) => {

const {selectedSlots,isTrue} = req.body;
 if (isTrue) {
const userId = 1;


const days = Object.keys(selectedSlots);
const times = Object.values(selectedSlots);

console.log('Days:', days);
console.log('Times:', times);

const updateValues = times.map((time, index) => `${days[index]} = '${time}'`).join(', ');
console.log('updated',updateValues)
const query = `UPDATE schedule SET ${updateValues} WHERE HealthPracID = ${userId}`;

connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error updating selectedSlots:', error);
  } else {
    console.log('Data updated successfully:', results);
    res.status(200).send(results);
  }
});

// connection.end();
 }else{
  // get al users
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

const vals=[]
for (let i = 0; i < times.length; i++) {

vals.push(times[i])
}

const serializedArrays = vals.map(arr => JSON.stringify(arr));
console.log('serializedArrays:', serializedArrays,days,placeholders)

const query1 = `INSERT INTO schedule (${days},HealthPracID) VALUES (${placeholders},1)`;

connection.query(query1,serializedArrays, (error, results, fields) => {
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
//   console.log('yeyeyeyyeyey')
//   console.log(req)
//   const query = 'SELECT * users';
//   connection.query(query, (error, results, fields) => {
//   if (error) {
//     console.error('Error executing query:', error);
//   } else {
//     console.log('Query results:', results);
//    res.status(200).send(results);
//   }
// });
 }

})

app.listen(3001,()=>console.log(`Listening on port ${3001}`))







  // SQL query to create tables with foreign keys
  // const createTablesQuery = `
  //   CREATE TABLE IF NOT EXISTS user (
  //     user_id INT AUTO_INCREMENT PRIMARY KEY,
  //     name VARCHAR(55),
  //     surname VARCHAR(55),
  //     email VARCHAR(255),
  //     password VARCHAR(255),
  //     DOB DATE
  //   );

  //   CREATE TABLE IF NOT EXISTS healthprac (
  //     HealthPracID INT AUTO_INCREMENT PRIMARY KEY,
  //     Name VARCHAR(45),
  //     Surname VARCHAR(45),
  //     Email VARCHAR(45),
  //     DOB DATE,
  //     Number VARCHAR(10),
  //     Specialty VARCHAR(45),
  //     Experience VARCHAR(45),
  //   );

  //       CREATE TABLE IF NOT EXISTS appointments (
  //     appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  //     HealthPracID INT,
  //     time VARCHAR(45),
  //     day VARCHAR(45),
  //     healthpracname VARCHAR(10),
  //     patientname VARCHAR(45),
  //     FOREIGN KEY (user_id) REFERENCES user(user_id)
  //       FOREIGN KEY HealthPracID (HealthPracID) REFERENCES healthprac(HealthPracID )
  //   );
    
  //       CREATE TABLE IF NOT EXISTS schedule (
  //     schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  //     Monday VARCHAR(255),
  //     Tuesday VARCHAR(255),
  //     Wednesday VARCHAR(255),
  //     Thursday VARCHAR(255),
  //     Friday VARCHAR(255),
  //     Saturday VARCHAR(255),
  //     Sunday VARCHAR(255),
  //     FOREIGN KEY fk_HealthPracID (HealthPracID) REFERENCES healthprac(HealthPracID )
  //   );
    

         
    

  // `;
    // CREATE TABLE IF NOT EXISTS messages (
    //   idMessages INT AUTO_INCREMENT PRIMARY KEY,
    //   note VARCHAR(255),
    //   DateCancelled DATE,
    //   HealthPracName VARCHAR(45),
    //   userName VARCHAR(45),
    //   AppointmentDate VARCHAR(255),
    //   useradd VARCHAR(45),
    //   FOREIGN KEY fk2_user_id (user_id) REFERENCES users(user_id)
    //  FOREIGN KEY fk3_HealthPracID (HealthPracID) REFERENCES healthprac(HealthPracID )
    // );
    //         CREATE TABLE IF NOT EXISTS patients (
    //   idpatients INT AUTO_INCREMENT PRIMARY KEY,
    //   notes VARCHAR(45),
    //   FOREIGN KEY fk_user_id (user_id) REFERENCES users(user_id)
    //     FOREIGN KEY fk2_HealthPracID (HealthPracID) REFERENCES healthprac(HealthPracID )
    // );
  // Execute the query to create the tables
  // connection.query(createTablesQuery, (err, result) => {
  //   if (err) {
  //     console.error('Error creating tables:', err);
  //     return;
  //   }
  //   console.log('Tables created successfully');
  //   // Close the MySQL connection
  //   connection.end();
  // });


