
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017';
const dbName = 'mydb';
const http = require("http");
const url = require("url");
// const html = require("../index.html");
const Koa = require('koa');
const app = new Koa();
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const serve = require("koa-static");
const path = require('path');

// add router middleware:
app.use(router.routes());

app.use(serve(path.resolve(__dirname, '../dist/'), { extensions: ['html'] }));

app.listen(1111);

MongoClient.connect(DB_CONN_STR, function (err, client) {
    console.log("连接成功！");

    router.get('/getAlldata', async (ctx, next) => {
        let rspBody;
        try {
            rspBody = await getAlldata(client);
        } catch (error) {
            rspBody = error;
        }
        ctx.response.body = { data: rspBody }

    });

    // router.post('/adddata', async (ctx, next) => {
    //     var userName = ctx.request.body.userName || '',
    //         sex = ctx.request.body.sex || '',
    //         age = ctx.request.body.age || '';
    //     console.log(`signin with `, userName, sex, age);
    //     var data = { "userName": userName, "sex": sex, "age": age };
    //     let rspBody;
    //     try {
    //         rspBody = await addOnedata(client,data);
    //     } catch (error) {
    //         rspBody = error;
    //     }
    //     ctx.response.body = rspBody
    // });

});


function getAlldata(client) {
    return new Promise((resolve, reject) => {
        var collection = client.db(dbName).collection('site');
        collection.find().toArray(function (err, result) {
            if (err) {
                console.log('Error:' + err);
                reject(err);
                // return;
            }
            console.log(result);
            client.close();
            resolve(result)
            // return result
        });

    })
}

// function addOnedata(client,data) {
//     return new Promise((resolve, reject) => {
//         var collection = client.db(dbName).collection('site');
//         collection.insert(data, function (err, result) {
//             if (err) {
//                 console.log('Error:' + err);
//                 return;
//             }
//             console.log('addOnedata',result)
//             callback(result);
//         });
//     })
// }