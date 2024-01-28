var express = require("express");

var app = express();

var mysql = require("mysql");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));

app.set("view engine", "ejs");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webse",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connection Sucessful");
});

var cors = require('cors');
app.use(cors());


app.post("/insertpizzaa", function (req, res) {
  var flavour = req.body.flavour;
  var name = req.body.name;
  var contact = req.body.contact;

  var sql = `insert into pizza_address(flavour, name, contact) values('${flavour}', '${name}', '${contact}')`;

  conn.query(sql, function (err, results) {
    if (err) throw err;

    res.send("<h1>Data Inserted.</h1>");
  });
});

app.post("/insert", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
  
    var sql = `insert into employee(name, email, password) values('${name}', '${email}', '${password}')`;
  
    conn.query(sql, function (err, results) {
      if (err) throw err;
  
      res.send("<h1>Data Inserted.</h1>");
    });
  });
  
app.post("/insertblog", function (req, res) {
  var blog_title = req.body.blog_title;
  var blog_description = req.body.blog_description;

  var sql = `insert into blog(blog_title, blog_description) values('${blog_title}', '${blog_description}')`;
  console.log(sql);
  conn.query(sql, function (err, results) {
    if (err) throw err;

    res.send("Data Inserted");
  });
});

app.get("/getdatadb",function(req,res)
{
    var sql=`select * from blog`;
    console.log(sql);
    conn.query(sql,function(err,results)
    {
        if (err) throw err;
        res.send(results);
    });
});
app.get("/getd",function(req,res)
{
    var sql=`select * from pizza_address`;
    console.log(sql);
    conn.query(sql,function(err,results)
    {
        if (err) throw err;
        console.log(results);
        res.json(results);
    });
});

app.get("/getdata", function(req, res) {
  var sql = "SELECT * FROM employee";
  conn.query(sql, function(err, results) {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

app.put("/updateblog", function (req, res) {
  var blog_title = req.body.blog_title;
  var blog_description = req.body.blog_description;

  var sql = `UPDATE blog SET blog_description = '${blog_description}' WHERE blog_title = '${blog_title}'`;

  conn.query(sql, function (err, results) {
    if (err) throw err;

    res.send("Data Updated");
  });
});

app.delete("/deleteblog", function (req, res) {
  var blog_title = req.body.blog_title;

  var sql = `DELETE FROM BLOG WHERE blog_title = ?`;
  var values = [blog_title];

  conn.query(sql, values, function (err, results) {
    if (err) {
      throw err;
    } else {
      res.send("Data Deleted");
    }
  });
});



var server=app.listen(4000,(err)=>
{
    if(err) throw err;
    console.log("Running on port 4000");
});