var mysql=require("mysql2");
// Create a connection to the MySQL database
const con = mysql.createConnection({
  host: 'localhost',        // Your host name
  user: 'sqluser',             // Your database username
  password: 'password',             // Your database password, if any
  database: 'drop_out'         // Your database name
});

// Connect to the database
con.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
module.exports=con