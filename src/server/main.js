const macaddress = require('macaddress');
const http = require('http');
const Koa = require('koa');
const app = new Koa();
const DEFAULT_PORT = 10888;
let curPort,
	server,
	running = false;

const start = (port = DEFAULT_PORT) => {
	if (running) return;

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
	server = http.createServer(app.callback()).listen(port);
	curPort = port;
	running = true;
};

const stop = () => {
	if (!running) return;

	server && server.close();
	running = false;
};

const restart = (port = DEFAULT_PORT) => {
	if (running && port === curPort) return;
	stop();
	start(port);
};

module.exports = { start, stop, restart };