import  express  from "express";
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from "multer";
import mysql from 'mysql';
import fileUpload from "express-fileupload";
import fs from 'fs-extra';

import appointmentRoutes from './routes/appointmentsRoutes.js'
import loginRegisterRoutes from './routes/loginRegisterRoutes.js'
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
import * as path from 'path';
import { promisify } from 'util';

import { rename as renameAsync } from 'fs/promises';
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



app.post('/upload', upload.single('document'), async (req, res) => {
  console.log('backend upload');

  try {
    const userId = req.body.userId;
    const uploadedFile = req.file;
    console.log(uploadedFile, 'da file');

    const newFilename = userId + '_' + Date.now() + '_' + uploadedFile.originalname;
    const newFilePath = './uploads/' + newFilename;

    await renameAsync(uploadedFile.path, newFilePath);
    console.log('File renamed successfully');

    return res.json({ message: 'File uploaded and renamed successfully' });
  } catch (error) {
    console.error('Error renaming file:', error);
    res.status(500).json({ error: 'Failed to rename file' });
  }
});

app.delete('/filesDelete/:name',(req,res)=>{
  const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 const fileName = req.params.name
  const directory = path.join(__dirname, 'uploads');
const filename = fileName ; // Provide the filename to delete

const filePath = path.join(directory, filename);

// Check if the file exists
if (fs.existsSync(filePath)) {
  // Delete the file
  fs.unlink(filePath, (error) => {
    if (error) {
          return res.json({ message: 'Error deleting file:' });
      // console.error('Error deleting file:', error);
    } else {
        return res.json({ message: 'File deleted successfully' });
 
    }
  });
} else {
  console.log('File not found');
}
})
// app.post('/upload',upload.single('document') ,(req, res) => {
//   console.log('backend uploadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
//   const userId = req.body.userId
//   const uploadedFile = req.file;
//   console.log(uploadedFile,'da fileeeeeeeeeeeeee')
//   const newFilename = userId + '_'+ Date.now() + '_' + uploadedFile.originalname; //make file unique
//   const newFilePath = './uploads/'+newFilename;

