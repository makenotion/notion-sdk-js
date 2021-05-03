'use strict';
const tls = require('tls');

module.exports = (options = {}) => new Promise((resolve, reject) => {
	let timeout = false;

	const callback = async () => {
		socket.off('timeout', onTimeout);
		socket.off('error', reject);

		if (options.resolveSocket) {
			resolve({alpnProtocol: socket.alpnProtocol, socket, timeout});

			if (timeout) {
				await Promise.resolve();
				socket.emit('timeout');
			}
		} else {
			socket.destroy();
			resolve({alpnProtocol: socket.alpnProtocol, timeout});
		}
	};

	const onTimeout = async () => {
		timeout = true;
		callback();
	};

	const socket = tls.connect(options, callback);

	socket.on('error', reject);
	socket.once('timeout', onTimeout);
});
