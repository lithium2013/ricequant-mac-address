const macaddress = require('macaddress');
const http = require('http');
const Koa = require('koa');
const app = new Koa();
const sys = require('util');
const exec = require('child_process').exec;
const DEFAULT_PORT = 10888;
let curPort,
	server,
	running = false;

const start = (port = DEFAULT_PORT) => {
	if (running) return;

	app.use(async (ctx, next) => {
		let ip, mac, hdSerial;

	    return new Promise((resolve, reject) => {
	        macaddress.all((err, result) => {
	            if (err) {
	                return reject(err);
	            }
				for (var iface in result) {
					ip = result[iface]["ipv4"];
					mac = result[iface]["mac"];

					if ( ip && mac ) {
						break;
					}
				}
				exec("wmic DISKDRIVE get SerialNumber", (err, stdout, stderr) => {
					hdSerial = stdout.split('\n')[1].match(/[a-zA-Z0-9]+/)[0];
					ctx.body = JSON.stringify({ ip, mac, hdSerial });
	            	resolve();
				});
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