//    fs.rename(uploadedFile.path, newFilePath, function(err) {
//     if (err) {                                                                 //rename doc to more unique  name
//       // Handle the error
//       console.error('Error renaming file:', err);
//       res.status(500).json({ error: 'Failed to rename file' });
//     } else {
//       // File renamed successfully
//    return res.json({ message: 'File uploaded and renamed successfully' });
//     }
//   });
// });

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
app.get('/fetchSchedule/:id', (req, res) => {
//   connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to Amazon RDS:', error);
//   } else {
//     console.log('Connected to Amazon RDS database.');
//   }
// });

  const id = req.params.id;
  console.log(id,'idididid')

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


app.get('/fetchPatients/:id',(req,res)=>{
//     connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to Amazon RDS:', error);
//   } else {
//     console.log('Connected to Amazon RDS database.');
//   }
// });
  const healthPracID = req.params.id
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
const {selectedSlots,isTrue,healthid} = req.body;
console.log(isTrue)
 if (isTrue) {



const days = Object.keys(selectedSlots);
const times = Object.values(selectedSlots);

console.log('Days:', days);
console.log('Times:', times);

const updateValues = times.map((time, index) => `${days[index]} = '${time}'`).join(', ');
console.log('updated',updateValues)
const query = `UPDATE schedule SET ${updateValues} WHERE HealthPracID = ${healthid}`;

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
console.log(healthid,'the id')
  const arr=[]

  const data = req.body;
  // arr.push(data)

const days = Object.keys(selectedSlots);
const times = Object.values(selectedSlots);

console.log('Days:', days);
console.log('Times:', times);
const newTimes = times.flat()
console.log('newTimes:', newTimes)
const updateValues = times.join(', ');
console.log('upadetd',updateValues)
const columns = days.join(', ');
let insertColumns = '';
let insertValues = '';

// for (let i = 0; i < days.length; i++) {
//   const day = days[i];
//   const dayTimes = Array.isArray(times[i]) ? times[i] : [times[i]];

//   for (const time of dayTimes) {
//     insertColumns += `${day}, `;
//     insertValues += `'${time}', `;
//   }
// }

// insertColumns = insertColumns.slice(0, -2); // Remove the trailing comma and space
// insertValues = insertValues.slice(0, -2); // Remove the trailing comma and space
// const query3 = `INSERT INTO schedule (${insertColumns}, HealthPracID) VALUES (${insertValues}, ${healthid})`;

// const placeholders = times.map(() => '?').join(', ');

// const vals=[]
// for (let i = 0; i < times.length; i++) {

// vals.push(times[i])
// console.log(times[i],'times at i')
// }

// console.log(vals,'valss')
// const serializedArrays = vals.map(arr => JSON.stringify(arr));


// const query1 = `INSERT INTO schedule (${days},HealthPracID) VALUES (${vals},${healthid})`;


// connection.query(insertQuery, (error, results, fields) => {
//   if (error) throw error;

//   // Handle the insertion result if needed
//   console.log('Insertion successful');
// });

const values = days.map((day, index) => {
  const time = times[index] ? `('${times[index].join(',')}')` : 'NULL';
  return time;
});

const query = `INSERT INTO schedule (${days.join(', ')},HealthpracID) VALUES (${values.join(', ')}, ${healthid})`;

console.log('wueruwer',query)
connection.query(query, (error, results, fields) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Successfully inserted data');
  }
});

//231444444444
// const values = [];
// for (let i = 0; i < days.length; i++) {
//   const day = days[i];
//   const time = times[i] ? JSON.stringify(times[i]) : null;
//   values.push(time);
// }

// const query = `INSERT INTO schedule (${days.join(', ')}, HealthpracID) VALUES (${values.map(val => val ? `'${val}'` : 'NULL').join(', ')}, ${healthid})`;
// console.log(query,'da queryyyyyyyy')
// connection.query(query, (error, results, fields) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Successfully inserted data');
//   }
// });

// const query1 = `INSERT INTO schedule (${days},HealthPracID) VALUES (${placeholders},${healthid})`;


// const values = days.map((day, index) => {
//   const time = Array.isArray(times[index]) ? times[index].join(', ') : times[index];
//   return `('${time}')`;
// });

// const healthId = 1; // Assuming you have the healthid value

// const query = `INSERT INTO schedule (${days.join(',')}, HealthPracID) VALUES ${values.join(', ')}, ${healthId}`;

// const query = `INSERT INTO schedule (${columnNames}, HealthPracID) VALUES ${values.join(', ')}`;

// const placeholders = days.map((day, index) => {
//   const dayValues = times[index];
//   const dayPlaceholders = dayValues.map(() => '?').join(', ');
//   return `(${dayPlaceholders})`;
// }).join(', ');

// const columns = days.join(', ');

// const values = times.flat();

// const query = `INSERT INTO schedule (${columns}) VALUES ${placeholders}`;

// const values = times.map(times => `(${times.map(time => `'${time}'`).join(', ')})`).join(', ');

// const query = `INSERT INTO schedule (${days.join(', ')}, HealthPracID) VALUES ${values}, '${healthid}'`;



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
app.post('/register', (req, res) => {
  const { email } = req.body;

  // Generate verification code or token (e.g., random alphanumeric string)
  const verificationCode = generateVerificationCode();

  // Save the verification code or token in your backend storage (e.g., database)

  // Send verification email
  sendVerificationEmail(email, verificationCode)
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error('Error sending verification email:', error);
      res.json({ success: false });
    });
});

// Endpoint to handle verification
app.post('/verify', (req, res) => {
  const { email, verificationCode } = req.body;

  // Retrieve the saved verification code from your backend storage

  // Compare the provided verification code with the stored one
  if (verificationCode === verificationCode) {
    // Mark the email as verified in your backend (e.g., update database)

    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Function to send verification email using Nodemailer
const sendVerificationEmail = (email, verificationCode) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      // Configure your email service provider details here (e.g., Gmail SMTP)
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'goosyvdwalt@gmail.com',
        pass: 'd3Gl77#@!1-',
      },
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Email Verification',
      text: `Your verification code: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
        reject(error);
      } else {
        console.log('Verification email sent:', info.response);
        resolve();
      }
    });
  });
};

// Helper function to generate verification code
const generateVerificationCode = () => {
  // Generate a random alphanumeric string or any other method you prefer
  return 'ABC123';
};

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


