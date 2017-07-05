const macaddress = require('macaddress');
const Koa = require('koa');
const app = new Koa();
const port = 10888;

app.use(async (ctx, next) => {
    return new Promise((resolve, reject) => {
        macaddress.one((err, mac) => {
            if (err) {
                return reject(err);
            }
            ctx.body = mac;
            resolve();
        });
    });
});

app.listen(10888);