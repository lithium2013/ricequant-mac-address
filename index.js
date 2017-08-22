//const ipc = require('electron').ipcRenderer
//document.addEventListener('DOMContentLoaded', () => {
//	const btn = document.getElementById('set-port'),
//		input = document.getElementById('port');
//
//	btn.addEventListener('click', () => {
//		ipc.send('getMac', {
//			mac: input.value
//		});
//	});
//});

document.addEventListener('DOMContentLoaded', () => {
	setInterval(function() {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:10888", true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status === 200) {
				let res = xhr.responseText.split('_');
				const ip = res[0],
					mac = res[1];
				document.getElementById('ip-address').innerText = ip;
				document.getElementById('mac-address').innerText = mac;
			}
		};
		xhr.send();
	}, 1000);
});