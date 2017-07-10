const ipc = require('electron').ipcRenderer
document.addEventListener('DOMContentLoaded', () => {
	const btn = document.getElementById('set-port'),
		input = document.getElementById('port');

	btn.addEventListener('click', () => {
		ipc.send('getMac', {
			mac: input.value
		});
	});
});