
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
console.log(ObjectId)
var DB_CONN_STR = 'mongodb://localhost:27017';
const dbName = 'mydb';
const http = require("http");
const url = require("url");
// const html = require("../index.html");
const Koa = require('koa');
const app = new Koa();
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const serve = require("koa-static");
const path = require('path');

// add router middleware:

app.use(bodyParser());

app.use(router.routes());


// app.use(serve(path.resolve(__dirname, '../dist/'), { extensions: ['html'] }));
console.log('process.cwd()', process.cwd())
app.use(serve(path.join(process.cwd(), './dist/')))

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

    router.post('/adddata', async (ctx, next) => {
        console.log('ctx', ctx)
        var userName = ctx.request.body.userName || '',
            sex = ctx.request.body.sex || '',
            age = ctx.request.body.age || '';
        var data = { "userName": userName, "sex": sex, "age": age };
        let rspBody;
        try {
            rspBody = await addOnedata(client, data);
        } catch (error) {
            rspBody = error;
        }
        ctx.response.body = rspBody
    });

    router.post('/deleteOnedata', async (ctx, next) => {
        console.log('ctx', ctx)
        var _id = ctx.request.body._id || '';
        let rspBody;
        let data = { _id: ObjectId(_id) };
        try {
            rspBody = await deleteOnedata(client, data);
        } catch (error) {
            rspBody = error;
        }
        ctx.response.body = rspBody
    });


    router.post('/updateOnedata', async (ctx, next) => {
        console.log('ctx', ctx)
        var _id = ctx.request.body._id || '';
        let rspBody;
        let term = { _id: ObjectId(_id) };
        // var userName = ctx.request.body.userName || '',
        //     sex = ctx.request.body.sex || '',
        //     age = ctx.request.body.age || '';
        // const { userName, sex, age } = ctx.request.body;
        // var data = { "userName": userName, "sex": sex, "age": age };
        const data = { ...ctx.request.body }
        try {
            rspBody = await updateOnedata(client, term, data);
        } catch (error) {
            rspBody = error;
        }
        ctx.response.body = rspBody
    });

});


function getAlldata(client) {
    return new Promise((resolve, reject) => {
        var collection = client.db(dbName).collection('site');
        collection.find().toArray(function (err, result) {
            if (err) {
                console.log('Error:' + err);
                reject(err);
            }
            console.log(result);
            resolve(result)
        });

    })
}

function addOnedata(client, data) {
    return new Promise((resolve, reject) => {
        var collection = client.db(dbName).collection('site');
        collection.insert(data, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                reject(err);
            }
            console.log(result);
            resolve({ status: 'success' })
        });
    })
}

function deleteOnedata(client, data) {
    return new Promise((resolve, reject) => {
        var collection = client.db(dbName).collection('site');
        console.log('deleteOnedata', data)
        collection.remove(data, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                reject(err);
            }
            console.log(result);
            resolve({ status: 'success' })
        });
    })
}

function updateOnedata(client, term, data) {
    return new Promise((resolve, reject) => {
        var collection = client.db(dbName).collection('site');
        console.log('updateOnedata', term, data)
        collection.update(term, data, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                reject(err);
            }
            console.log(result);
            resolve({ status: 'success' })
        });
    })
}