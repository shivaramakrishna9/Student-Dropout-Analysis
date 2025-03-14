 const con = require('./connection')
 const express=require('express');
 
 const app=express();
 
 const bodyparser=require('body-parser');
 const Chart = require('chart.js');
 
 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({extended:true}));
 app.set('view engine', 'ejs');
//  app.set('views', __dirname + '/views');

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html');
})
app.get('/admin.css',(req,res)=>{
  res.sendFile(__dirname+'/admin.css');
})
app.get('/login .css',(req,res)=>{
  res.sendFile(__dirname+'/login.css');
})
app.get('/register.css',(req,res)=>{
  res.sendFile(__dirname+'/register.css');
})
app.get('/login',(req,res)=>{
  res.sendFile(__dirname+'/login.html');
})
app.get('/register',(req,res)=>{
  res.sendFile(__dirname+'/register.html');
})
app.get('/student_filter',(req,res)=>{
  res.sendFile(__dirname+'/student_filter.html');
})
app.get('/admin.html',(req,res)=>{
  res.sendFile(__dirname+'/admin.html');
})
app.get('/index.html',(req,res)=>{
  res.sendFile(__dirname+'/index.html');
})
app.get('/analysis.html',(req,res)=>{
  res.sendFile(__dirname+'/analysis.html');
})
app.get('/team.html',(req,res)=>{
  res.sendFile(__dirname+'/team.html');
})
app.get("/students",function(req,res,next){
  var query="SELECT * FROM student";
  con.query(query,function(error,results){
      if(error) throw error;

      res.render('sample_data',{data:results});
  });
});
app.get("/by_age",function(req,res,next){
  const age=req.query.age;
  con.query(`SELECT * FROM student WHERE age = ${age}`,function(error,results){
      if(error) throw error;

      res.render('age',{data:results});
  });
});
app.get("/by_area",function(req,res,next){
  const area=req.query.area;
  con.query(`SELECT * FROM student WHERE area = '${area}'`,function(error,results){
      if(error) throw error;

      res.render('area',{data:results});
  });
});
app.get("/by_reason",function(req,res,next){
  const reason=req.query.reason;
  con.query(`SELECT * FROM student WHERE description = '${reason}'`,function(error,results){
      if(error) throw error;

      res.render('reason',{data:results});
  });
});
app.get("/by_caste",function(req,res,next){
  const caste=req.query.caste;
  con.query(`SELECT * FROM student WHERE caste ='${caste}'`,function(error,results){
      if(error) throw error;

      res.render('caste',{data:results});
  });
});
app.get("/by_gender",function(req,res,next){
  const gender=req.query.gender;
  con.query(`SELECT * FROM student WHERE gender ='${gender}'`,function(error,results){
      if(error) throw error;

      res.render('gender',{data:results});
  });
});
app.get("/by_school",function(req,res,next){
  const school_name=req.query.school;
  con.query(`SELECT * FROM student WHERE school_name = '${school_name}'`,function(error,results){
      if(error) throw error;

      res.render('school',{data:results});
  });
});
app.get('/add_data.html',(req,res)=>{
  res.sendFile(__dirname+'/add_data.html');
})
app.get('/student', (req, res) => {
  con.query('SELECT * FROM student', (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching data from database' });
      return;
    }
    res.json(results);
  });
});

 app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Query the database to check if the user exists and the password is correct
  con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      return res.status(500).send('Internal Server Error');
    }
    if (results.length === 1) {
      res.redirect('/admin.html');
    } else {
      res.redirect('/login');
    }
  });
}); 
app.post('/register', (req, res) => {
     const { username, email, password } = req.body;
  
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    con.query(sql, [username, email, password], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.status(500).send('Error submitting form data');
        return;
      }
    });
    res.sendFile(__dirname+'/index.html');
  });
  app.post('/addStudentData', (req, res) => {
    const { name, age, gender, caste, school, area, city, desc } = req.body;
  
    const sql = `INSERT INTO student (student_name, age, gender, caste, school_name, area, city, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [name, age, gender, caste, school, area, city, desc], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        return;
      }
    });
    res.redirect('/add_data.html');
  });
  app.get('/age_analytics', (req, res) => {
    // Fetch data from MySQL
    con.query('SELECT age,COUNT(*) as count FROM student GROUP BY age ORDER BY count DESC', (error, results, fields) => {
      if (error) throw error;
    
      res.render('age_analy', { data: results });
  });
});
app.get('/school_analytics', (req, res) => {
  // Fetch data from MySQL
  con.query('SELECT school_name,COUNT(*) as count FROM student GROUP BY school_name ORDER BY count DESC', (error, results, fields) => {
    if (error) throw error;
  
    res.render('school_analy', { data: results });
  });
});
app.get('/area_analytics', (req, res) => {
  // Fetch data from MySQL
  con.query('SELECT area,COUNT(*) as count FROM student GROUP BY area ORDER BY count DESC', (error, results, fields) => {
    if (error) throw error;
  
    res.render('area_analy', { data: results });
  });
});
app.get('/caste_analytics', (req, res) => {
  // Fetch data from MySQL
  con.query('SELECT caste,COUNT(*) as count FROM student GROUP BY caste ORDER BY count DESC', (error, results, fields) => {
    if (error) throw error;
  
    res.render('caste_analy', { data: results });
  });
});
app.get('/gender_analytics', (req, res) => {
  // Fetch data from MySQL
  con.query('SELECT gender,COUNT(*) as count FROM student GROUP BY gender ORDER BY count DESC', (error, results, fields) => {
    if (error) throw error;
  
    res.render('gender_analy', { data: results });
  });
});
app.get('/getData', (req, res) => {
  const query = 'SELECT description,COUNT(*) as count FROM student GROUP BY description ORDER BY count DESC';
  con.query(query, (err, results) => {
      if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      res.render('data',{data:results});
  });
});
  
app.listen(2000);
