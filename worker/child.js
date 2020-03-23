const child_process = require('child_process');
const ls = child_process.spawn('cmd', ['/c', 'chcp', '65001', '>','nul', '&&', 'dir']);
const { Readable } = require('stream');

ls.stdout.on('data', (data) => {
	var l = `${data}`
	const readable = Readable.from(l);
	
	//readable.pipe(process.stdout);
	process.send(l);
});

ls.stderr.on('data', (data) =>{
	console.error(`stderr: ${data}`);
});
