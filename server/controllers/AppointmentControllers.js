
import mysql from 'mysql';
import { connection } from '../index.js';
export const deleteAppointment = async (req,res)=>{

// const id= req.params.id
const data = req.body
const appDate = null
const {userid,healthpracID,note,canceledDate,name,id,useradd,appId, dateofAppointment,dop} = data
console.log(userid,healthpracID,note,canceledDate,name,'id',id,appId, dateofAppointment,useradd)
const query = `Delete from appointments where appointment_id = ${appId}`;

connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    
    console.log('da res',results)
  }
})
// // if user deletes then i have to add the user as a name and las the notes make useradd  yes then if healthprac make note and useradd false etc.
if (useradd === 'no'){
const query2 = `INSERT into messages (user_id,HealthPracID,note,DateCancelled,useradd,HealthPracName,AppointmentDate) values (${userid},${healthpracID},'${note}','${canceledDate}', '${useradd}','${name}','${dateofAppointment}')`;

connection.query(query2, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', results);
    res.status(200).send(results);
    // return res.json({ message: 'Success' });
  }
}) 

  //  connection.end((error) => {
  //     if (error) {
  //       console.error('Error closing the database connection:', error);
  //       return;
  //     }
  //     console.log('Database connection closed.');
  //   });

}else if (useradd ==='yes'){
const query2 = `INSERT into messages (user_id,HealthPracID,DateCancelled,useradd,userName,AppointmentDate) values (${userid},${healthpracID},'${canceledDate}', '${useradd}','${name}','${dop}')`;
connection.query(query2, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', results);
        // res.status(200).send(results);
            // return res.json({ message: 'Success' });
    res.status(200).send(results);
  }
})
  //  connection.end((error) => {
  //     if (error) {
  //       console.error('Error closing the database connection:', error);
  //       return;
  //     }
  //     console.log('Database connection closed.');
  //   });
  //another wuery
}

}

export const getUserAppointments = async (req,res)=> {
const id = req.params.id;
const query = `Select * from appointments where user_id = ${id}`;

connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
    res.status(200).send(results);
  }
})
  //  connection.end((error) => {
  //     if (error) {
  //       console.error('Error closing the database connection:', error);
  //       return;
  //     }
  //     console.log('Database connection closed.');
  //   });
}



export const getHealthPrac = async (req,res)=> {
  try{
const id = req.params.id;
const query = `Select * from appointments where HealthPracId=${id} `;

connection.query(query, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
    res.status(200).send(results);
  }
})
  } catch (error) {
    console.error('Error fetching data:', error);
  
  }
    //  connection.end((error) => {
    //   if (error) {
    //     console.error('Error closing the database connection:', error);
    //     return;
    //   }
    //   console.log('Database connection closed.');
    // });
}

    
export const makeAppointment = async (req,res)=> {
let exists = false
const  {date,time,userid,healthpracID,name,patientName}=req.body
console.log(date,time,userid,healthpracID,name,patientName,'yisisisisisisi')
const query = `INSERT INTO appointments (user_id,healthpracID,time,day,healthpracname,patientname) VALUES (?,?,?,?,?,?)`;
let values = [userid,healthpracID,time,date,name,patientName]
connection.query(query,values, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    // console.log('Data inserted successfully:', results);
    res.status(200).send(results);
  }
})

async function fetchData() {
  try {
    const query2 = `SELECT * FROM patients WHERE HealthPracID = '${healthpracID}' AND user_id = '${userid}'`;
    const results = await new Promise((resolve, reject) => {
      connection.query(query2, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length === 0) {
      exists= true
      return exists 
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
    const results = await fetchData();
    console.log(results,'da res')
    // Code to be executed after fetchData
    if (results) {
     console.log('existststs')
    let notes = 'your mom is fat';
    const query3 = `INSERT INTO patients (healthpracID,user_id,notes) VALUES (?,?,?)`;
  let value2 = [healthpracID,userid,notes]

  connection.query(query3,value2, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('already exists')
    // console.log('Data inserted successfully:', results);
    // res.status(200).send(results);
  }
})
    }else{
          console.log('already exists')
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

// if (results){

// }

// connection.end()

}