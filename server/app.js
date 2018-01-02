
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017';
const dbName = 'mydb';
const http = require("http");
const url = require("url");
// const html = require("../index.html");
const Koa = require('koa');
const app = new Koa();
const  serve = require("koa-static");
const path = require('path');

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

console.log(__dirname)

app.use(serve(path.resolve(__dirname,'../dist/'),{ extensions: ['html']}));

app.listen(1111);
 
// var insertData = function(client, callback) {  
//     //连接到表 site
//     // db.createCollection("site", function(err, res) {
//     //   if (err) throw err;
//     //   console.log("创建集合!");
//     // });
//     console.log(client.db)
//     var collection = client.db(dbName).collection('site');
//     //插入数据
//     var data = [{"name":"张三","sex":"boy"},{"name":"张美美","sex":"girl"}];
//     collection.insert(data, function(err, result) { 
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }     
//         callback(result);
//     });
// }
 
// MongoClient.connect(DB_CONN_STR, function(err, client) {
//     console.log("连接成功！");
//     insertData(client, function(result) {
//         console.log(result);
//         client.close();
//     });
// });

// const server = http.createServer(function(request,response){
//     var pathname = url.parse(request.url).pathname;
//     response.writeHead(200,{"Content-Type": "text/html"});
//     response.writeHead(pat);
//     response.write('../index.html');
//     response.end();
//     console.log(pathname)
// })
// server.listen(1111)