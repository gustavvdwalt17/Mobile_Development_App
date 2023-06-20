
import bcrypt from 'bcrypt'
const secret='secret'
import { connection } from '../index.js';

export const registerUser = async (req, res) => {
  try {

    const { email, password ,name,surname } = req.body;
    console.log( email, password ,name,surname)
    const dob = '2023/06/18'
    // Check if the email already exists in the database
    const checkQuery = 'SELECT * FROM user WHERE email = ?';
    connection.query(checkQuery, [email], (error, results) => {
      if (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length > 0) {
        // Email already exists
       return res.status(400).json({ error: 'Email already exists' });
      }

      // Email does not exist, proceed with registration
      // Hash the password using bcrypt
      bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) {
          console.error('Error hashing password:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }

        // Create the query to insert the user into the database
       const query = `INSERT INTO user (name,surname,email, password,DOB) VALUES (?, ?, ?, ?, ?)`;
        const values = [name,surname,email, hashedPassword,dob];


        // Execute the query
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ error: 'Internal server error' });
          }

          const userId = results.insertId
          console.log('Inserting user',results)
          // User registration successful
          res.status(200).json({ userId });
        });
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const loginUser = async (req, res) => {

  try {
  const { email, password } = req.body.loginVals
 const who= req.body.who


 if  (who === 'user'){
  console.log('user')
 const checkQuery = 'SELECT * FROM user WHERE email = ?';
    connection.query(checkQuery, [email], (error, results) => {
      if (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('1')

      if (results.length === 0) {
        // Email does not exist
        return res.status(400).json({ error: 'Email not found' });
      }
      console.log('2')
      // Email exists, compare the password
      const user = results[0];
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          console.error('Error comparing passwords:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      console.log('3')
        if (!isMatch) {
          // Password does not match
          return res.status(400).json({ error: 'Invalid password' });
        }
   
        const theId = results[0].user_id
        console.log('results',theId)
        console.log(results)
        // Password matches, login successful
        // You can generate a JWT token or set a session to authenticate the user
        // Here, we're sending a success message
        res.status(200).json({ theId  });
      });
    });
 }else{
    console.log('health')
  const checkQuery = 'SELECT * FROM healthprac WHERE email = ?';
    connection.query(checkQuery, [email], (error, results) => {
      if (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('1')

      if (results.length === 0) {
        // Email does not exist
        return res.status(400).json({ error: 'Email not found' });
      }
      console.log('2')
      // Email exists, compare the password
      const user = results[0];
      // bcrypt.compare(password, user.password, (error, isMatch) => {
      //   if (error) {
      //     console.error('Error comparing passwords:', error);
      //     return res.status(500).json({ error: 'Internal server error' });
      //   }
      // console.log('3')
      //   if (!isMatch) {
      //     // Password does not match
      //     return res.status(400).json({ error: 'Invalid password' });
      //   }
   
      //   const theId = results[0].HealthPracID
      //   console.log('results',theId)
      //   console.log(results)
      //   // Password matches, login successful
      //   // You can generate a JWT token or set a session to authenticate the user
      //   // Here, we're sending a success message
      //   res.status(200).json({ theId  });
      // });
      if (user.password === password){
           const theId = results[0].HealthPracID
   
        // Password matches, login successful
        // You can generate a JWT token or set a session to authenticate the user
        // Here, we're sending a success message
        res.status(200).json({ theId  });
      }else{
          return res.status(400).json({ error: 'Invalid password' });
      }
    });

 }
    // Check if the email exists in the database
   
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};