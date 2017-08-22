document.addEventListener('DOMContentLoaded', () => {
	setInterval(function() {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:10888", true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status === 200) {
				const { ip, mac, hdSerial } = JSON.parse(xhr.responseText);
				
				document.getElementById('ip-address').innerText = ip;
				document.getElementById('mac-address').innerText = mac;
				document.getElementById('hd-serial').innerText = hdSerial;
			}
		};
		xhr.send();
	}, 1000);
});
