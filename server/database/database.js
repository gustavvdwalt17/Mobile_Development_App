import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'mobile-application-database.cglewgbpldmx.eu-north-1.rds.amazonaws.com',
  user: 'gustav',
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