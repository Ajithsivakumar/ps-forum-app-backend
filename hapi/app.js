'use strict';
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
    host: '127.0.0.1',
    port: 3000,
    routes: {
        cors: true
    }
});

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  port: '3306',
  database: "stepforum"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql");
});
server.route({
    method: 'POST',
    path: '/send',
    handler: function(request, reply) {
        var pay=request.payload;
      console.log(pay.name);
      var qu='SELECT * FROM user WHERE name="'+pay.name+'" AND pass="'+pay.pass+'"';
      con.query(qu,function(err,rows,fie){
          if(err) console.log(err);
          console.log(rows);
          return reply(rows);
      })
    }
});
server.route({
    method: 'POST',
    path: '/insert',
    handler: function(request, reply) {
        var pay=request.payload;
      
      var qu='INSERT INTO comments VALUES(NULL,"'+pay.author+'","'+pay.title+'","'+pay.message+'")';
      con.query(qu,function(err,rows){
          if(err) console.log(err);
          console.log(rows);
          return reply(rows);
      })
    }
});
server.route({
    method: 'POST',
    path: '/list',
    handler: function(request, reply) {
        console.log("hello");
        var qu='SELECT * FROM comments';
      con.query(qu,function(err,rows,fie){
          if(err) console.log(err);
          console.log(rows);
          return reply(rows);
      })
    }
});
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});