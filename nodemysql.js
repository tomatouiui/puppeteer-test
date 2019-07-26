/**
 * 
 * @authors Toma (tomatouiu@gmail.com)
 * @date    2019-07-22 16:34:27
 * @version $Id$
 */

const express = require('express');
var mysql = require('mysql');

var app = express();

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'nodemysql'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/createdb', (req, res) => {
    let sql = `create database nodemysql`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/createtable', (req,res) => {
    let sql = 'create table posts(id int auto_increment, title varchar(255), body varchar(255), primary key(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get('/addpost/:title/:body', (req,res) => {
	let post = {title: req.params.title, body: req.params.body};
    let sql = 'insert into posts set ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get('/getpost/:id', (req,res) => {
    let sql = `select * from posts where id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.listen('3000', () => {
	console.log('at 3000');
});